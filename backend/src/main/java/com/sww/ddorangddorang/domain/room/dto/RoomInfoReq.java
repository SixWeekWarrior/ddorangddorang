package com.sww.ddorangddorang.domain.room.dto;

import lombok.Getter;
import lombok.ToString;

@ToString
@Getter
public class RoomInfoReq {
    Boolean isOpen;
    Integer minMember;
    Integer maxMember;
    Integer duration;

}
