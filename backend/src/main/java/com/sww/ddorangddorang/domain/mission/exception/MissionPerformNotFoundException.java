package com.sww.ddorangddorang.domain.mission.exception;

import com.sww.ddorangddorang.global.common.BaseException;
import com.sww.ddorangddorang.global.common.ErrorCode;

public class MissionPerformNotFoundException extends BaseException {

    public MissionPerformNotFoundException() {
        super(ErrorCode.MISSION_PERFORM_NOT_FOUND);
    }

}
