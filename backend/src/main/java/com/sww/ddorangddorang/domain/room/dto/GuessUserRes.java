package com.sww.ddorangddorang.domain.room.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GuessUserRes {
    private Long userId;
    private String name;
    private Byte isMajor;               // TINYINT
    private Integer classes;            // INT
    private String profileImage;        // TEXT "프로필 이미지"

    @Builder
    public GuessUserRes(Long userId, String name, Byte isMajor, Integer classes,
        String profileImage) {
        this.userId = userId;
        this.name = name;
        this.isMajor = isMajor;
        this.classes = classes;
        this.profileImage = profileImage;
    }
}
