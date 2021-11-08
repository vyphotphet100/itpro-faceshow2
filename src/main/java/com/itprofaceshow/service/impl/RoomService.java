package com.itprofaceshow.service.impl;

import com.itprofaceshow.dto.MessageDTO;
import com.itprofaceshow.dto.RoomDTO;
import com.itprofaceshow.dto.UserDTO;
import com.itprofaceshow.entity.RoomEntity;
import com.itprofaceshow.entity.UserEntity;
import com.itprofaceshow.repository.RoomRepository;
import com.itprofaceshow.repository.UserRepository;
import com.itprofaceshow.service.IRoomService;
import com.itprofaceshow.util.MyUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

@Service
public class RoomService extends BaseService implements IRoomService {
    @Autowired
    private RoomRepository roomRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private SimpMessagingTemplate messageTmp;

    @Override
    public RoomDTO findAll() {
        RoomDTO roomDto = new RoomDTO();
        for (RoomEntity roomEntity: roomRepo.findAll())
            roomDto.getResultList().add(converter.toDTO(roomEntity, RoomDTO.class));

        roomDto.setMessage("Get list of rooms successfully.");
        return roomDto;
    }

    @Override
    public RoomDTO findById(String id) {
        RoomEntity roomEntity = roomRepo.findById(id).orElse(null);
        if (roomEntity == null)
            return (RoomDTO)exceptionObject(new RoomDTO(), "This room does not exist.");

        RoomDTO roomDto = converter.toDTO(roomEntity, RoomDTO.class);
        roomDto.setMessage("Get room having id = " + id + " successfully.");
        return roomDto;
    }

    @Override
    public RoomDTO save(HttpServletRequest request, String roomId) {
        RoomEntity roomEntity = new RoomEntity();
        roomEntity.setHostUser(this.getRequestedUser(request));
        if (roomEntity.getHostUser() == null)
            return (RoomDTO)exceptionObject(new RoomDTO(), "Host user is invalid.");

        roomEntity.setHiddenPassword(MyUtil.generateRandomString(10));
        roomEntity.setId(roomId);
        RoomDTO resDto = converter.toDTO(roomRepo.save(roomEntity), RoomDTO.class);
        resDto.setMessage("Creating a room successfully.");
        return resDto;
    }

    @Override
    public RoomDTO update(RoomDTO roomDto) {
        RoomEntity roomEntity = roomRepo.findById(roomDto.getId()).orElse(null);
        if (roomEntity != null)
            return (RoomDTO)exceptionObject(new RoomDTO(), "This room does not exist.");

        roomEntity = converter.toEntity(roomDto, RoomEntity.class);
        RoomDTO resDto = converter.toDTO(roomRepo.save(roomEntity), RoomDTO.class);
        resDto.setMessage("Update room successfully.");
        return resDto;
    }

    @Override
    public RoomDTO delete(String id) {
        if (!roomRepo.existsById(id))
            return (RoomDTO)exceptionObject(new RoomDTO(), "This room does not exist.");

        roomRepo.deleteById(id);
        RoomDTO roomDto = new RoomDTO();
        roomDto.setMessage("Delete room successfully.");
        return roomDto;
    }

    @Override
    public RoomDTO getUserStatus(HttpServletRequest request, String id) {
        if (getRequestedUser(request) == null)
            return (RoomDTO)exceptionObject(new RoomDTO(), "Requested user does not exist.");

        RoomEntity roomEntity = roomRepo.findById(id).orElse(null);
        if (roomEntity == null)
            return (RoomDTO)exceptionObject(new RoomDTO(), "This room id doesn't exist.");

        RoomDTO roomDto = new RoomDTO();
        for (UserEntity userEntity : roomEntity.getJoinedUsers()) {
            UserDTO userDto = new UserDTO();
            userDto.setUsername(userEntity.getUsername());
            userDto.setFullName(userEntity.getFullName());
            userDto.setStatus(userEntity.getStatus());
            roomDto.getResultList().add(userDto);
        }

        roomDto.setMessage("Get status of users successfully.");
        return roomDto;
    }

    @Override
    public RoomDTO addUser(HttpServletRequest request, String roomId, String username) {
        if (this.getRequestedUser(request) == null)
            return (RoomDTO)exceptionObject(new RoomDTO(), "Requested user does not exist.");

        RoomEntity roomEntity = roomRepo.findById(roomId).orElse(null);
        UserEntity userEntity = userRepo.findById(username).orElse(null);

        if (roomEntity == null || userEntity == null)
            return (RoomDTO)exceptionObject(new RoomDTO(), "Room or User does not exist.");

        if (!this.getRequestedUser(request).getUsername().equals(roomEntity.getHostUser().getUsername()))
            return (RoomDTO)exceptionObject(new RoomDTO(), "You are not the host of this room.");

        for (UserEntity tmpUserEntity: roomEntity.getJoinedUsers())
            if (tmpUserEntity.getUsername().equals(username))
                return (RoomDTO)exceptionObject(new RoomDTO(), "This user exists already.");

        roomEntity.getJoinedUsers().add(userEntity);
        roomEntity = roomRepo.save(roomEntity);
        RoomDTO roomDto = converter.toDTO(roomEntity, RoomDTO.class);
        roomDto.setMessage(username + " joined the room.");
        return roomDto;
    }

    @Override
    public RoomDTO removeUser(HttpServletRequest request, String roomId, String username) {
        UserEntity requestedUser = this.getRequestedUser(request);
        if (requestedUser == null)
            return (RoomDTO)exceptionObject(new RoomDTO(), "Requested user does not exist.");

        RoomEntity roomEntity = roomRepo.findById(roomId).orElse(null);
        UserEntity userEntity = userRepo.findById(username).orElse(null);

        if (roomEntity == null || userEntity == null)
            return (RoomDTO)exceptionObject(new RoomDTO(), "Room or User does not exist.");

        if (!requestedUser.getUsername().equals(roomEntity.getHostUser().getUsername()))
            return (RoomDTO)exceptionObject(new RoomDTO(), "You are not the host of this room.");

        Boolean removed = false;
        for(int i=0; i<roomEntity.getJoinedUsers().size(); i++) {
            if (roomEntity.getJoinedUsers().get(i).getUsername().equals(username)) {
                roomEntity.getJoinedUsers().remove(i);
                removed = true;
                break;
            }
        }
        if (!removed)
            return (RoomDTO)exceptionObject(new RoomDTO(), "User does not exist in room.");

        // send remove redirect message to removed user
        MessageDTO messageDto = new MessageDTO();
        messageDto.setUserUsername(requestedUser.getUsername());
        messageDto.setReceivedUserUsername(username);
        messageDto.setType(MessageDTO.MessageType.REMOVE_REDIRECT);
        messageDto.setContent("You are removed by the host of this room.");
        messageTmp.convertAndSend("/" + username, messageDto);

        // return result
        RoomDTO roomDto = converter.toDTO(roomEntity, RoomDTO.class);
        roomDto.setMessage("Removed " + username + ".");
        return roomDto;
    }
}
