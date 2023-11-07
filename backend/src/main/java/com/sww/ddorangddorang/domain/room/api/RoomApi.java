package com.sww.ddorangddorang.domain.room.api;

import com.sww.ddorangddorang.auth.dto.AuthenticatedUser;
import com.sww.ddorangddorang.domain.room.dto.JoinRoomReq;
import com.sww.ddorangddorang.domain.room.dto.RoomInfoReq;
import com.sww.ddorangddorang.domain.room.dto.ShowUsersRes;
import com.sww.ddorangddorang.domain.room.service.RoomService;
import com.sww.ddorangddorang.global.common.CommonResponse;
import java.util.List;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
    public CommonResponse<Integer> createRoom(@RequestBody RoomInfoReq roomInfoReq,
        @AuthenticationPrincipal AuthenticatedUser authenticatedUser) {
        log.info("RoomApi_createRoom start");
        Integer accessCode = roomService.createRoom(roomInfoReq, authenticatedUser);
        log.info("RoomApi_createRoom end: " + accessCode);
        return CommonResponse.success(accessCode);
    }

    @PostMapping("/join")
    public CommonResponse<String> joinRoom(@RequestBody Integer accessCode,
        @AuthenticationPrincipal AuthenticatedUser authenticatedUser) {
        log.info("RoomApi_joinRoom start");
        roomService.joinRoom(accessCode, authenticatedUser);
        log.info("RoomApi_joinRoom end");
        return CommonResponse.success(SUCCESS);
    }

    @PutMapping
    public CommonResponse<String> updateRoom(@RequestBody RoomInfoReq roomInfoReq,
        @AuthenticationPrincipal AuthenticatedUser authenticatedUser) {
        log.info("RoomApi_updateRoom start");
        roomService.updateRoom(roomInfoReq, authenticatedUser);
        roomService.checkAndRunIfRoomShouldStart(authenticatedUser);
        log.info("RoomApi_updateRoom end");
        return CommonResponse.success(SUCCESS);
    }

    //방장이 방을 삭제하는 API
    //방장을 포함한 전원이 탈퇴
    @DeleteMapping("/admin")
    public CommonResponse<String> deleteRoom(
        @AuthenticationPrincipal AuthenticatedUser authenticatedUser) {
        log.info("RoomApi_deleteRoom start");
        roomService.deleteGame(authenticatedUser);
        log.info("RoomApi_deleteRoom end");
        return CommonResponse.success(SUCCESS);
    }

    //방 참여 인원이 방을 나가는 API
    //회원 혼자만이 탈퇴
    //방장은 방 탈퇴가 불가능
    @DeleteMapping
    public CommonResponse<String> withdrawalRoom(
        @AuthenticationPrincipal AuthenticatedUser authenticatedUser) {
        log.info("RoomApi_withdrawalRoom start");
        roomService.withdrawalRoom(authenticatedUser);
        log.info("RoomApi_withdrawalRoom end");
        return CommonResponse.success(SUCCESS);
    }

    @PostMapping("/start")
    public CommonResponse<String> startGame(
        @AuthenticationPrincipal AuthenticatedUser authenticatedUser) {
        log.info("RoomApi_startGame start");
        roomService.checkAndStartGame(authenticatedUser);
        log.info("RoomApi_startGame end");
        return CommonResponse.success(SUCCESS);
    }

    @GetMapping("/{roomId}")
    public CommonResponse<List<ShowUsersRes>> showUsers(@PathVariable Long roomId,
        @AuthenticationPrincipal AuthenticatedUser authenticatedUser) {
        log.info("RoomApi_showUsers start");
        List<ShowUsersRes> showUsersResList = roomService.showUsers(authenticatedUser);
        log.info("RoomApi_showUsers end");
        return CommonResponse.success(showUsersResList);
    }

    @PostMapping("/response")
    public CommonResponse<Boolean> responseJoinRoom(
        @RequestBody JoinRoomReq joinRoomReq,
        @AuthenticationPrincipal AuthenticatedUser authenticatedUser) {
        log.info("RoomApi_responseJoinRoom start");
        Boolean joined = roomService.responseJoinRoom(joinRoomReq, authenticatedUser);

        if (joined) {
            roomService.checkAndRunIfRoomShouldStart(authenticatedUser);
        }

        log.info("RoomApi_responseJoinRoom end");
        return CommonResponse.success(joined);
    }

}
