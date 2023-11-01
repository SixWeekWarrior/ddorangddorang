package com.sww.ddorangddorang.domain.room.dto;

import jakarta.validation.constraints.Min;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@ToString
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RoomInfoReq {
    private Boolean isOpen;

    @Min(1)
    private Integer minMember;
    private Integer maxMember;
    private Integer duration;

}
