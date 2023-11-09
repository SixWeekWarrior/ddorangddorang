package com.sww.ddorangddorang.domain.user.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UsersMoreinfoPutReq {

    private String mbti;
    private String like;
    private String hate;
    private String worry;

}
