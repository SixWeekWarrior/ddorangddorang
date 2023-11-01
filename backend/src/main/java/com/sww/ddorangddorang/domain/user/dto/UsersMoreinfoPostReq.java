package com.sww.ddorangddorang.domain.user.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UsersMoreinfoPostReq {

    private String mbti;
    private String like;
    private String hate;
    private String worry;
    @Builder
    public UsersMoreinfoPostReq(String mbti, String like, String hate, String worry) {
        this.mbti = mbti;
        this.like = like;
        this.hate = hate;
        this.worry = worry;
    }

}
