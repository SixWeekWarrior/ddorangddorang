package com.sww.ddorangddorang.domain.mission.exception;

import com.sww.ddorangddorang.global.common.BaseException;
import com.sww.ddorangddorang.global.common.ErrorCode;

public class MissionNoMoreException extends BaseException {

    public MissionNoMoreException() {
        super(ErrorCode.MISSION_NO_MORE);
    }

}
