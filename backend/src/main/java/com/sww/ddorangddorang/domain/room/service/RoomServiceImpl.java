package com.sww.ddorangddorang.domain.room.service;

import com.sww.ddorangddorang.domain.room.dto.RoomInfoReq;
import com.sww.ddorangddorang.domain.room.entity.Room;
import com.sww.ddorangddorang.domain.room.repository.RoomRepository;
import com.sww.ddorangddorang.domain.user.entity.User;
import com.sww.ddorangddorang.domain.user.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
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

    public Integer createRoom(Integer userId, RoomInfoReq roomInfoReq) {
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

        //TODO: User에서 상태를 변경하는 함수 필요
        //user.updateStatus(2L);
        Room room = Room.builder()
            .admin(user)
            .accessCode(generateAccessCode())
            .minMember(roomInfoReq.getMinMember())
            .maxMember(roomInfoReq.getMaxMember())
            .duration(roomInfoReq.getDuration())
            .build();

        roomRepository.save(room);
        log.info("RoomServiceImpl_createRoom end: " + room.getAccessCode());
        return room.getAccessCode();
    }

    //TODO: Redis에 접근해야 함, 우선 1111로 반환
    private Integer generateAccessCode() {
        return 1111;
    }

    public void joinRoom(Integer userId, Integer accessCode) {
        log.info("RoomServiceImpl_joinRoom start: " + userId + " " + accessCode);

        User user = null;

        try {
            user = userRepository.getReferenceById(1L);
        } catch (Exception e) {
            e.printStackTrace();
        }

        //TODO: 참여 중인 방이 이미 있는데 새로운 방에 참가하는 건 안 됨 -> 거절 신호 필요
        if (user.getStatus() != 1L) {
            return;
        }

        Room room = null;

        try {
            room = roomRepository.findRoomByAccessCodeAndStartedAtAndDeletedAt(accessCode,null,null);
        } catch (EntityNotFoundException e) {
            e.printStackTrace();
        }

        room.joinMember();

    }
}
