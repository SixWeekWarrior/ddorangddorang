package com.sww.ddorangddorang.domain.room.exception;

import com.sww.ddorangddorang.global.common.BaseException;
import com.sww.ddorangddorang.global.common.ErrorCode;

public class NoParticipatingRoomException extends BaseException {

    public NoParticipatingRoomException() {
        super(ErrorCode.NO_PARTICIPATING_ROOM);
    }
}
