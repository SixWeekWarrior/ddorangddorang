package com.sww.ddorangddorang.domain.mission.service;

import com.sww.ddorangddorang.auth.dto.CustomOAuth2User;
import com.sww.ddorangddorang.domain.mission.dto.MissionChangeReq;
import com.sww.ddorangddorang.domain.mission.dto.MissionCompleteReq;
import com.sww.ddorangddorang.domain.mission.dto.MissionPerformAndDayCountRes;

public interface MissionPerformService {

    MissionPerformAndDayCountRes findMissionByUser(CustomOAuth2User customOAuth2User);
    void missionComplete(MissionCompleteReq missionCompleteReq, CustomOAuth2User customOAuth2User);
    void changeMission(MissionChangeReq missionChangeReq, CustomOAuth2User customOAuth2User);
}
