package com.sww.ddorangddorang.domain.mission.service;

import com.sww.ddorangddorang.domain.mission.dto.GetManitiInfoRes;
import com.sww.ddorangddorang.domain.mission.dto.MissionChangeReq;
import com.sww.ddorangddorang.domain.mission.dto.MissionCompleteReq;
import com.sww.ddorangddorang.domain.mission.dto.MissionPerformAndDayCountRes;
import com.sww.ddorangddorang.domain.room.entity.Room;

public interface MissionPerformService {

    void changeMissionAt9Am();

    MissionPerformAndDayCountRes findMissionByUser(Long userId);

    void missionComplete(MissionCompleteReq missionCompleteReq,
        Long userId);

    void changeMission(MissionChangeReq missionChangeReq, Long userId);

    void startGameAndAssignMission(Room room);

    void testAssignMission(Long roomId);

    GetManitiInfoRes getManitiInfo(Long userId);
}
