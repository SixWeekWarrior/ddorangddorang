package com.sww.ddorangddorang.domain.room.exception;

import com.sww.ddorangddorang.global.common.BaseException;
import com.sww.ddorangddorang.global.common.ErrorCode;

public class OnlyAdminAllowedException extends BaseException {

    public OnlyAdminAllowedException() {
        super(ErrorCode.ONLY_ADMIN_ALLOWED);
    }
}
