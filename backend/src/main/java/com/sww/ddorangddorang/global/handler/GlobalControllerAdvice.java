package com.sww.ddorangddorang.global.handler;

import com.sww.ddorangddorang.global.common.BaseException;
import com.sww.ddorangddorang.global.common.CommonResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * Exception Handler
 */
@Slf4j
@RestControllerAdvice
public class GlobalControllerAdvice {

    @ExceptionHandler(BaseException.class)
    public CommonResponse<?> onBaseException(BaseException e) {

        log.info("GlobalControllerAdvice_onBaseException: codeName = " + e.getErrorCode().name()
            + " codeMessage = " + e.getMessage());

        return CommonResponse.fail(e.getErrorCode().name(), e.getMessage());
    }
}
