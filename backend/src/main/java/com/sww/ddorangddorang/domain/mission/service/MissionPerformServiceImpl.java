package com.sww.ddorangddorang.domain.mission.service;

import com.sww.ddorangddorang.auth.dto.AuthenticatedUser;
import com.sww.ddorangddorang.domain.mission.dto.MissionCompleteReq;
import com.sww.ddorangddorang.domain.mission.dto.MissionPerformsInfoRes;
import com.sww.ddorangddorang.domain.mission.entity.MissionPerform;
import com.sww.ddorangddorang.domain.mission.exception.MissionNotFoundException;
import com.sww.ddorangddorang.domain.mission.repository.MissionPerformRepository;
import com.sww.ddorangddorang.domain.participant.entity.Participant;
import com.sww.ddorangddorang.domain.participant.exception.ParticipantNotFoundException;
import com.sww.ddorangddorang.domain.participant.repository.ParticipantRepository;
import com.sww.ddorangddorang.domain.user.entity.User;
import com.sww.ddorangddorang.domain.user.exception.UserNotFoundException;
import com.sww.ddorangddorang.domain.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Transactional
@Service
@RequiredArgsConstructor
public class MissionPerformServiceImpl implements MissionPerformService {

    private final MissionPerformRepository missionPerformRepository;
    private final UserRepository userRepository;
    private final ParticipantRepository participantRepository;

    public List<MissionPerformsInfoRes> findMissionByUser(AuthenticatedUser authenticatedUser) {
        String email = authenticatedUser.getEmail();
        log.info("email: {}", email);
        User user = userRepository.findByEmail(email).orElseThrow(UserNotFoundException::new);
        Participant participant = participantRepository.findByUserAndGameCount(user,
            user.getGameCount()).orElseThrow(ParticipantNotFoundException::new);
        log.info("user: {}", user);
        List<MissionPerform> missionPerforms = missionPerformRepository.findAllByPlayer(
            participant);
        log.info("missionPerforms: {}", missionPerforms);

        return MissionPerformsInfoRes.listOf(missionPerforms);
    }

    public void missionComplete(MissionCompleteReq missionCompleteReq,
        AuthenticatedUser authenticatedUser) {
        String email = authenticatedUser.getEmail();
        User user = userRepository.findByEmail(email).orElseThrow(UserNotFoundException::new);

        MissionPerform missionPerform = missionPerformRepository.findById(
            missionCompleteReq.getMissionId()).orElseThrow(
            MissionNotFoundException::new);

        if (missionPerform.getPlayer().getUser().equals(user)) {
            missionPerform.missionComplete();
        } else {
            throw new MissionNotFoundException();
        }
    }

    // 내가 수행중인 특정 미션의 상세 정보를 조회하는 메서드, 필요 없지 않나?
    // 내가 수행중인 특정 미션에 대한 수행 결과를 계산하는 메서드, 미션 합의가 되어야 하지 않나?

}
