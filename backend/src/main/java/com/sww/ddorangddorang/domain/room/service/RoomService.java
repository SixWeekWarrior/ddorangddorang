package com.sww.ddorangddorang.domain.room.service;

import com.sww.ddorangddorang.auth.dto.AuthenticatedUser;
import com.sww.ddorangddorang.domain.room.dto.JoinRoomReq;
import com.sww.ddorangddorang.domain.room.dto.RoomInfoReq;
import com.sww.ddorangddorang.domain.room.dto.ShowUsersRes;
import java.util.List;

public interface RoomService {

    Integer createRoom(RoomInfoReq roomInfoReq, AuthenticatedUser authenticatedUser);

    void joinRoom(Integer accessCode, AuthenticatedUser authenticatedUser);

    void updateRoom(RoomInfoReq roomInfoReq, AuthenticatedUser authenticatedUser);

    void deleteGame(AuthenticatedUser authenticatedUser);

    void withdrawalRoom(AuthenticatedUser authenticatedUser);

    List<ShowUsersRes> showUsers(AuthenticatedUser authenticatedUser);

    Boolean responseJoinRoom(JoinRoomReq joinRoomReq, AuthenticatedUser authenticatedUser);

    Boolean checkAndRunIfRoomShouldStart(AuthenticatedUser authenticatedUser);

    Boolean checkAndStartGame(AuthenticatedUser authenticatedUser);
}
