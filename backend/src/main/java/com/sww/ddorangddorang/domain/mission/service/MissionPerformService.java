package com.sww.ddorangddorang.domain.mission.service;

import com.sww.ddorangddorang.auth.dto.AuthenticatedUser;
import com.sww.ddorangddorang.domain.mission.dto.MissionCompleteReq;
import com.sww.ddorangddorang.domain.mission.dto.MissionPerformsInfoRes;
import java.util.List;

public interface MissionPerformService {

    List<MissionPerformsInfoRes> findMissionByUser(AuthenticatedUser authenticatedUser);
    void missionComplete(MissionCompleteReq missionCompleteReq, AuthenticatedUser authenticatedUser);

}
