package com.sww.ddorangddorang.domain.mission.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

@Getter
@DynamicInsert
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GetManitiInfoRes {
    private String name;
    private Boolean isMajor;
    private Integer classes;

    @Builder
    public GetManitiInfoRes(String name, Boolean isMajor, Integer classes) {
        this.name = name;
        this.isMajor = isMajor;
        this.classes = classes;
    }
}
