package com.sww.ddorangddorang.domain.chat.entity;

import com.sww.ddorangddorang.domain.participant.entity.Participant;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = lombok.AccessLevel.PROTECTED)
@Entity
public class ChatMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;                    // BIGINT

    @ManyToOne(fetch = FetchType.LAZY)
    private Chat chat;                // BIGINT "chat_id"

    @ManyToOne(fetch = FetchType.LAZY)
    private Participant sender;                // BIGINT "sender_id"
    private String content;
    LocalDateTime createdAt = LocalDateTime.now().plusHours(9L);   // TIMESTAMP "생성 시간"
    LocalDateTime deletedAt;    // TIMESTAMP "삭제 시간"

    @Builder
    public ChatMessage(Chat chat, Participant sender, String content) {
        this.chat = chat;
        this.sender = sender;
        this.content = content;
    }
}
