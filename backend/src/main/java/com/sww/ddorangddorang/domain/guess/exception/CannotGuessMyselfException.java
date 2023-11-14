package com.sww.ddorangddorang.domain.guess.exception;

import com.sww.ddorangddorang.global.common.BaseException;
import com.sww.ddorangddorang.global.common.ErrorCode;

public class CannotGuessMyselfException extends BaseException {

    public CannotGuessMyselfException() {
        super(ErrorCode.CANNOT_GUESS_MYSELF);
    }
}
