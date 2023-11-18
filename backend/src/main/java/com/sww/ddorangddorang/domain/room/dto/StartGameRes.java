package com.sww.ddorangddorang.domain.room.dto;

import com.sww.ddorangddorang.domain.room.entity.Room;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

@DynamicInsert
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class StartGameRes {
    Room room;
    Boolean result;

    @Builder
    public StartGameRes(Room room, Boolean result) {
        this.room = room;
        this.result = result;
    }
}
