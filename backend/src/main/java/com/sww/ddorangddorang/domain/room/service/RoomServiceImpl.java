package com.sww.ddorangddorang.domain.room.service;

import com.sww.ddorangddorang.domain.participant.entity.Participant;
import com.sww.ddorangddorang.domain.participant.repository.ParticipantRepository;
import com.sww.ddorangddorang.domain.room.dto.RoomInfoReq;
import com.sww.ddorangddorang.domain.room.entity.Room;
import com.sww.ddorangddorang.domain.room.repository.RoomRepository;
import com.sww.ddorangddorang.domain.user.entity.User;
import com.sww.ddorangddorang.domain.user.repository.UserRepository;
import com.sww.ddorangddorang.global.util.RedisUtil;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Transactional
@RequiredArgsConstructor
@Slf4j
@Service
public class RoomServiceImpl implements RoomService {

    private final UserRepository userRepository;
    private final RoomRepository roomRepository;
    private final ParticipantRepository participantRepository;
    private final RedisUtil redisUtil;

    public Integer createRoom(Long userId, RoomInfoReq roomInfoReq) {
        //사용자가 현재 참여중인 방이 있는지
        //선택하지 않은 옵션
        //정상
        log.info("RoomServiceImpl_createRoom start");
        User user = null;

        try {
            user = userRepository.getReferenceById(1L);
        } catch (Exception e) {
            e.printStackTrace();
        }

        if (user.getStatus() != 1L) {
            return -1;
        }

        if (roomInfoReq.getMinMember() < 1
            || roomInfoReq.getMinMember() > roomInfoReq.getMaxMember()) {
            return -1;
        }

        Integer accessCode = generateAccessCode();
        log.info("accessCode = " + accessCode);

        //TODO: User에서 상태를 변경하는 함수 필요
        //user.updateStatus(2L);
        Room room = Room.builder()
            .admin(user)
            .accessCode(accessCode)
            .minMember(roomInfoReq.getMinMember())
            .maxMember(roomInfoReq.getMaxMember())
            .duration(roomInfoReq.getDuration())
            .build();

        roomRepository.save(room);

        Participant participant = Participant.builder()
            .room(room)
            .user(user)
            .build();

        participantRepository.save(participant);

        log.info("RoomServiceImpl_createRoom end: " + room.getAccessCode());
        return room.getAccessCode();
    }

    private Integer generateAccessCode() {
        Integer accessCode = redisUtil.getAccessCode();

        if (accessCode == -1) {
            Boolean[] accessCodeStatusList = new Boolean[10000];
            List<Room> roomList = roomRepository.findAllByStartedAtAndDeletedAt(null, null);

            for (Room room : roomList) {
                accessCodeStatusList[room.getAccessCode()] = true;
            }

            accessCode = redisUtil.initAccessCode(accessCodeStatusList);
        }

        return accessCode;
    }

    public Boolean joinRoom(Long userId, Integer accessCode) {
        log.info("RoomServiceImpl_joinRoom start: " + userId + " " + accessCode);

        User user = null;

        try {
            user = userRepository.getReferenceById(1L);
        } catch (EntityNotFoundException e) {
            e.printStackTrace();
        }

        //TODO: 참여 중인 방이 이미 있는데 새로운 방에 참가하는 건 안 됨 -> 거절 신호 필요
        if (user.getStatus() != 1L) {
            return false;
        }

        Room room = null;

        try {
            room = roomRepository.findByAccessCodeAndStartedAtAndDeletedAt(accessCode, null,
                null);
        } catch (EntityNotFoundException e) {
            e.printStackTrace();
        }

        if (room.getHeadCount() >= room.getMaxMember()) {
            return false;
        }

        room.joinMember();

//        TODO: User에서 상태를 변경하는 함수 필요
//        user.updateStatus(3L);
        Participant participant = Participant.builder()
            .room(room)
            .user(user)
            .build();

        participantRepository.save(participant);

        if (room.getHeadCount() == room.getMaxMember()) {
            startGame(room);
        }

        log.info("RoomServiceImpl_joinRoom done");
        return true;
    }

    public void startGame(Room room) {
        List<Participant> participantList = participantRepository.findAllByRoomAndIsWithdrawalAndDeletedAt(
            room, false, null);

        Map<Integer, Participant> indexToParticipant = new HashMap<>();
        Map<Participant, Integer> participantToIndex = new HashMap<>();
        Integer count = 0;
        Integer matched = 0;

        for(Participant participant: participantList) {
//            participant.getUser().updateStatus(4L);
        }
        //참여자 섞는 로직?
        room.startGame();
    }

    public Boolean deleteGame(Long userId) {
        User admin = null;

        try {
            admin = userRepository.getReferenceById(1L);
        } catch (EntityNotFoundException e) {
            e.printStackTrace();
        }

        if (admin.getStatus() != 2L) {
            return false;
        }

        Room room = null;
        try {
            room = roomRepository.findByAdminAndStartedAtAndDeletedAt(admin, null, null);
        } catch (EntityNotFoundException e) {
            e.printStackTrace();
        }

        List<User> userList = userRepository.findAllByRoom(room);

        for (User user : userList) {
//            user.updateStatus(1L);
//            user.updateRoom(null);
        }

        room.deleteRoom();

        return true;
    }
}
