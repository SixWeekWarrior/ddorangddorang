package com.sww.ddorangddorang.domain.mission.service;

import com.sww.ddorangddorang.auth.dto.AuthenticatedUser;
import com.sww.ddorangddorang.domain.mission.dto.MissionChangeReq;
import com.sww.ddorangddorang.domain.mission.dto.MissionCompleteReq;
import com.sww.ddorangddorang.domain.mission.dto.MissionPerformAndDayCountRes;
import com.sww.ddorangddorang.domain.room.entity.Room;

public interface MissionPerformService {

    void changeMissionAt9Am();

    MissionPerformAndDayCountRes findMissionByUser(AuthenticatedUser authenticatedUser);

    void missionComplete(MissionCompleteReq missionCompleteReq,
        AuthenticatedUser authenticatedUser);

    void changeMission(MissionChangeReq missionChangeReq, AuthenticatedUser authenticatedUser);

    void startGameAndAssignMission(Room room);

    void testAssignMission(Long roomId);
}
