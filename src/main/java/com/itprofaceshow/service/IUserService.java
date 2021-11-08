package com.itprofaceshow.service;

import com.itprofaceshow.dto.UserDTO;

import javax.servlet.http.HttpServletRequest;

public interface IUserService extends IBaseService{
    UserDTO findAll();
    UserDTO findById(String username);
    UserDTO save(UserDTO userDto); // Create an account
    UserDTO update(UserDTO userDto);
    UserDTO delete(String username);

    UserDTO login(String username, String password);
    UserDTO joinRoom(HttpServletRequest request, String roomId, String hiddenPassword);
}
