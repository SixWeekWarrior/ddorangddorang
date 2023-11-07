package com.sww.ddorangddorang.auth.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TokenClaims {
    private Long id;
    private String email;

    @Builder
    public TokenClaims(Long id, String email) {
        this.id = id;
        this.email = email;
    }
}
