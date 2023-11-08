package com.sww.ddorangddorang.domain.user.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class HintDto {
    private String mood;        // 1_002
    private String color;       // 1_001

    @Builder
    public HintDto(String mood, String color) {
        this.mood = mood;
        this.color = color;
    }
}
