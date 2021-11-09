package com.itprofaceshow.controller;

import com.itprofaceshow.dto.RoomDTO;
import com.itprofaceshow.service.impl.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@CrossOrigin
@RestController
public class RoomAPI {
    @Autowired
    private RoomService roomService;

    @GetMapping(value = "/room/{id}/get-user-status")
    public ResponseEntity<RoomDTO> getUserStatus(HttpServletRequest request, @PathVariable("id") String id) {
        RoomDTO resDto = roomService.getUserStatus(request, id);
        return new ResponseEntity<RoomDTO>(resDto, resDto.getHttpStatus());
    }

    @GetMapping(value = "/room/{id}")
    public ResponseEntity<RoomDTO> getOne(@PathVariable("id") String id) {
        RoomDTO resDto = roomService.findById(id);
        return new ResponseEntity<RoomDTO>(resDto, resDto.getHttpStatus());
    }

    @PostMapping(value = "/room/create-room/{roomId}")
    public ResponseEntity<RoomDTO> createRoom(HttpServletRequest request, @PathVariable String roomId) {
        RoomDTO resDto = roomService.save(request, roomId);
        return new ResponseEntity<RoomDTO>(resDto, resDto.getHttpStatus());
    }

    @PostMapping(value = "/room/{roomId}/remove-user/{username}")
    public ResponseEntity<RoomDTO> removeUser(HttpServletRequest request, @PathVariable String roomId, @PathVariable String username) {
        RoomDTO resDto = roomService.removeUser(request, roomId, username);
        return new ResponseEntity<RoomDTO>(resDto, resDto.getHttpStatus());
    }

    @GetMapping(value = "/room/get-by-host-name/{username}")
    public ResponseEntity<RoomDTO> getRoomByHostName(HttpServletRequest request, @PathVariable String username) {
        RoomDTO resDto = roomService.findAllByUsername(username);
        return new ResponseEntity<RoomDTO>(resDto, resDto.getHttpStatus());
    }

    @DeleteMapping(value = "/room/{id}")
    public ResponseEntity<RoomDTO> delete(@PathVariable("id") String id) {
        RoomDTO resDto = roomService.delete(id);
        return new ResponseEntity<RoomDTO>(resDto, resDto.getHttpStatus());
    }
}
