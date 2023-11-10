package com.sww.ddorangddorang.global.common.exception;

import com.sww.ddorangddorang.global.common.BaseException;
import com.sww.ddorangddorang.global.common.ErrorCode;

public class NoDataException extends BaseException {

    public NoDataException() {
        super(ErrorCode.NO_DATA_ERROR);
    }
}
