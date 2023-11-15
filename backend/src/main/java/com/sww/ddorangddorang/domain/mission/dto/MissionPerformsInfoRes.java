package com.sww.ddorangddorang.domain.mission.dto;

import com.sww.ddorangddorang.domain.mission.entity.MissionPerform;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@ToString
public class MissionPerformsInfoRes {

    private Long missionId;
    private String title;
    private String content;
    private Boolean isComplete;
    private Long missionType;
    private Integer dayCount;

//    public static MissionPerformsInfoRes of(MissionPerform missionPerform) {
//        // Fetch Join이나 Entity Graph 안쓰면 N+1 문제가 발생한다.
//        return MissionPerformsInfoRes.builder()
//            .missionId(missionPerform.getId())
//            .title(missionPerform.getMission().getTitle())
//            .content(missionPerform.getMission().getContent())
//            .isComplete(missionPerform.getPerformedAt() != null)
//            .missionType(missionPerform.getMission().getMissionType())
//            .build();
//    }

    public static List<MissionPerformsInfoRes> listOf(List<MissionPerform> missionPerforms) {
        return IntStream.range(0, missionPerforms.size())
            .mapToObj(index -> {
                MissionPerform missionPerform = missionPerforms.get(index);
                return MissionPerformsInfoRes.builder()
                    .missionId(missionPerform.getId())
                    .title(missionPerform.getMission().getTitle())
                    .content(missionPerform.getMission().getContent())
                    .isComplete(missionPerform.getPerformedAt() != null)
                    .missionType(missionPerform.getMission().getMissionType())
                    .dayCount(index + 1) // 인덱스는 0부터 시작하므로 1을 더해줌
                    .build();
            })
            .collect(Collectors.toList());
    }
//    public static List<MissionPerformsInfoRes> listOf(List<MissionPerform> missionPerforms) {
//        return missionPerforms.stream()
//            .map(MissionPerformsInfoRes::of)
//            .collect(Collectors.toList());
//    }

}
