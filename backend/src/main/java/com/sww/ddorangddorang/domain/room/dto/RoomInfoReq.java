package com.sww.ddorangddorang.domain.room.dto;

import lombok.Getter;
import lombok.ToString;

@ToString
@Getter
public class RoomInfoReq {
    private Boolean isOpen;
    private Integer minMember;
    private Integer maxMember;
    private Integer duration;

}
