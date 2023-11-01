package com.sww.ddorangddorang.domain.room.dto;

import jakarta.validation.constraints.Min;
import lombok.Getter;
import lombok.ToString;

@ToString
@Getter
public class RoomInfoReq {
    private Boolean isOpen;

    @Min(1)
    private Integer minMember;
    private Integer maxMember;
    private Integer duration;

}
