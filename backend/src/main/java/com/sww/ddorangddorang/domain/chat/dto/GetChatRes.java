package com.sww.ddorangddorang.domain.chat.dto;

import lombok.Builder;
import lombok.Getter;

public class GetChatRes {
    private Boolean isFromManito;
    private String lastContent;

    @Builder
    public GetChatRes(Boolean isFromManito, String lastContent) {
        this.isFromManito = isFromManito;
        this.lastContent = lastContent;
    }
}
