package com.sww.ddorangddorang.domain.room.exception;

import com.sww.ddorangddorang.global.common.BaseException;
import com.sww.ddorangddorang.global.common.ErrorCode;

public class OnlyWaitingStateAllowedException extends BaseException {

    public OnlyWaitingStateAllowedException() {
        super(ErrorCode.ONLY_WAITING_STATE_ALLOWED);
    }
}
