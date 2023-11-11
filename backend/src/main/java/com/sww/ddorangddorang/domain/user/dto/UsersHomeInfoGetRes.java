package com.sww.ddorangddorang.domain.user.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

@Getter
@DynamicInsert
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UsersHomeInfoGetRes {

    private String color;
    private String mood;
    private Long dday;
    private Boolean isMissionDone;
    private String missionTitle;
    private Long missionId;
    private Long missionPerformId;

    @Builder
    public UsersHomeInfoGetRes(String color, String mood, Long dday, Boolean isMissionDone,
        String missionTitle, Long missionId, Long missionPerformId) {
        this.color = color;
        this.mood = mood;
        this.dday = dday;
        this.isMissionDone = isMissionDone;
        this.missionTitle = missionTitle;
        this.missionId = missionId;
        this.missionPerformId = missionPerformId;
    }
}
