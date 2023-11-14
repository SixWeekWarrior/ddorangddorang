package com.sww.ddorangddorang.domain.guess.exception;

import com.sww.ddorangddorang.global.common.BaseException;
import com.sww.ddorangddorang.global.common.ErrorCode;

public class NotInSameGameException extends BaseException {

    public NotInSameGameException() {
        super(ErrorCode.NOT_IN_SAME_GAME);
    }
}
