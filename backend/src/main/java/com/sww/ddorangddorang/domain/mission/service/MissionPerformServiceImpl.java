package com.sww.ddorangddorang.domain.mission.service;

import com.sww.ddorangddorang.auth.dto.CustomOAuth2User;
import com.sww.ddorangddorang.domain.mission.dto.MissionCompleteReq;
import com.sww.ddorangddorang.domain.mission.dto.MissionPerformsInfoRes;
import com.sww.ddorangddorang.domain.mission.entity.Mission;
import com.sww.ddorangddorang.domain.mission.entity.MissionPerform;
import com.sww.ddorangddorang.domain.mission.exception.MissionNotFoundException;
import com.sww.ddorangddorang.domain.mission.repository.MissionPerformRepository;
import com.sww.ddorangddorang.domain.mission.repository.MissionRepository;
import com.sww.ddorangddorang.domain.participant.entity.Participant;
import com.sww.ddorangddorang.domain.participant.exception.ParticipantNotFoundException;
import com.sww.ddorangddorang.domain.participant.repository.ParticipantRepository;
import com.sww.ddorangddorang.domain.room.entity.Room;
import com.sww.ddorangddorang.domain.room.repository.RoomRepository;
import com.sww.ddorangddorang.domain.user.entity.User;
import com.sww.ddorangddorang.domain.user.exception.UserNotFoundException;
import com.sww.ddorangddorang.domain.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.LongStream;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Slf4j
@Transactional
@Service
@RequiredArgsConstructor
public class MissionPerformServiceImpl implements MissionPerformService {

    private final MissionRepository missionRepository;
    private final MissionPerformRepository missionPerformRepository;
    private final UserRepository userRepository;
    private final ParticipantRepository participantRepository;
    private final RoomRepository roomRepository;

    // 매일 아침 9시 새로운 미션을 할당하는 메소드
    @Scheduled(cron = "0 0 9 * * *")
    public void changeMissionAt9Am() {
        log.info("changeMissionAt9Am()");

        // startedAt이 현재 시간과 15시간 이상 차이나면서, deletedAt이 null인 방을 찾는다
        List<Room> rooms = roomRepository.findByStartedAtBeforeAndDeletedAtIsNull(
            LocalDateTime.now().minusHours(15));

        List<Mission> missions = missionRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
        long missionCount = missions.size();

        // 저장시 일괄 처리를 진행하기 위한 리스트
        List<MissionPerform> missionPerformList = new ArrayList<>();

        // 전체 미션 번호를 가지고 있는 Set를 선언함.
        Set<Long> allMissions = LongStream.rangeClosed(1, missionCount)
            .boxed()
            .collect(Collectors.toSet());

        // 해당 방에 참가하고 있는 모든 Participant를 찾음.
        for (Room room : rooms) {
            List<Participant> participants = room.getParticipants();

            // 해당 Participant들에 대해 새로운 미션을 할당한다.
            // 해당 Participant가 이미 수행했거나, 이전에 거부했던 미션은 할당되지 않는다.
            for (Participant participant : participants) {
                List<MissionPerform> missionPerforms = participant.getMissionPerforms();

                // 특정 유저가 수행했던 미션들의 Set을 선언함.
                Set<Long> performedMissions = missionPerforms.stream()
                    .map(MissionPerform::getMission)
                    .map(Mission::getId)
                    .collect(Collectors.toSet());

                // Set끼리의 차집합에서 임의의 Mission Id를 반환받음.
                Long newMissionId = randomNumber(allMissions, performedMissions);

                // 미션을 수행시킴.
                MissionPerform missionPerform = MissionPerform.builder()
                    .mission(missions.get(newMissionId.intValue() - 1))
                    .player(participant)
                    .build();

                missionPerformList.add(missionPerform);
            }
        }

        missionPerformRepository.saveAll(missionPerformList);
    }

    // 두 Set의 차집합을 구하고, 랜덤한 원소를 반환함.
    private Long randomNumber(Set<Long> allMissions, Set<Long> performedMissions) {
        Set<Long> remainedMission = new HashSet<>(allMissions);
        remainedMission.removeAll(performedMissions);
        List<Long> remainedMissionList = new ArrayList<>(remainedMission);

        if (remainedMissionList.isEmpty()) {
            throw new RuntimeException("모든 미션을 수행했습니다.");
        }

        return remainedMissionList.get((int) (Math.random() * remainedMissionList
            .size()));
    }


    public List<MissionPerformsInfoRes> findMissionByUser(CustomOAuth2User customOAuth2User) {
        String email = customOAuth2User.getEmail();
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
        CustomOAuth2User customOAuth2User) {
        String email = customOAuth2User.getEmail();
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
