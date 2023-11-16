package com.sww.ddorangddorang.domain.room.service;

import com.sww.ddorangddorang.domain.room.dto.WaitingListRes;
import com.sww.ddorangddorang.domain.room.exception.RoomNotFoundException;
import com.sww.ddorangddorang.domain.room.repository.EmitterRepository;
import com.sww.ddorangddorang.domain.room.repository.RoomRepository;
import com.sww.ddorangddorang.domain.user.entity.User;
import com.sww.ddorangddorang.domain.user.exception.UserNotFoundException;
import com.sww.ddorangddorang.domain.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import java.io.IOException;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Slf4j
@RequiredArgsConstructor
@Service
public class RoomNotificationServiceImpl implements RoomNotificationService {

    // SSE 연결 지속 시간 설정
    private static final Long DEFAULT_TIMEOUT = 60L * 1000 * 60;
    private final EmitterRepository emitterRepository;
    private final RoomRepository roomRepository;
    private final UserRepository userRepository;

    /**
     * 클라이언트가 알림을 구독하는 API 서비스
     *
     * @param id : 유저 PK
     * @return sseEmitter 객체
     */
    @Override
    public SseEmitter subscribe(Long id) {

        log.info("RoomNotificationService_start: id - {}", id);
        // emitterId 생성
        String emitterId = includeTimeToEmitterId(Long.toString(id));
        // SseEmitter 객체 생성
        SseEmitter sseEmitter = emitterRepository.saveEmitter(emitterId,
            new SseEmitter(DEFAULT_TIMEOUT));

        // emitter가 완료되면 emitter 삭제
        sseEmitter.onCompletion(() -> emitterRepository.delete(emitterId));
        // emitter가 타임아웃되면 emitter 삭제
        sseEmitter.onTimeout(() -> emitterRepository.delete(emitterId));

        // 연결 생성 초기에 503 에러 방지하기 위한 더미 이벤트 데이터를 클라이언트에 전송
        String eventID = includeTimeToEmitterId(Long.toString(id));
//        sendNotification(sseEmitter, eventID, emitterId, NotificationRes.builder()
//            .title("EventStream Created.")
//            .content("EventStream Created.")
//            .build());
        sendNotification(sseEmitter, eventID, emitterId, "Subscirbe notification");
        log.info("RoomNotificationService_end");
        return sseEmitter;
    }

    @Transactional
    @Override
    public void notifyJoin(Integer accessCode, Long id) {
        Long adminId = roomRepository.findByAccessCodeAndStartedAtIsNullAndDeletedAtIsNull(accessCode).orElseThrow(
            RoomNotFoundException::new).getAdmin().getId();

        User newUser = userRepository.findById(id).orElseThrow(UserNotFoundException::new);

        send(adminId, newUser);
    }

    /**
     * SseEmitter 객체를 사용하여 SSE를 클라이언트에게 전송
     *
     * @param sseEmitter : SseEmitter 객체
     * @param eventId    : event Id
     * @param emitterId  : emitter의 id
     * @param data       : data
     */
    @Override
    public void sendNotification(SseEmitter sseEmitter, String eventId, String emitterId,
        Object data) {
        try {
            sseEmitter.send(SseEmitter.event()
                .id(eventId)
                .name("message")
                .data(data));
            log.info("sse send: {}, {}, {}", eventId, "message", data);
        } catch (IOException ioException) {
            emitterRepository.delete(emitterId);
        }
    }

    /**
     * 알림을 생성한 후 지정된 클라이언트에게 알림 전송
     *
     */
    @Override
    public void send(Long userId, User newUser) {

        log.info("RoomNotificationService_send_start: userId - {}, newUser - {}", userId, newUser);

        WaitingListRes waitingListRes = WaitingListRes.of(newUser);

        String eventId = userId + "_" + System.currentTimeMillis();
        Map<String, SseEmitter> emitters = emitterRepository.findAllEmitter(Long.toString(userId));
        emitters.forEach(
            (key, emitter) -> {
                emitterRepository.saveEventCache(key, waitingListRes);
                sendNotification(emitter, eventId, key, waitingListRes);
            }
        );

        log.info("RoomNotificationService_send_end: success");
    }



    /**
     * SseEmitter를 식별하는 emitterId를 생성하기 위한 함수. userId에 emitter 생성 시간 붙여서 생성 시간 붙이는 이유 : 데이터가 유실 될
     * 경우, 그 시점을 파악하기 용이, 데이터가 언제 보내졌는지도 알 수 있다
     *
     * @param userId : 유저 PK를 시간을 붙여서 스트링으로 변환
     * @return emitterID : SseEmitter 식별
     */
    @Override
    public String includeTimeToEmitterId(String userId) {
        return userId + "_" + System.currentTimeMillis();
    }
}
