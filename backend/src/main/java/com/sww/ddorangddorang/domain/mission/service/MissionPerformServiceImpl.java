package com.sww.ddorangddorang.domain.mission.service;

import com.sww.ddorangddorang.domain.mission.dto.MissionChangeReq;
import com.sww.ddorangddorang.domain.mission.dto.MissionCompleteReq;
import com.sww.ddorangddorang.domain.mission.dto.MissionPerformAndDayCountRes;
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
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
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
    // 기존의 완료되지 않은 미션은 완료하지 못함 처리를 진행해야 함
    @Scheduled(cron = "0 0 9 * * *")
    public void changeMissionAt9Am() {
        log.info("Allocating new missions at 9 AM.");

        // startedAt이 현재 시간과 15시간 이상 차이나면서, deletedAt이 null인 방을 찾음
        List<Room> rooms = findEligibleRooms();

        // 현재 가지고 있는 모든 미션을 조회함
        List<Long> missionIdList = fetchMissionIds();

        // 모든 활성화 된 게임의 참가자들에게 새로운 미션을 할당함
        List<MissionPerform> missionPerformList = allocateNewMissions(rooms, missionIdList);
        missionPerformRepository.saveAll(missionPerformList);
    }

    public void startGameAndAssignMission(Room room) {
        List<Long> missionIdList = fetchMissionIds();
        List<Participant> participants = room.getParticipants();
        List<MissionPerform> missionPerformList = new ArrayList<>();

        for (Participant participant : participants) {
            if (participant.getDeletedAt() != null) {
                continue;
            }
            MissionPerform missionPerform = assignMission(participant, missionIdList);
            missionPerformList.add(missionPerform);
        }

        missionPerformRepository.saveAll(missionPerformList);
    }

    public void testAssignMission(Long roomId) {
        Room room = roomRepository.findById(roomId).orElseThrow();
        startGameAndAssignMission(room);
    }

    // 원하지 않는 미션을 변경하는 메서드
    public void changeMission(MissionChangeReq missionChangeReq,
        Long userId) {
        log.info("id: {}", userId);
        User user = findUserById(userId);

        // 유저가 참가한 방에서 현재 게임이 진행중인지 판단함
        validateRoom(user);
        MissionPerform missionPerform = findMissionPerform(missionChangeReq.getMissionPerformId());

        // 해당 유저의 미션인지, 이미 완료된 미션은 아닌지 판단함
        validateMissionPerform(missionPerform, user);
        Participant participant = findParticipant(user, user.getGameCount());

        // 최대 미션 변경 횟수 이내인지 판단
        validateMissionChangeCount(participant);

        reassignMission(participant);

        // 호출한 유저의 미션 변견 횟수를 1 증가 시킴
        participant.changeMission();
        missionPerform.missionChanged();
    }

    private List<MissionPerform> allocateNewMissions(List<Room> rooms, List<Long> missionIdList) {
        List<MissionPerform> missionPerformList = new ArrayList<>();

        for (Room room : rooms) {
            List<Participant> participants = room.getParticipants();
            for (Participant participant : participants) {
                MissionPerform missionPerform = assignMission(participant, missionIdList);
                missionPerformList.add(missionPerform);
            }
        }

        return missionPerformList;
    }

    private List<Room> findEligibleRooms() {
        return roomRepository.findByStartedAtBeforeAndDeletedAtIsNull(
            LocalDateTime.now().minusHours(HOURS_DIFFERENCE));
    }

    private List<Long> fetchMissionIds() {
        return missionRepository.findAll(Sort.by(Sort.Direction.ASC, "id")).stream()
            .map(Mission::getId).collect(Collectors.toList());
    }

    // assignMission이 9시 스케줄링에서도 불러와지고 개별 미션 변환에서도 불러와짐
    // 따라서 개별 미션 변환에서 최근 미션을 중복 조회하게 되는 문제가 발생하는데 음...
    // 일단 보류
    private MissionPerform assignMission(Participant participant, List<Long> missionIdList) {

        List<MissionPerform> missionPerforms = participant.getMissionPerforms();

        int missionCount = missionPerforms.size();

        if (missionCount > 0) {
            MissionPerform lastMissionPerfrom = missionPerforms.get(missionCount - 1);
            handleUncompletedMission(lastMissionPerfrom);
        }

        // 참가자가 수행한 미션들의 id를 Set로 저장함.
        Set<Long> performedMissions = missionPerforms.stream().map(MissionPerform::getMission)
            .map(Mission::getId).collect(Collectors.toSet());

        // 모든 미션 id와 수행한 미션의 id의 차집합을 계산하고, 랜덤으로 하나의 미션 id를 받아옴.
        Long newMissionId = randomNumber(missionIdList, performedMissions);

        Mission newMission = missionRepository.findById(newMissionId)
            .orElseThrow(MissionNotFoundException::new);

        // 해당 미션 id를 할당해 새로운 미션 할당 객체를 생성하고 반환함.
        return MissionPerform.builder().mission(newMission).player(participant).build();
    }

    private void handleUncompletedMission(MissionPerform missionPerform) {
        if (missionPerform.getPerformedAt() == null) {
            missionPerform.missionGiveup();
        }
    }

    // 두 Set의 차집합을 구하고, 랜덤한 원소를 반환함.
    private Long randomNumber(List<Long> missionIdList, Set<Long> performedMissions) {
        List<Long> remainedMissionList = new ArrayList<>();

        for (Long missionId : missionIdList) {
            if (!performedMissions.contains(missionId)) {
                remainedMissionList.add(missionId);
            }
        }

        if (remainedMissionList.isEmpty()) {
            throw new MissionNoMoreException();
        }

        return remainedMissionList.get((int) (Math.random() * remainedMissionList.size()));
    }

    private void reassignMission(Participant participant) {
        List<Long> missionIdList = fetchMissionIds();
        MissionPerform newMissionPerform = assignMission(participant, missionIdList);
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

    // 특정 방에서 게임이 진행중인지 판단
    private void validateRoom(User user) {
        Room room = user.getRoom();

        if (room.getStartedAt() == null || room.getDeletedAt() != null) {
            throw new MissionNotFoundException();
        }
    }

    private User findUserById(Long id) {
        return userRepository.findById(id).orElseThrow(UserNotFoundException::new);
    }


    // 특정 유저의 수행중인 미션을 조회하고, 시작부터 지난 날짜와 완료한 미션의 개수를 반환하는 메소드
    public MissionPerformAndDayCountRes findMissionByUser(Long userId) {
        log.info("id: {}", userId);
        User user = findUserById(userId);

        Room room = user.getRoom();
        log.info("room_id: {}", room.getId());

        Participant participant = participantRepository.findByUserAndGameCount(user,
            user.getGameCount()).orElseThrow(ParticipantNotFoundException::new);
        log.info("user: {}", user);

        List<MissionPerform> missionPerforms = missionPerformRepository.findAllByPlayerAndDeletedAtIsNull(
            participant);
        log.info("missionPerforms: {}", missionPerforms);

        long missionCompleteCount = missionPerforms.stream().filter(MissionPerform::isCompleted)
            .count();
        log.info("missionCompleteCount: {}", missionCompleteCount);

        long dayCount = ChronoUnit.DAYS.between(room.getStartedAt().plusHours(9L).toLocalDate(),
            LocalDateTime.now().plusHours(9L).toLocalDate()) + 1;
        log.info("dayCount: {}", dayCount);

        return MissionPerformAndDayCountRes.of(MissionPerformsInfoRes.listOf(missionPerforms),
            dayCount, missionCompleteCount);
    }

    // 유저의 미션 완료 요청이 왔을 때 수행되는 메소드
    public void missionComplete(MissionCompleteReq missionCompleteReq,
        Long userId) {
        log.info("id: {}", userId);
        User user = findUserById(userId);
        MissionPerform missionPerform = missionPerformRepository.findById(
            missionCompleteReq.getMissionId()).orElseThrow(MissionNotFoundException::new);

        if (missionPerform.getPlayer().getUser().equals(user)) {
            missionPerform.missionComplete();
        } else {
            throw new MissionNotFoundException();
        }
    }

}
