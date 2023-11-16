package com.sww.ddorangddorang.domain.room.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@ToString
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ShowUsersRes {

    private String name;
    private String profileImage;
    private Integer generation;
    private Integer classes;

    @Builder
    public ShowUsersRes(String name, String profileImage, Integer generation, Integer classes) {
        this.name = name;
        this.profileImage = profileImage;
        this.generation = generation;
        this.classes = classes;
    }
}
