package com.itprofaceshow.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "room")
@Getter @Setter
@NoArgsConstructor
public class RoomEntity extends BaseEntity{
    @Id
    @Column(name = "id")
    private String id;

    @ManyToOne
    @JoinColumn(name = "host_username")
    private UserEntity hostUser;

    @OneToMany(mappedBy = "room")
    private List<MessageEntity> messages = new ArrayList<>();

    @ManyToMany
    @JoinTable(name = "join_user_room",
            joinColumns = @JoinColumn(name = "room_id"),
            inverseJoinColumns = @JoinColumn(name = "username")
    )
    private List<UserEntity> joinedUsers = new ArrayList<>();

    @Column(name = "name", columnDefinition = "TEXT")
    private String name;

    @Column(name = "hidden_password")
    private String hiddenPassword;
}
