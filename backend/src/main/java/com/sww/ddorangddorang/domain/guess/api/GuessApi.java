package com.sww.ddorangddorang.domain.guess.api;

import com.sww.ddorangddorang.domain.guess.entity.Guess;
import com.sww.ddorangddorang.domain.guess.guess.service.GuessService;
import com.sww.ddorangddorang.global.common.CommonResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
@RequestMapping("/api/v1/guess")
public class GuessApi {
    private GuessService guessService;
    private final static String SUCCESS = "Success";
    @GetMapping
    public CommonResponse<> getGuessInfo(@RequestHeader Long userId) {
        log.info("GuessApi_getGuessInfo start");
        log.info("GuessApi_getGuessInfo end: ");
        return CommonResponse.success(guessService.getGuessInfo(userId));
    }

    @PutMapping
    public CommonResponse<String> updateGuessInfo(@RequestHeader Long userId,
        @RequestBody Long guessedUserId) {
        log.info("GuessApi_guessManito start");
        Boolean isCorrect = guessService.guessManito(userId, guessedUserId);
        log.info("GuessApi_guessManito end: " + isCorrect);
        return CommonResponse.success(SUCCESS);
    }
}
