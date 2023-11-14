package com.sww.ddorangddorang.domain.guess.exception;

import com.sww.ddorangddorang.global.common.BaseException;
import com.sww.ddorangddorang.global.common.ErrorCode;

public class NotGuessableException extends BaseException {

    public NotGuessableException() {
        super(ErrorCode.NOT_GUESSABLE);
    }
}
