package com.sww.ddorangddorang.domain.room.api;

import com.sww.ddorangddorang.domain.room.dto.JoinRoomReq;
import com.sww.ddorangddorang.domain.room.dto.RoomInfoReq;
import com.sww.ddorangddorang.domain.room.dto.ShowUsersRes;
import com.sww.ddorangddorang.domain.room.service.RoomService;
import com.sww.ddorangddorang.global.common.CommonResponse;
import jakarta.persistence.criteria.CriteriaBuilder.In;
import java.util.List;

import com.sww.ddorangddorang.global.common.CommonResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
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
@RequestMapping("/rooms")
public class RoomApi {

    private final RoomService roomService;
    private final static String SUCCESS = "SUCCESS";

    @PostMapping
    public CommonResponse<Integer> createRoom(@RequestHeader Long userId,
        @RequestBody RoomInfoReq roomInfoReq) {
        log.info("RoomApi_createRoom start");
        Integer accessCode = roomService.createRoom(userId, roomInfoReq);
        log.info("RoomApi_createRoom end: " + accessCode);
        return CommonResponse.success(accessCode);
    }

    @PostMapping("/join")
    public CommonResponse<String> joinRoom(@RequestHeader Long userId,
        @RequestBody Integer accessCode) {
        log.info("RoomApi_joinRoom start");
        roomService.joinRoom(userId, accessCode);
        log.info("RoomApi_joinRoom end");
        return CommonResponse.success(SUCCESS);
    }

    @PutMapping
    public CommonResponse<String> updateRoom(@RequestHeader Long userId,
        @RequestBody RoomInfoReq roomInfoReq) {
        log.info("RoomApi_updateRoom start");
        roomService.updateRoom(userId, roomInfoReq);
        roomService.checkAndRunIfRoomShouldStart(userId);
        log.info("RoomApi_updateRoom end");
        return CommonResponse.success(SUCCESS);
    }

    //방장이 방을 삭제하는 API
    //방장을 포함한 전원이 탈퇴
    @DeleteMapping("/admin")
    public CommonResponse<String> deleteRoom(@RequestHeader Long userId) {
        log.info("RoomApi_deleteRoom start");
        roomService.deleteGame(userId);
        log.info("RoomApi_deleteRoom end");
        return CommonResponse.success(SUCCESS);
    }

    //방 참여 인원이 방을 나가는 API
    //회원 혼자만이 탈퇴
    //방장은 방 탈퇴가 불가능
    @DeleteMapping
    public CommonResponse<String> withdrawalRoom(@RequestHeader Long userId) {
        log.info("RoomApi_withdrawalRoom start");
        roomService.withdrawalRoom(userId);
        log.info("RoomApi_withdrawalRoom end");
        return CommonResponse.success(SUCCESS);
    }

    @PostMapping("/start")
    public CommonResponse<String> startGame(@RequestHeader Long userId) {
        log.info("RoomApi_startGame start");
        roomService.checkAndStartGame(userId);
        log.info("RoomApi_startGame end");
        return CommonResponse.success(SUCCESS);
    }

    @GetMapping("/{roomId}")
    public CommonResponse<List<ShowUsersRes>> showUsers(@RequestHeader Long userId,
        @PathVariable Long roomId) {
        log.info("RoomApi_showUsers start");
        List<ShowUsersRes> showUsersResList = roomService.showUsers(userId);
        log.info("RoomApi_showUsers end");
        return CommonResponse.success(showUsersResList);
    }

    @PostMapping("/response")
    public CommonResponse<Boolean> responseJoinRoom(@RequestHeader Long userId,
        @RequestBody JoinRoomReq joinRoomReq) {
        log.info("RoomApi_responseJoinRoom start");
        Boolean joined = roomService.responseJoinRoom(userId, joinRoomReq);

        if (joined) {
            roomService.checkAndRunIfRoomShouldStart(userId);
        }

        log.info("RoomApi_responseJoinRoom end");
        return CommonResponse.success(joined);
    }

}
