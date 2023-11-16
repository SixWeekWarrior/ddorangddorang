package com.sww.ddorangddorang.domain.guess.api;

import com.sww.ddorangddorang.auth.dto.AuthenticatedUser;
import com.sww.ddorangddorang.domain.guess.dto.GuessManitoReq;
import com.sww.ddorangddorang.domain.guess.dto.GuessStatus;
import com.sww.ddorangddorang.domain.guess.dto.Profile;
import com.sww.ddorangddorang.domain.guess.service.GuessService;
import com.sww.ddorangddorang.global.common.CommonResponse;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
    public CommonResponse<Profile> guessManito(
        @AuthenticationPrincipal AuthenticatedUser authenticatedUser, @RequestBody GuessManitoReq guessManitoReq) {
        log.info("GuessApi_guessManito start");
        Profile profile = guessService.guessManito(authenticatedUser.getId(),
            guessManitoReq.getManitoId());
        log.info("GuessApi_guessManito end");
        return CommonResponse.success(profile);
    }

    @GetMapping
    public CommonResponse<GuessStatus> myGuessStatus(
        @AuthenticationPrincipal AuthenticatedUser authenticatedUser) {
        log.info("GuessApi_myGuessStatus start");
        GuessStatus guessStatus = guessService.getMyGuessStatus(authenticatedUser.getId());
        log.info("GuessApi_myGuessStatus end");
        return CommonResponse.success(guessStatus);
    }

    @GetMapping("/all")
    public CommonResponse<List<GuessStatus>> allGuessStatus(
        @AuthenticationPrincipal AuthenticatedUser authenticatedUser) {
        log.info("GuessApi_allGuessStatus start");
        List<GuessStatus> guessStatusList = guessService.getAllGuessStatus(authenticatedUser.getId());
        log.info("GuessApi_allGuessStatus end");
        return CommonResponse.success(guessStatusList);
    }
}
