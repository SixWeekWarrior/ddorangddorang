package com.sww.ddorangddorang.domain.chat.dto;

import com.sww.ddorangddorang.domain.chat.entity.ChatMessage;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@ToString
public class ChatMessageRes {

    private Boolean isMine;
    private String content;
    private String createdAt;

    public static ChatMessageRes of(ChatMessage chatMessage, Long currentParticipantId) {
        return ChatMessageRes.builder()
            .content(chatMessage.getContent())
            .createdAt(chatMessage.getCreatedAt().toString()) // 날짜 형식은 적절히 조정하세요
            .isMine(chatMessage.getSender().getId().equals(currentParticipantId))
            .build();
    }

    public static List<ChatMessageRes> listOf(List<ChatMessage> chatMessages,
        Long currentParticipantId) {
        return chatMessages.stream()
            .map(chatMessage -> ChatMessageRes.of(chatMessage, currentParticipantId))
            .collect(Collectors.toList());
    }
}
