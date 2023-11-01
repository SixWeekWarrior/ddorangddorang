package com.sww.ddorangddorang.domain.mission.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MissionCompleteReq {

    private Long missionId;

}
