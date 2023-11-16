package com.sww.ddorangddorang.global.common.exception;

import com.sww.ddorangddorang.domain.user.entity.User;
import com.sww.ddorangddorang.global.common.BaseException;
import com.sww.ddorangddorang.global.common.ErrorCode;

public class UnexpectedException extends BaseException {

    public UnexpectedException() {
        super(ErrorCode.UNEXPECTED_ERROR);
    }
}
