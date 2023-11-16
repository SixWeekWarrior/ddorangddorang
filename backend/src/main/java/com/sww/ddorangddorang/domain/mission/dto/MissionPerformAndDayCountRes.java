package com.sww.ddorangddorang.domain.mission.dto;

import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@ToString
public class MissionPerformAndDayCountRes {

    private List<MissionPerformsInfoRes> missionPerformsInfoRes;
    private long dayCount;
    private long missionCompleteCount;

    public static MissionPerformAndDayCountRes of(
        List<MissionPerformsInfoRes> missionPerformsInfoRes, long dayCount,
        long missionCompleteCount) {
        return MissionPerformAndDayCountRes.builder()
            .missionPerformsInfoRes(missionPerformsInfoRes)
            .dayCount(dayCount)
            .missionCompleteCount(missionCompleteCount)
            .build();
    }

}
