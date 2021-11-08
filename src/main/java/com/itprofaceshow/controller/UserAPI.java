package com.itprofaceshow.controller;

import com.itprofaceshow.dto.MessageDTO;
import com.itprofaceshow.dto.UserDTO;
import com.itprofaceshow.service.impl.MessageService;
import com.itprofaceshow.service.impl.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@CrossOrigin
@RestController
public class UserAPI {
    @Autowired
    private UserService userService;

    @Autowired
    private MessageService messageService;

    @PostMapping(value = "/user/log-in")
    public ResponseEntity<UserDTO> login(@RequestBody UserDTO userDto) {
        UserDTO resDto = new UserDTO();
        if (userDto.getUsername() == null || userDto.getPassword() == null ||
                userDto.getUsername().equals("") || userDto.getPassword().equals("")) {
            resDto = (UserDTO) userService.exceptionObject(userDto, "Username or Password is empty.");
            return new ResponseEntity<UserDTO>(resDto, resDto.getHttpStatus());
        }

        resDto = userService.login(userDto.getUsername(), userDto.getPassword());
        return new ResponseEntity<UserDTO>(resDto, resDto.getHttpStatus());
    }

    @PostMapping(value = "/user/create-account")
    public ResponseEntity<UserDTO> creatAccount(@RequestBody UserDTO userDto) {
        UserDTO resDto = null;

        if (userDto.getUsername() == null ||
                userDto.getPassword() == null ||
                userDto.getFullName() == null) {
            resDto = (UserDTO)userService.exceptionObject(userDto, "Some fields are empty. Please check again.");
            return new ResponseEntity<UserDTO>(resDto, resDto.getHttpStatus());
        }

        resDto = userService.save(userDto);
        return new ResponseEntity<UserDTO>(resDto, resDto.getHttpStatus());
    }

    @PostMapping(value = "/user/update-profile")
    public ResponseEntity<UserDTO> update(@RequestBody UserDTO userDto) {
        UserDTO resDto = userService.update(userDto);
        return new ResponseEntity<UserDTO>(resDto, resDto.getHttpStatus());
    }

    @GetMapping(value = "/user/{username}/get-profile")
    public ResponseEntity<UserDTO> getProfile(@PathVariable String username) {
        UserDTO resDto = userService.findById(username);
        return new ResponseEntity<UserDTO>(resDto, resDto.getHttpStatus());
    }

    @MessageMapping("/user/send-message-to-room")
    public void sendMessage(MessageDTO messageDto) {
        messageService.sendMessageToRoom(messageDto);
    }

    @MessageMapping("/user/send-invite-message")
    public void sendInviteMessage(MessageDTO messageDto) {
        messageService.sendInviteMessage(messageDto);
    }

    @PostMapping("/user/join-room/{roomId}/{hiddenPassword}")
    public ResponseEntity<UserDTO> joinRoom(HttpServletRequest request, @PathVariable String roomId, @PathVariable String hiddenPassword) {
        UserDTO resDto = userService.joinRoom(request, roomId, hiddenPassword);
        return new ResponseEntity<UserDTO>(resDto, resDto.getHttpStatus());
    }
}
