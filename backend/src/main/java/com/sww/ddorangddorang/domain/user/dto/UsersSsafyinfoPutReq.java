package com.sww.ddorangddorang.domain.user.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UsersSsafyinfoPutReq {

    private String profileImage;
    private Integer classes;
    private Integer floor;

}
