package com.sww.ddorangddorang.domain.mission.api;

import com.sww.ddorangddorang.auth.dto.AuthenticatedUser;
import com.sww.ddorangddorang.domain.mission.dto.MissionChangeReq;
import com.sww.ddorangddorang.domain.mission.dto.MissionCompleteReq;
import com.sww.ddorangddorang.domain.mission.dto.MissionPerformAndDayCountRes;
import com.sww.ddorangddorang.domain.mission.service.MissionPerformService;
import com.sww.ddorangddorang.global.common.CommonResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/missions")
public class MissionApi {

    private final MissionPerformService missionPerformService;
    private static final String SUCCESS = "SUCCESS";

    // 유저가 가지고 있는 미션들을 조회하는 메소드
    @GetMapping
    public CommonResponse<MissionPerformAndDayCountRes> findMissionByUser(@AuthenticationPrincipal AuthenticatedUser authenticatedUser) {
        log.info("findMissionByUser Controller 진입");
        return CommonResponse.success(missionPerformService.findMissionByUser(authenticatedUser));
    }


    // 유저가 미션을 완료했을 때 호출되는 메소드
    @PostMapping
    public CommonResponse<String> missionComplete(@RequestBody MissionCompleteReq missionCompleteReq, @AuthenticationPrincipal AuthenticatedUser authenticatedUser) {
        log.info("missionComplete Controller 진입");
        missionPerformService.missionComplete(missionCompleteReq, authenticatedUser);
        return CommonResponse.success(SUCCESS);
    }

    // 미션 변경 요청
    @PutMapping
    public CommonResponse<String> changeMission(@RequestBody MissionChangeReq missionChangeReq, @AuthenticationPrincipal AuthenticatedUser authenticatedUser) {
        log.info("changeMission Controller 진입");
        missionPerformService.changeMission(missionChangeReq, authenticatedUser);
        return CommonResponse.success(SUCCESS);
    }

}
