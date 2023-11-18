package com.sww.ddorangddorang.domain.room.api;

import com.sww.ddorangddorang.auth.dto.AuthenticatedUser;
import com.sww.ddorangddorang.domain.mission.service.MissionPerformService;
import com.sww.ddorangddorang.domain.room.dto.AccessCodeReq;
import com.sww.ddorangddorang.domain.room.dto.EndDayInfoRes;
import com.sww.ddorangddorang.domain.room.dto.JoinRoomReq;
import com.sww.ddorangddorang.domain.room.dto.RoomGetRes;
import com.sww.ddorangddorang.domain.room.dto.RoomInfoReq;
import com.sww.ddorangddorang.domain.room.dto.ShowUsersRes;
import com.sww.ddorangddorang.domain.room.dto.WaitingListRes;
import com.sww.ddorangddorang.domain.room.service.RoomNotificationService;
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

    private final static String SUCCESS = "SUCCESS";
    private final RoomService roomService;
    private final RoomNotificationService roomNotificationService;
    private final MissionPerformService missionPerformService;

    @GetMapping
    public CommonResponse<RoomGetRes> getRoom(
        @AuthenticationPrincipal AuthenticatedUser authenticatedUser) {
        log.info("RoomApi_getRoom start");
        RoomGetRes roomGetRes = roomService.getRoom(authenticatedUser.getId());
        log.info("RoomApi_getRoom end: Room id - {}", roomGetRes);
        return CommonResponse.success(roomGetRes);
    }

    @PostMapping
    public CommonResponse<Integer> createRoom(@RequestBody RoomInfoReq roomInfoReq,
        @AuthenticationPrincipal AuthenticatedUser authenticatedUser) {
        log.info("RoomApi_createRoom start");
        Integer accessCode = roomService.createRoom(roomInfoReq, authenticatedUser.getId());
        log.info("RoomApi_createRoom end: " + accessCode);
        return CommonResponse.success(accessCode);
    }

    // 테스트 완료, accessCode를 @RequestBody 어노테이션을 통해 Integer 단일 값으로는 받을 수 없음. 수정후 NullPointerException 수정했고 정상 작동 확인함
    @PostMapping("/join")
    public CommonResponse<String> joinRoom(@RequestBody AccessCodeReq accessCodeReq,
        @AuthenticationPrincipal AuthenticatedUser authenticatedUser) {
        log.info("RoomApi_joinRoom start");
        roomService.joinRoom(accessCodeReq.getAccessCode(), authenticatedUser.getId());
        roomNotificationService.notifyJoin(accessCodeReq.getAccessCode(),
            authenticatedUser.getId());
        log.info("RoomApi_joinRoom end");
        return CommonResponse.success(SUCCESS);
    }

    // 테스트 완료, 수정사항 없음
    @PutMapping
    public CommonResponse<String> updateRoom(@RequestBody RoomInfoReq roomInfoReq,
        @AuthenticationPrincipal AuthenticatedUser authenticatedUser) {
        log.info("RoomApi_updateRoom start");
        roomService.updateRoom(roomInfoReq, authenticatedUser.getId());
        roomService.checkAndRunIfRoomShouldStart(authenticatedUser.getId());
        log.info("RoomApi_updateRoom end");
        return CommonResponse.success(SUCCESS);
    }

    //방장이 방을 삭제하는 API
    //방장을 포함한 전원이 탈퇴
    @DeleteMapping("/admin")
    public CommonResponse<String> deleteRoom(
        @AuthenticationPrincipal AuthenticatedUser authenticatedUser) {
        log.info("RoomApi_deleteRoom start");
        roomService.deleteGame(authenticatedUser.getId());
        log.info("RoomApi_deleteRoom end");
        return CommonResponse.success(SUCCESS);
    }

    // TODO: 테스트 완료, 추후 주석 삭제하기, Entity쪽 3개의 코드 수정 컨펌받기
    //방 참여 인원이 방을 나가는 API
    //회원 혼자만이 탈퇴
    //방장은 방 탈퇴가 불가능
    @DeleteMapping
    public CommonResponse<String> withdrawalRoom(
        @AuthenticationPrincipal AuthenticatedUser authenticatedUser) {
        log.info("RoomApi_withdrawalRoom start");
        roomService.withdrawalRoom(authenticatedUser.getId());
        log.info("RoomApi_withdrawalRoom end");
        return CommonResponse.success(SUCCESS);
    }

    @PostMapping("/start")
    public CommonResponse<String> startGame(
        @AuthenticationPrincipal AuthenticatedUser authenticatedUser) {
        log.info("RoomApi_startGame start");
        roomService.checkAndStartGame(authenticatedUser.getId());
        log.info("RoomApi_startGame end");
        return CommonResponse.success(SUCCESS);
    }

    // 현재 방 참가자가 나오는건 확인하였음
    @GetMapping("/{roomId}")
    public CommonResponse<List<ShowUsersRes>> showUsers(@PathVariable Long roomId,
        @AuthenticationPrincipal AuthenticatedUser authenticatedUser) {
        log.info("RoomApi_showUsers start");
        List<ShowUsersRes> showUsersResList = roomService.showUsers(authenticatedUser.getId());
        log.info("RoomApi_showUsers end");
        return CommonResponse.success(showUsersResList);
    }

    // 수락시 유저 상태 3으로 바뀌는거 확인하였음. 정상 작동함.
    @PostMapping("/response")
    public CommonResponse<Boolean> responseJoinRoom(@RequestBody List<JoinRoomReq> joinRoomReqList,
        @AuthenticationPrincipal AuthenticatedUser authenticatedUser) {
        log.info("RoomApi_responseJoinRoom start");
        Boolean joined = roomService.responseJoinRoom(joinRoomReqList, authenticatedUser.getId());

        if (joined) {
            roomService.checkAndRunIfRoomShouldStart(authenticatedUser.getId());
        }

        log.info("RoomApi_responseJoinRoom end");
        return CommonResponse.success(joined);
    }

    // 테스트 완료
    @GetMapping("/waiting")
    public CommonResponse<List<WaitingListRes>> getWaitingList(
        @AuthenticationPrincipal AuthenticatedUser authenticatedUser) {
        log.info("RoomApi_getWaitingList start");
        List<WaitingListRes> waitingListResList = roomService.getWaitingList(
            authenticatedUser.getId());
        log.info("RoomApi_getWaitingList end");
        return CommonResponse.success(waitingListResList);
    }

    @GetMapping("/end")
    public CommonResponse<EndDayInfoRes> getEndDayInfo(
        @AuthenticationPrincipal AuthenticatedUser authenticatedUser) {
        log.info("RoomApi_getEndDayInfo start");
        EndDayInfoRes endDayInfoRes = roomService.getEndDayInfo(authenticatedUser.getId());
        log.info("RoomApi_getEndDayInfo end");
        return CommonResponse.success(endDayInfoRes);
    }
}
