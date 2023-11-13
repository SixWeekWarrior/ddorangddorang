package com.sww.ddorangddorang.domain.guess.api;

import com.sww.ddorangddorang.auth.dto.AuthenticatedUser;
import com.sww.ddorangddorang.domain.guess.dto.GuessUserPostRes;
import com.sww.ddorangddorang.domain.guess.entity.Guess;
import com.sww.ddorangddorang.domain.guess.service.GuessService;
import com.sww.ddorangddorang.global.common.CommonResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/guess")
public class GuessApi {

    private final GuessService guessService;
    private final static String SUCCESS = "SUCCESS";

    @PostMapping
    public CommonResponse<GuessUserPostRes> guessManito(
        @AuthenticationPrincipal AuthenticatedUser authenticatedUser, Long manitoId) {
        log.info("GuessApi_guessManito start");
        GuessUserPostRes guessUserPostRes = guessService.guessManito(authenticatedUser.getId(),
            manitoId);
        log.info("GuessApi_guessManito end");
        return CommonResponse.success(guessUserPostRes);
    }
}
