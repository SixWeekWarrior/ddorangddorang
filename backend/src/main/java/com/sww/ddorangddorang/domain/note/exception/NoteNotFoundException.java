package com.sww.ddorangddorang.domain.note.exception;

import com.sww.ddorangddorang.global.common.BaseException;
import com.sww.ddorangddorang.global.common.ErrorCode;

public class NoteNotFoundException extends BaseException {

    public NoteNotFoundException() {
        super(ErrorCode.NOTE_NOT_FOUND);
    }

}
