package com.sww.ddorangddorang.global.common.exception;

import com.sww.ddorangddorang.global.common.BaseException;
import com.sww.ddorangddorang.global.common.ErrorCode;

public class ImageUploadFailException extends BaseException {

    public ImageUploadFailException() {
        super(ErrorCode.IMAGE_UPLOAD_FAIL);
    }
}
