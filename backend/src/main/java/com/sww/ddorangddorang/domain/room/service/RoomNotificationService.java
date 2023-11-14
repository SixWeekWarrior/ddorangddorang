package com.sww.ddorangddorang.domain.room.service;

import com.sww.ddorangddorang.domain.user.entity.User;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public interface RoomNotificationService {

    SseEmitter subscribe(Long id);

    void send(Long userId, User newUser);

    String includeTimeToEmitterId(String userId);

    void sendNotification(SseEmitter sseEmitter, String eventId, String emitterId,
        Object data);

    void notifyJoin(Integer accessCode, Long id);
}
