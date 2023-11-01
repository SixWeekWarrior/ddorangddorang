package com.sww.ddorangddorang.domain.room.api;

import com.sww.ddorangddorang.domain.room.dto.JoinRoomReq;
import com.sww.ddorangddorang.domain.room.dto.RoomInfoReq;
import com.sww.ddorangddorang.domain.room.dto.ShowUsersRes;
import com.sww.ddorangddorang.domain.room.service.RoomService;
import com.sww.ddorangddorang.global.common.CommonResponse;
import jakarta.persistence.criteria.CriteriaBuilder.In;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/rooms")
public class RoomApi {

    private final RoomService roomService;

    @PostMapping
    public CommonResponse<Integer> createRoom(@RequestHeader Long userId, @RequestBody RoomInfoReq roomInfoReq) {
        log.info("RoomApi_createRoom start");
        CommonResponse<Integer> accessCode = roomService.createRoom(userId, roomInfoReq);
        log.info("RoomApi_createRoom end: " + accessCode);
        return accessCode;
    }

    @PostMapping("/join")
    public CommonResponse<Boolean> joinRoom(@RequestHeader Long userId, @RequestBody Integer accessCode) {
        log.info("RoomApi_joinRoom start");
        CommonResponse<Boolean> joinRoomResponse = roomService.joinRoom(userId, accessCode);
        log.info("RoomApi_joinRoom end: " + joinRoomResponse.getData());
        return joinRoomResponse;
    }

    @PutMapping
    public CommonResponse<Boolean> updateRoom(@RequestHeader Long userId, @RequestBody RoomInfoReq roomInfoReq) {
        log.info("RoomApi_updateRoom start");
        CommonResponse<Boolean> updateRoomResponse = roomService.updateRoom(userId, roomInfoReq);
        log.info("RoomApi_updateRoom end: " + updateRoomResponse);

        if (updateRoomResponse.isSuccess()) {
            roomService.checkAndRunIfRoomShouldStart(userId);
        }

        return updateRoomResponse;
    }

    //방장이 방을 삭제하는 API
    //방장을 포함한 전원이 탈퇴
    @DeleteMapping("/admin")
    public CommonResponse<Boolean> deleteRoom(@RequestHeader Long userId) {
        log.info("RoomApi_deleteRoom start");
        CommonResponse<Boolean> deleteRoomResponse = roomService.deleteGame(userId);
        log.info("RoomApi_deleteRoom end");
        return deleteRoomResponse;
    }

    //방 참여 인원이 방을 나가는 API
    //회원 혼자만이 탈퇴
    //방장은 방 탈퇴가 불가능
    @DeleteMapping
    public CommonResponse<Boolean> withdrawalRoom(@RequestHeader Long userId) {
        log.info("RoomApi_withdrawalRoom start");
        CommonResponse<Boolean> withdrawalRoomResponse = roomService.withdrawalRoom(userId);
        log.info("RoomApi_withdrawalRoom end: " + withdrawalRoomResponse);
        return withdrawalRoomResponse;
    }

    @PostMapping("/start")
    public CommonResponse<Boolean> startGame(@RequestHeader Long userId) {
        log.info("RoomApi_startGame start");
        CommonResponse<Boolean> isGameStarted = roomService.checkAndStartGame(userId);
        log.info("RoomApi_startGame end");
        return isGameStarted;
    }

    @GetMapping("/{roomId}")
    public CommonResponse<List<ShowUsersRes>> showUsers(@RequestHeader Long userId, @PathVariable Long roomId) {
        log.info("RoomApi_showUsers start");
        CommonResponse<List<ShowUsersRes>> showUsersResList = roomService.showUsers(userId);
        log.info("RoomApi_showUsers end");
        return showUsersResList;
    }

    @PostMapping("/response")
    public CommonResponse<Boolean> responseJoinRoom(@RequestHeader Long userId,
        @RequestBody JoinRoomReq joinRoomReq) {
        log.info("RoomApi_responseJoinRoom start");
        CommonResponse<Boolean> joined = roomService.responseJoinRoom(userId, joinRoomReq);

        if(joined.isSuccess() && joined.getData()) {
            roomService.checkAndRunIfRoomShouldStart(userId);
        }

        log.info("RoomApi_responseJoinRoom end");
        return joined;
    }

}
