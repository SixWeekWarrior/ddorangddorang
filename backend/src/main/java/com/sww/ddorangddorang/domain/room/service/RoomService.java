package com.sww.ddorangddorang.domain.room.service;

import com.sww.ddorangddorang.auth.dto.AuthenticatedUser;
import com.sww.ddorangddorang.domain.room.dto.EndDayInfoRes;
import com.sww.ddorangddorang.domain.room.dto.JoinRoomReq;
import com.sww.ddorangddorang.domain.room.dto.RoomGetRes;
import com.sww.ddorangddorang.domain.room.dto.RoomInfoReq;
import com.sww.ddorangddorang.domain.room.dto.ShowUsersRes;
import com.sww.ddorangddorang.domain.room.dto.WaitingListRes;
import java.util.List;

public interface RoomService {

    Integer createRoom(RoomInfoReq roomInfoReq, AuthenticatedUser authenticatedUser);

    void joinRoom(Integer accessCode, AuthenticatedUser authenticatedUser);

    void updateRoom(RoomInfoReq roomInfoReq, AuthenticatedUser authenticatedUser);

    void deleteGame(AuthenticatedUser authenticatedUser);

    void withdrawalRoom(AuthenticatedUser authenticatedUser);

    List<ShowUsersRes> showUsers(AuthenticatedUser authenticatedUser);

    Boolean responseJoinRoom(List<JoinRoomReq> joinRoomReqList, AuthenticatedUser authenticatedUser);

    Boolean checkAndRunIfRoomShouldStart(AuthenticatedUser authenticatedUser);

    Boolean checkAndStartGame(AuthenticatedUser authenticatedUser);

    RoomGetRes getRoom(Long id);

    List<WaitingListRes> getWaitingList(Long userId);

    EndDayInfoRes getEndDayInfo(Long userId);
}
