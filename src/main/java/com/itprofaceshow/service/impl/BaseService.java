package com.itprofaceshow.service.impl;

import com.itprofaceshow.converter.DTOEntityConverter;
import com.itprofaceshow.dto.BaseDTO;
import com.itprofaceshow.entity.UserEntity;
import com.itprofaceshow.repository.UserRepository;
import com.itprofaceshow.service.IBaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import javax.servlet.http.HttpServletRequest;

public class BaseService implements IBaseService {
    @Autowired
    protected DTOEntityConverter converter;

    @Autowired
    private UserRepository userRepo;

    @Override
    public BaseDTO exceptionObject(BaseDTO dto, String message) {
        dto.setHttpStatus(HttpStatus.FORBIDDEN);
        dto.setMessage(message);
        return dto;
    }

    protected UserEntity getRequestedUser(HttpServletRequest request) {
        String authorization = request.getHeader("Authorization");
        if (authorization == null ||
                authorization.equals("") ||
                !authorization.startsWith("Token "))
            return null;

        String token = authorization.substring(6);
        UserEntity userEntity = userRepo.findByToken(token);

        if (userEntity == null)
            return null;

        return userEntity;
    }
}
