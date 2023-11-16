package com.sww.ddorangddorang.domain.room.exception;

import com.sww.ddorangddorang.global.common.BaseException;
import com.sww.ddorangddorang.global.common.ErrorCode;

public class InvalidParameterValueException extends BaseException {

    public InvalidParameterValueException() {
        super(ErrorCode.INVALID_PARAMETER_VALUE);
    }
}
