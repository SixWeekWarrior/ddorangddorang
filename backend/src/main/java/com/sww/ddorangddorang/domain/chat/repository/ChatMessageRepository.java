package com.sww.ddorangddorang.domain.chat.repository;

import com.sww.ddorangddorang.domain.chat.entity.Chat;
import com.sww.ddorangddorang.domain.chat.entity.ChatMessage;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {

    List<ChatMessage> findByChat(Chat chat);
}
