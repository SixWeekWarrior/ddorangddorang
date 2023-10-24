package com.sww.ddorangddorang.domain.room.api;

import com.sww.ddorangddorang.domain.room.dto.RoomInfoReq;
import com.sww.ddorangddorang.domain.room.service.RoomService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/rooms")
public class RoomApi {
    private final RoomService roomService;

    @PostMapping("/")
    public String createRoom(@RequestBody RoomInfoReq roomInfoReq) {
        log.info("RoomApi_createRoom start");
        String accessCode = roomService.createRoom(roomInfoReq);
        log.info("RoomApi_createRoom end: " + accessCode);
        return accessCode;
    }


}
