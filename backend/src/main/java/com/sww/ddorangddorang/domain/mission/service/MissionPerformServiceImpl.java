package com.sww.ddorangddorang.domain.mission.service;

import com.sww.ddorangddorang.auth.dto.CustomOAuth2User;
import com.sww.ddorangddorang.domain.mission.dto.MissionChangeReq;
import com.sww.ddorangddorang.domain.mission.dto.MissionCompleteReq;
import com.sww.ddorangddorang.domain.mission.dto.MissionPerformsInfoRes;
import com.sww.ddorangddorang.domain.mission.entity.Mission;
import com.sww.ddorangddorang.domain.mission.entity.MissionPerform;
import com.sww.ddorangddorang.domain.mission.exception.MissionNoMoreException;
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

    private static final int MAX_MISSION_CHANGE_COUNT = 2;
    private static final int HOURS_DIFFERENCE = 15;

    private final MissionRepository missionRepository;
    private final MissionPerformRepository missionPerformRepository;
    private final UserRepository userRepository;
    private final ParticipantRepository participantRepository;
    private final RoomRepository roomRepository;

    // 매일 아침 9시 새로운 미션을 할당하는 메소드
    @Scheduled(cron = "0 0 9 * * *")
    public void changeMissionAt9Am() {
        log.info("Allocating new missions at 9 AM.");

        // startedAt이 현재 시간과 15시간 이상 차이나면서, deletedAt이 null인 방을 찾음
        List<Room> rooms = findEligibleRooms();

        // 현재 가지고 있는 모든 미션을 조회함
        List<Mission> missions = fetchAllMissions();

        // 모든 활성화 된 게임의 참가자들에게 새로운 미션을 할당함
        List<MissionPerform> missionPerformList = allocateNewMissions(rooms, missions);
        missionPerformRepository.saveAll(missionPerformList);
    }

    // 원하지 않는 미션을 변경하는 메서드
    public void changeMission(MissionChangeReq missionChangeReq, CustomOAuth2User customOAuth2User) {
        String email = customOAuth2User.getEmail();
        User user = findUserByEmail(email);

        // 유저가 참가한 방에서 현재 게임이 진행중인지 판단함
        validateRoom(user);

        // 유저가 바꾸고자 하는 미션 객체를 찾음
        MissionPerform missionPerform = findMissionPerform
            (missionChangeReq.getMissionPerformId());

        // 해당 유저의 미션인지, 이미 완료된 미션은 아닌지 판단함
        validateMissionPerform(missionPerform, user);

        // 유저로부터 참가자 객체를 얻음
        Participant participant = findParticipant(user, user.getGameCount());

        // 최대 미션 변경 횟수를 넘었으면 예외 처리
        validateMissionChangeCount(participant);

        // 다른 미션을 할당받음
        reassignMission(participant);
    }

    private List<MissionPerform> allocateNewMissions(List<Room> rooms, List<Mission> missions) {
        List<MissionPerform> missionPerformList = new ArrayList<>();
        Set<Long> allMissions = createMissionIdSet(missions.size());

        for (Room room : rooms) {
            List<Participant> participants = room.getParticipants();
            for (Participant participant : participants) {
                MissionPerform missionPerform = assignMission(participant, allMissions, missions);
                missionPerformList.add(missionPerform);
            }
        }

        return missionPerformList;
    }

    private Set<Long> createMissionIdSet(long missionCount) {
        return LongStream.rangeClosed(1, missionCount)
            .boxed()
            .collect(Collectors.toSet());
    }

    private List<Room> findEligibleRooms() {
        return roomRepository.findByStartedAtBeforeAndDeletedAtIsNull(
            LocalDateTime.now().minusHours(HOURS_DIFFERENCE));
    }

    private List<Mission> fetchAllMissions() {
        return missionRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
    }

    private MissionPerform assignMission(Participant participant, Set<Long> allMissions, List<Mission> missions) {
        // 참가자가 수행한 미션들을 가져옴
        List<MissionPerform> missionPerforms = participant.getMissionPerforms();

        // 참가자가 수행한 미션들의 id를 Set로 저장함.
        Set<Long> performedMissions = missionPerforms.stream()
            .map(MissionPerform::getMission)
            .map(Mission::getId)
            .collect(Collectors.toSet());

        // 모든 미션 id와 수행한 미션의 id의 차집합을 계산하고, 랜덤으로 하나의 미션 id를 받아옴.
        Long newMissionId = randomNumber(allMissions, performedMissions);

        // 해당 미션 id를 할당해 새로운 미션 할당 객체를 생성하고 반환함.
        return MissionPerform.builder()
            .mission(missions.get(newMissionId.intValue() - 1))
            .player(participant)
            .build();
    }

    // 두 Set의 차집합을 구하고, 랜덤한 원소를 반환함.
    private Long randomNumber(Set<Long> allMissions, Set<Long> performedMissions) {
        Set<Long> remainedMission = new HashSet<>(allMissions);
        remainedMission.removeAll(performedMissions);
        List<Long> remainedMissionList = new ArrayList<>(remainedMission);

        if (remainedMissionList.isEmpty()) {
            throw new MissionNoMoreException();
        }

        return remainedMissionList.get((int) (Math.random() * remainedMissionList
            .size()));
    }
    private void reassignMission(Participant participant) {
        List<Mission> missions = fetchAllMissions();
        Set<Long> allMissions = createMissionIdSet(missions.size());
        MissionPerform newMissionPerform = assignMission(participant, allMissions, missions);
        missionPerformRepository.save(newMissionPerform);
    }

    private void validateMissionChangeCount(Participant participant) {
        if (participant.getChange() >= MAX_MISSION_CHANGE_COUNT) {
            throw new MissionNotFoundException();
        }
    }

    private Participant findParticipant(User user, int gameCount) {
        return participantRepository.findByUserAndGameCount(user, gameCount)
            .orElseThrow(ParticipantNotFoundException::new);
    }

    private void validateMissionPerform(MissionPerform missionPerform, User user) {
        if (!missionPerform.getPlayer().getUser().equals(user)
            || missionPerform.getPerformedAt() != null) {
            throw new MissionNotFoundException();
        }
    }

    private MissionPerform findMissionPerform(Long missionPerformId) {
        return missionPerformRepository.findById(missionPerformId)
            .orElseThrow(MissionNotFoundException::new);
    }

    private void validateRoom(User user) {
        Room room = user.getRoom();

        if (room.getStartedAt() == null || room.getDeletedAt() != null) {
            throw new MissionNotFoundException();
        }
    }

    private User findUserByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(UserNotFoundException::new);
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
