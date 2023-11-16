package com.sww.ddorangddorang.domain.room.exception;

import com.sww.ddorangddorang.global.common.BaseException;
import com.sww.ddorangddorang.global.common.ErrorCode;

public class PlayersNotEnoughException extends BaseException {

    public PlayersNotEnoughException() {
        super(ErrorCode.PLAYERS_NOT_ENOUGH);
    }
}
