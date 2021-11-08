package com.itprofaceshow.service.impl;

import com.itprofaceshow.dto.UserDTO;
import com.itprofaceshow.entity.RoomEntity;
import com.itprofaceshow.entity.UserEntity;
import com.itprofaceshow.repository.RoomRepository;
import com.itprofaceshow.repository.UserRepository;
import com.itprofaceshow.service.IUserService;
import com.itprofaceshow.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;

@Service
public class UserService extends BaseService implements IUserService {
    @Autowired
    private UserRepository userRepo;

    @Autowired
    private RoomRepository roomRepo;

    @Override
    public UserDTO findAll() {
        UserDTO userDto = new UserDTO();
        for (UserEntity userEntity: userRepo.findAll())
            userDto.getResultList().add(converter.toDTO(userEntity, UserDTO.class));

        userDto.setMessage("Get list of users successfully.");
        return userDto;
    }

    @Override
    public UserDTO findById(String username) {
        UserEntity userEntity = userRepo.findById(username).orElse(null);
        if (userEntity == null)
            return (UserDTO)exceptionObject(new UserDTO(), "This username does not exist.");

        UserDTO userDto = converter.toDTO(userEntity, UserDTO.class);
        userDto.setPassword(null);
        userDto.setToken(null);
        userDto.setJoinedRoomIds(new ArrayList<>());
        userDto.setMessageIds(new ArrayList<>());
        userDto.setRoomIds(new ArrayList<>());
        userDto.setMessage("Get user having username = " + username + " successfully.");
        return userDto;
    }

    @Override
    public UserDTO save(UserDTO userDto) {
        if (userRepo.existsById(userDto.getUsername()))
            return (UserDTO)this.exceptionObject(new UserDTO(), "This username exists.");

        userDto.setStatus("OFFLINE");
        userDto.setToken(JwtUtil.generateToken(userDto));
        UserEntity userEntity = converter.toEntity(userDto, UserEntity.class);
        UserDTO resDto = converter.toDTO(userRepo.save(userEntity), UserDTO.class);
        resDto.setMessage("Creating an account successfully.");
        return resDto;
    }

    @Override
    public UserDTO update(UserDTO userDto) {
        if (!userRepo.existsById(userDto.getUsername()))
            return (UserDTO)this.exceptionObject(new UserDTO(), "This user does not exist.");

        UserDTO updatedUser = converter.toDTO(userRepo.findById(userDto.getUsername()).orElse(null), UserDTO.class);
        updatedUser.setPassword(userDto.getPassword());
        updatedUser.setFullName(userDto.getFullName());
        updatedUser.setAddress(userDto.getAddress());
        updatedUser.setPhone(userDto.getPhone());

        UserEntity userEntity = converter.toEntity(updatedUser, UserEntity.class);
        UserDTO resDto = converter.toDTO(userRepo.save(userEntity), UserDTO.class);
        resDto.setMessage("Update successfully.");
        return resDto;
    }

    @Override
    public UserDTO delete(String username) {
        if (!userRepo.existsById(username))
            return (UserDTO)exceptionObject(new UserDTO(), "This user does not exist.");

        userRepo.deleteById(username);
        UserDTO userDto = new UserDTO();
        userDto.setMessage("Delete successfully.");
        return userDto;
    }

    @Override
    public UserDTO login(String username, String password) {
        UserEntity userEntity = userRepo.getByUsernameAndPassword(username, password);
        if (userEntity == null)
            return (UserDTO) exceptionObject(new UserDTO(), "Username or password is incorrect.");

        // recreate token
        String tailToken = JwtUtil.getKeyTokenTail(userEntity.getToken());
        userEntity.setToken(tailToken);
        UserDTO tmpDto = converter.toDTO(userEntity, UserDTO.class);
        userEntity.setToken(JwtUtil.generateToken(tmpDto));
        userEntity = userRepo.save(userEntity);

        UserDTO userDto = converter.toDTO(userEntity, UserDTO.class);
        userDto.setMessage("Login successfully.");
        return userDto;
    }

    @Override
    public UserDTO joinRoom(HttpServletRequest request, String roomId, String hiddenPassword) {
        UserEntity requestedUser = this.getRequestedUser(request);
        if (requestedUser == null)
            return (UserDTO)this.exceptionObject(new UserDTO(), "Requested user does not exist.");

        RoomEntity roomEntity = roomRepo.findById(roomId).orElse(null);
        if (roomEntity == null)
            return (UserDTO)exceptionObject(new UserDTO(), "Room ID does not exist.");

        if (!roomEntity.getHiddenPassword().equals(hiddenPassword))
            return (UserDTO)exceptionObject(new UserDTO(), "Invalid password.");

        for (UserEntity tmpUserEntity: roomEntity.getJoinedUsers())
            if (tmpUserEntity.getUsername().equals(requestedUser.getUsername()))
                return (UserDTO)this.exceptionObject(new UserDTO(), "You joined this room.");

        if (roomEntity.getHostUser().getUsername().equals(requestedUser.getUsername()))
            return (UserDTO)this.exceptionObject(new UserDTO(), "You are the host of this room.");

        roomEntity.getJoinedUsers().add(requestedUser);
        roomEntity = roomRepo.save(roomEntity);
        UserDTO userDto = this.converter.toDTO(requestedUser, UserDTO.class);
        userDto.setMessage(requestedUser.getUsername() + " joined the room.");
        return userDto;
    }
}
