package com.itprofaceshow.dto;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter @Setter
public class UserDTO extends BaseDTO{
    private String username;
    private String password;
    private String fullName;
    private String address;
    private String avatar;
    private String phone;
    private String status;
    private String token;
    private List<String> roomIds = new ArrayList<>();
    private List<Long> messageIds = new ArrayList<>();
    private List<String> joinedRoomIds = new ArrayList<>();
}
