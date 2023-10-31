package com.sww.ddorangddorang.domain.room.dto;

import lombok.Getter;
import lombok.ToString;

@ToString
@Getter
public class JoinRoomReq {
    private Long userId;
    private Boolean accepted;

}
