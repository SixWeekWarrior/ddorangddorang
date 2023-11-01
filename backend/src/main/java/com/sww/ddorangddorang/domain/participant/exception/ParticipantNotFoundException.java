package com.sww.ddorangddorang.domain.participant.exception;

import com.sww.ddorangddorang.global.common.BaseException;
import com.sww.ddorangddorang.global.common.ErrorCode;

public class ParticipantNotFoundException extends BaseException {

    public ParticipantNotFoundException() {
        super(ErrorCode.PARTICIPANT_NOT_FOUND);
    }
}
