package com.sww.ddorangddorang.domain.mission.api;

import com.sww.ddorangddorang.auth.dto.CustomOAuth2User;
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
@RequestMapping("/api/v1/missions")
public class MissionApi {

    private final MissionPerformService missionPerformService;
    private static String SUCCESS = "SUCCESS";

    @GetMapping
    CommonResponse<List<MissionPerformsInfoRes>> findMissionByUser(@AuthenticationPrincipal CustomOAuth2User customOAuth2User) {
        log.info("findMissionByUser Controller 진입");
        return CommonResponse.success(missionPerformService.findMissionByUser(customOAuth2User));
    }

    @PostMapping
    CommonResponse<String> missionComplete(@RequestBody MissionCompleteReq missionCompleteReq, @AuthenticationPrincipal CustomOAuth2User customOAuth2User) {
        log.info("missionComplete Controller 진입");
        missionPerformService.missionComplete(missionCompleteReq, customOAuth2User);
        return CommonResponse.success(SUCCESS);
    }

}
