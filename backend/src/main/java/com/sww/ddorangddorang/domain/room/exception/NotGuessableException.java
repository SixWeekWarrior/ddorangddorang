package com.sww.ddorangddorang.domain.room.exception;

import com.sww.ddorangddorang.global.common.BaseException;
import com.sww.ddorangddorang.global.common.ErrorCode;

public class NotGuessableException extends BaseException {

    public NotGuessableException() {
        super(ErrorCode.ROOM_GUESS_NOT_GUESSABLE);
    }
}
