package com.sww.ddorangddorang.domain.room.exception;

import com.sww.ddorangddorang.global.common.BaseException;
import com.sww.ddorangddorang.global.common.ErrorCode;

public class AlreadyParticipatingRoomException extends BaseException {

    public AlreadyParticipatingRoomException() {
        super(ErrorCode.ALREADY_PARTICIPATING_ROOM);
    }
}
