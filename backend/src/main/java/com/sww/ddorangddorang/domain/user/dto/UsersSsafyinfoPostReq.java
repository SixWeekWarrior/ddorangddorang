package com.sww.ddorangddorang.domain.user.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UsersSsafyinfoPostReq {

    private String profileImage;
    private Integer campus;
    private Integer classes;
    private Byte isMajor;
    private Integer floor;

    @Builder
    public UsersSsafyinfoPostReq(String profileImage, Integer campus, Integer classes, Byte isMajor, Integer floor) {
        this.profileImage = profileImage;
        this.campus = campus;
        this.classes = classes;
        this.isMajor = isMajor;
        this.floor = floor;
    }
}
