package com.sww.ddorangddorang.domain.room.exception;

import com.sww.ddorangddorang.global.common.BaseException;
import com.sww.ddorangddorang.global.common.ErrorCode;

public class RoomAlreadyFullException extends BaseException {

    public RoomAlreadyFullException() {
        super(ErrorCode.ROOM_ALREADY_FULL);
    }
}
