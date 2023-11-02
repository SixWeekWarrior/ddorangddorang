package com.sww.ddorangddorang.domain.mission.exception;

import com.sww.ddorangddorang.global.common.BaseException;
import com.sww.ddorangddorang.global.common.ErrorCode;

public class MissionNotFoundException extends BaseException {

    public MissionNotFoundException() {
        super(ErrorCode.MISSION_NOT_FOUND);
    }

}
