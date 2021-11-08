package com.itprofaceshow.converter;

import com.itprofaceshow.dto.BaseDTO;
import com.itprofaceshow.dto.RoomDTO;
import com.itprofaceshow.dto.UserDTO;
import com.itprofaceshow.entity.BaseEntity;
import com.itprofaceshow.entity.MessageEntity;
import com.itprofaceshow.entity.RoomEntity;
import com.itprofaceshow.entity.UserEntity;
import com.itprofaceshow.repository.MessageRepository;
import com.itprofaceshow.repository.RoomRepository;
import com.itprofaceshow.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class DTOEntityConverter {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private RoomRepository roomRepo;

    @Autowired
    private MessageRepository messageRepo;

    public <T> T toDTO(BaseEntity entity, Class<T> tClass) {
        if (entity == null)
            return null;

        ModelMapper modelMap = new ModelMapper();
        T resObj = modelMap.map(entity, tClass);

        return this.dtoObject(entity, resObj);
    }

    public <T> T toEntity(BaseDTO dto, Class<T> tClass) {
        if (dto == null)
            return null;

        ModelMapper modelMap = new ModelMapper();
        T resObj = modelMap.map(dto, tClass);

        return this.entityObject(dto, resObj);
    }

    private <T> T dtoObject(BaseEntity entity, T resObj) {

        if (resObj instanceof UserDTO) {
            UserEntity userEntity = (UserEntity) entity;
            UserDTO userDto = (UserDTO) resObj;

            // rooms
            for (RoomEntity roomEntity : userEntity.getRooms())
                userDto.getRoomIds().add(roomEntity.getId());

            // messages
            for (MessageEntity messageEntity : userEntity.getMessages())
                userDto.getMessageIds().add(messageEntity.getId());

            // joinedRooms
            for (RoomEntity roomEntity : userEntity.getJoinedRooms())
                userDto.getJoinedRoomIds().add(roomEntity.getId());

            resObj = (T)userDto;
        }

        else if (resObj instanceof RoomDTO) {
            RoomEntity roomEntity = (RoomEntity)entity;
            RoomDTO roomDto = (RoomDTO)resObj;

            // messages
            for (MessageEntity messageEntity: roomEntity.getMessages())
                    roomDto.getMessageIds().add(messageEntity.getId());

            // joinedUsers
            for(UserEntity userEntity : roomEntity.getJoinedUsers())
                roomDto.getJoinedUserUsernames().add(userEntity.getUsername());

            resObj = (T)roomDto;
        }
        return resObj;
    }

    private <T> T entityObject(BaseDTO dto, T resObj) {

        if (resObj instanceof UserEntity) {
            UserDTO userDto = (UserDTO)dto;
            UserEntity userEntity = (UserEntity)resObj;

            // rooms
            if (userDto.getRoomIds() != null) {
                for (String id: userDto.getRoomIds()) {
                    RoomEntity roomEntity = roomRepo.findById(id).orElse(null);
                    if (roomEntity != null)
                        userEntity.getRooms().add(roomEntity);
                }
            }

            // messages
            if (userDto.getMessageIds() != null) {
                for (Long id: userDto.getMessageIds()) {
                    MessageEntity messageEntity = messageRepo.getById(id);
                    if (messageEntity != null)
                        userEntity.getMessages().add(messageEntity);
                }
            }

            //joinedRooms
            if (userDto.getJoinedRoomIds() != null) {
                for (String id: userDto.getJoinedRoomIds()) {
                    RoomEntity roomEntity = roomRepo.getById(id);
                    if (roomEntity != null)
                        userEntity.getJoinedRooms().add(roomEntity);
                }
            }

            resObj = (T)userEntity;
        }

        else if (resObj instanceof RoomEntity) {
            RoomDTO roomDto = (RoomDTO) dto;
            RoomEntity roomEntity = (RoomEntity) resObj;

            // messages
            if (roomDto.getMessageIds() != null) {
                for (Long id: roomDto.getMessageIds()){
                    MessageEntity messageEntity = messageRepo.findById(id).orElse(null);
                    if (messageEntity != null)
                        roomEntity.getMessages().add(messageEntity);
                }
            }

            if (roomDto.getJoinedUserUsernames() != null) {
                for (String username: roomDto.getJoinedUserUsernames()) {
                    UserEntity userEntity = userRepo.getById(username);
                    if (userEntity != null)
                        roomEntity.getJoinedUsers().add(userEntity);
                }
            }

            resObj = (T)roomEntity;
        }

        return resObj;
    }
}
