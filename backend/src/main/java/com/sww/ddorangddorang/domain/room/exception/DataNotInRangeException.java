package com.sww.ddorangddorang.domain.room.exception;

import com.sww.ddorangddorang.global.common.BaseException;
import com.sww.ddorangddorang.global.common.ErrorCode;

public class DataNotInRangeException extends BaseException {

    public DataNotInRangeException() {
        super(ErrorCode.DATA_NOT_IN_RANGE);
    }
}
