package com.sww.ddorangddorang.domain.room.api;

import com.sww.ddorangddorang.auth.dto.AuthenticatedUser;
import com.sww.ddorangddorang.domain.room.service.RoomNotificationService;
import com.sww.ddorangddorang.domain.room.service.RoomService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/rooms/notification")
public class RoomNotificationApi {

    private static final String SUCCESS = "success";

    private final RoomService roomService;
    private final RoomNotificationService roomNotificationService;

    /*
     * 클라이언트가 구독하기 위한 기능
     */
    @GetMapping(value = "/subscribe", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter subscribe(HttpServletResponse response, @AuthenticationPrincipal AuthenticatedUser authenticatedUser) {
        log.info("RoomNotificationApi_subscribe start with user_id {}", authenticatedUser.getId());

        SseEmitter sseEmitter = roomNotificationService.subscribe(authenticatedUser.getId());

        response.setHeader("X-Accel-Buffering", "no");
        log.info("RoomNotificationApi_subscribe_end: success");

        return sseEmitter;
    }
}
