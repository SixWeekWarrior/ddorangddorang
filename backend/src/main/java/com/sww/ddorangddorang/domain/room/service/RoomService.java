package com.sww.ddorangddorang.domain.room.service;

import com.sww.ddorangddorang.domain.room.dto.EndDayInfoRes;
import com.sww.ddorangddorang.domain.room.dto.JoinRoomReq;
import com.sww.ddorangddorang.domain.room.dto.RoomGetRes;
import com.sww.ddorangddorang.domain.room.dto.RoomInfoReq;
import com.sww.ddorangddorang.domain.room.dto.ShowUsersRes;
import com.sww.ddorangddorang.domain.room.dto.StartGameRes;
import com.sww.ddorangddorang.domain.room.dto.WaitingListRes;
import java.util.List;

public interface RoomService {

    Integer createRoom(RoomInfoReq roomInfoReq, Long userId);

    void joinRoom(Integer accessCode, Long userId);

    void updateRoom(RoomInfoReq roomInfoReq, Long userId);

    void deleteGame(Long userId);

    void withdrawalRoom(Long userId);

    List<ShowUsersRes> showUsers(Long userId);

    Boolean responseJoinRoom(List<JoinRoomReq> joinRoomReqList, Long userId);

    StartGameRes checkAndRunIfRoomShouldStart(Long userId);

    StartGameRes checkAndStartGame(Long userId);

    RoomGetRes getRoom(Long id);

    List<WaitingListRes> getWaitingList(Long userId);

    EndDayInfoRes getEndDayInfo(Long userId);
}
