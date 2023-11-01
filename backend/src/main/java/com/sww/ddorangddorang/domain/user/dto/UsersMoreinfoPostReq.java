package com.sww.ddorangddorang.domain.user.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UsersMoreinfoPostReq {

    private String mbti;
    private String likes;
    private String hate;
    private String worry;
    @Builder
    public UsersMoreinfoPostReq(String mbti, String likes, String hate, String worry) {
        this.mbti = mbti;
        this.likes = likes;
        this.hate = hate;
        this.worry = worry;
    }

}
