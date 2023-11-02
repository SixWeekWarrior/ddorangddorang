package com.sww.ddorangddorang.domain.mission.service;

import com.sww.ddorangddorang.auth.dto.CustomOAuth2User;
import com.sww.ddorangddorang.domain.mission.dto.MissionCompleteReq;
import com.sww.ddorangddorang.domain.mission.dto.MissionPerformsInfoRes;
import java.util.List;

public interface MissionPerformService {

    List<MissionPerformsInfoRes> findMissionByUser(CustomOAuth2User customOAuth2User);
    void missionComplete(MissionCompleteReq missionCompleteReq, CustomOAuth2User customOAuth2User);

}
