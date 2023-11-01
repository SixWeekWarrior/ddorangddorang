package com.sww.ddorangddorang.domain.room.service;

import com.sww.ddorangddorang.domain.room.dto.JoinRoomReq;
import com.sww.ddorangddorang.domain.room.dto.RoomInfoReq;
import com.sww.ddorangddorang.domain.room.dto.ShowUsersRes;
import com.sww.ddorangddorang.global.common.CommonResponse;
import java.util.List;

public interface RoomService {

    public Integer createRoom(Long userId, RoomInfoReq roomInfoReq);

    public void joinRoom(Long userId, Integer accessCode);

    public void updateRoom(Long userId, RoomInfoReq roomInfoReq);

    public void deleteGame(Long userId);

    public void withdrawalRoom(Long userId);

    public List<ShowUsersRes> showUsers(Long userId);

    public Boolean responseJoinRoom(Long userId, JoinRoomReq joinRoomReq);

    public Boolean checkAndRunIfRoomShouldStart(Long userId);

    public Boolean checkAndStartGame(Long userId);
}
