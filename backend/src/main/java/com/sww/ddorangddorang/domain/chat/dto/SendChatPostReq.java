package com.sww.ddorangddorang.domain.chat.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class SendChatPostReq {
    private Boolean isSentToManito;
    private String content;

    @Builder
    public SendChatPostReq(Boolean isSentToManito, String content) {
        this.isSentToManito = isSentToManito;
        this.content = content;
    }
}
