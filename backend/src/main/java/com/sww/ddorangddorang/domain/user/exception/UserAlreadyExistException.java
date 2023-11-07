package com.sww.ddorangddorang.domain.user.exception;

import com.sww.ddorangddorang.domain.user.entity.User;
import com.sww.ddorangddorang.global.common.BaseException;
import com.sww.ddorangddorang.global.common.ErrorCode;

public class UserAlreadyExistException extends BaseException {

    public UserAlreadyExistException() {
        super(ErrorCode.USER_ALREADY_EXIST);
    }

    public UserAlreadyExistException(User user) { super("Duplicated Sign up with " + user.getEmail() + " in " + user.getProviderType(), ErrorCode.USER_ALREADY_EXIST); }
}
