package com.itprofaceshow.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class MessageDTO extends BaseDTO{

    public enum MessageType {
        IN_ROOM,
        EXCEPTION,
        REMOVE_REDIRECT,
        INVITE
    }

    private Long id;
    private String content;
    private String userUsername;
    private String roomId;
    private String receivedUserUsername;
    private MessageType type;
}
