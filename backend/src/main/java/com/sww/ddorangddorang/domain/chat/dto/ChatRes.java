package com.sww.ddorangddorang.domain.chat.dto;

import lombok.Builder;

public class ChatRes {
    private Boolean isSentByMe;
    private String content;

    @Builder
    public ChatRes(Boolean isSentByMe, String content) {
        this.isSentByMe = isSentByMe;
        this.content = content;
    }
}
