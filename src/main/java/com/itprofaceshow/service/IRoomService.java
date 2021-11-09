package com.itprofaceshow.service;

import com.itprofaceshow.dto.RoomDTO;

import javax.servlet.http.HttpServletRequest;

public interface IRoomService extends IBaseService{
    RoomDTO findAll();
    RoomDTO findById(String id);
    RoomDTO save(HttpServletRequest request, String roomId); // create room
    RoomDTO update(RoomDTO roomDto);
    RoomDTO delete(String id);

    RoomDTO getUserStatus(HttpServletRequest request, String id);
    RoomDTO addUser(HttpServletRequest request, String roomId, String username);
    RoomDTO removeUser(HttpServletRequest request, String roomId, String username);
    RoomDTO findAllByUsername(String username);
}
