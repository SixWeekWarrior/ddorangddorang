package com.sww.ddorangddorang.domain.user.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UsersSsafyinfoPutReq {

    private Integer generation;
    private String profileImage;
    private Integer campus;
    private Integer classes;
    private Byte isMajor;
    private Integer floor;

}
