package com.itprofaceshow.service;

import com.itprofaceshow.dto.MessageDTO;

public interface IMessageService extends IBaseService{
    MessageDTO findAll();
    MessageDTO findById(Long id);
    MessageDTO save(MessageDTO messageDto);
    MessageDTO update(MessageDTO messageDto);
    MessageDTO delete(Long id);

    //socket
    void sendMessageToRoom(MessageDTO messageDto);
    void sendInviteMessage(MessageDTO messageDto);
}
