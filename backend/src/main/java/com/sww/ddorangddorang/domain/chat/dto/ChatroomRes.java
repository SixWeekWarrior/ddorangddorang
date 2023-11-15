package com.sww.ddorangddorang.domain.chat.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@ToString
public class ChatroomRes {

    private Long manitoChatRoomId;
    private Long manitiChatRoomId;

    public static ChatroomRes of(Long manitoChatRoomId, Long manitiChatRoomId) {
        return ChatroomRes.builder()
            .manitoChatRoomId(manitoChatRoomId)
            .manitiChatRoomId(manitiChatRoomId)
            .build();
    }
}
