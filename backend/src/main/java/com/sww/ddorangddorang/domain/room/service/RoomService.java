package com.sww.ddorangddorang.domain.room.service;

import com.sww.ddorangddorang.domain.room.dto.JoinRoomReq;
import com.sww.ddorangddorang.domain.room.dto.RoomInfoReq;
import com.sww.ddorangddorang.domain.room.dto.ShowUsersRes;
import com.sww.ddorangddorang.global.common.CommonResponse;
import java.util.List;

public interface RoomService {

    public CommonResponse<Integer> createRoom(Long userId, RoomInfoReq roomInfoReq);

    public CommonResponse<Boolean> joinRoom(Long userId, Integer accessCode);

    public CommonResponse<Boolean> updateRoom(Long userId, RoomInfoReq roomInfoReq);

    public CommonResponse<Boolean> deleteGame(Long userId);

    public CommonResponse<Boolean> withdrawalRoom(Long userId);

    public CommonResponse<List<ShowUsersRes>> showUsers(Long userId);

    public CommonResponse<Boolean> responseJoinRoom(Long userId, JoinRoomReq joinRoomReq);

    public Boolean checkAndRunIfRoomShouldStart(Long userId);

    public CommonResponse<Boolean> checkAndStartGame(Long userId);
}
