package com.sww.ddorangddorang.domain.guess.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

@Getter
@DynamicInsert
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GuessUserPostRes {
    private Long userId;
    private String name;
    private Boolean isMajor;
    private Integer classes;

    @Builder
    public GuessUserPostRes(Long userId, String name, Boolean isMajor, Integer classes) {
        this.userId = userId;
        this.name = name;
        this.isMajor = isMajor;
        this.classes = classes;
    }
}
