package com.sww.ddorangddorang.domain.room.service;

import com.sww.ddorangddorang.domain.room.dto.RoomInfoReq;
import com.sww.ddorangddorang.domain.room.dto.ShowUsersRes;
import com.sww.ddorangddorang.domain.room.entity.Room;
import java.util.List;

public interface RoomService {

    public Integer createRoom(Long userId, RoomInfoReq roomInfoReq);

    public Boolean joinRoom(Long userId, Integer accessCode);

    public void startGame(Room room);

    public Boolean updateRoom(Long userId, RoomInfoReq roomInfoReq);

    public Boolean deleteGame(Long userId);

    public void checkAndRunIfRoomShouldStart(Long userId);

    public Boolean withdrawalRoom(Long userId);

    public List<ShowUsersRes> showUsers(Long userId);
}
