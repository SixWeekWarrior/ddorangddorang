package com.sww.ddorangddorang.domain.mission.api;

import com.sww.ddorangddorang.auth.dto.AuthenticatedUser;
import com.sww.ddorangddorang.domain.mission.dto.MissionCompleteReq;
import com.sww.ddorangddorang.domain.mission.dto.MissionPerformsInfoRes;
import com.sww.ddorangddorang.domain.mission.service.MissionPerformService;
import com.sww.ddorangddorang.global.common.CommonResponse;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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

    @GetMapping
    public CommonResponse<List<MissionPerformsInfoRes>> findMissionByUser(@AuthenticationPrincipal AuthenticatedUser authenticatedUser) {
        log.info("findMissionByUser Controller 진입");
        return CommonResponse.success(missionPerformService.findMissionByUser(authenticatedUser));
    }

    @PostMapping
    public CommonResponse<String> missionComplete(@RequestBody MissionCompleteReq missionCompleteReq, @AuthenticationPrincipal AuthenticatedUser authenticatedUser) {
        log.info("missionComplete Controller 진입");
        missionPerformService.missionComplete(missionCompleteReq, authenticatedUser);
        return CommonResponse.success(SUCCESS);
    }

}
