package com.itprofaceshow.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "user")
@Getter
@Setter
@NoArgsConstructor
public class UserEntity extends BaseEntity {
    @Id
    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "address")
    private String address;

    @Column(name = "avatar")
    private String avatar;

    @Column(name = "phone")
    private String phone;

    @Column(name = "status")
    private String status;

    @Column(name = "token", columnDefinition = "TEXT")
    private String token;

    @OneToMany(mappedBy = "hostUser")
    private List<RoomEntity> rooms = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<MessageEntity> messages = new ArrayList<>();

    @ManyToMany(mappedBy = "joinedUsers")
    private List<RoomEntity> joinedRooms = new ArrayList<>();

}
