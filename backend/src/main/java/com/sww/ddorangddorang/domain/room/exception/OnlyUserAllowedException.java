package com.sww.ddorangddorang.domain.room.exception;

import com.sww.ddorangddorang.global.common.BaseException;
import com.sww.ddorangddorang.global.common.ErrorCode;

public class OnlyUserAllowedException extends BaseException {

    public OnlyUserAllowedException() {
        super(ErrorCode.ONLY_USER_ALLOWED);
    }
}
