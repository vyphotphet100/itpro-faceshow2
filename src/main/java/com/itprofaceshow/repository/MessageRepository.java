package com.itprofaceshow.repository;

import com.itprofaceshow.entity.MessageEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<MessageEntity, Long> {
    void deleteByRoomId(String roomId);
}
