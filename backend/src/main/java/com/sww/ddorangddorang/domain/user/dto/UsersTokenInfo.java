package com.sww.ddorangddorang.domain.user.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UsersTokenInfo {
    private String email;
    private String refreshToken;

    @Builder
    public UsersTokenInfo(String email, String refreshToken) {
        this.email = email;
        this.refreshToken = refreshToken;
    }
}
