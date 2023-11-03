package com.sww.ddorangddorang.domain.note.exception;

import com.sww.ddorangddorang.global.common.BaseException;
import com.sww.ddorangddorang.global.common.ErrorCode;

public class NoteAccessDeniedError extends BaseException {

    public NoteAccessDeniedError() {
        super(ErrorCode.NOTE_ACCESS_DENIED);
    }

}
