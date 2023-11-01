package com.sww.ddorangddorang.domain.mission.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MissionPerformsInfoRes {

    private Long missionId;
    private String title;
    private String content;
    private Boolean isComplete;
    private Long missionType;

}
