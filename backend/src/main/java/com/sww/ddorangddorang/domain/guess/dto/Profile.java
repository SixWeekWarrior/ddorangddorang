package com.sww.ddorangddorang.domain.guess.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

@Getter
@DynamicInsert
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Profile {

    private Long userId;
    private String name;
    private Boolean isMajor;
    private Integer classes;
    private String profileImage;

    @Builder
    public Profile(Long userId, String name, Boolean isMajor, Integer classes,
        String profileImage) {
        this.userId = userId;
        this.name = name;
        this.isMajor = isMajor;
        this.classes = classes;
        this.profileImage = profileImage;
    }
}
