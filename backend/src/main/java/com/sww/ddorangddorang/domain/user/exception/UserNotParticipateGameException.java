package com.sww.ddorangddorang.domain.user.exception;

import com.sww.ddorangddorang.global.common.BaseException;
import com.sww.ddorangddorang.global.common.ErrorCode;

public class UserNotParticipateGameException extends BaseException {

    public UserNotParticipateGameException() {
        super(ErrorCode.USER_NOT_PARTICIPATE_GAME);
    }

}
