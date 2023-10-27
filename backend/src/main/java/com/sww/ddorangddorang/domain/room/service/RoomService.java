package com.sww.ddorangddorang.domain.room.service;

import com.sww.ddorangddorang.domain.room.dto.RoomInfoReq;

public interface RoomService {
    public Integer createRoom(Long userId, RoomInfoReq roomInfoReq);
}
