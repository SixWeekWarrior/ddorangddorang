package com.sww.ddorangddorang.domain.opinion.api;

import com.sww.ddorangddorang.auth.dto.AuthenticatedUser;
import com.sww.ddorangddorang.domain.opinion.dto.OpinionCreateReq;
import com.sww.ddorangddorang.domain.opinion.service.OpinionService;
import com.sww.ddorangddorang.global.common.CommonResponse;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/opinions")
public class OpinionApi {

    private final OpinionService opinionService;
    private static final String SUCCESS = "SUCCESS";

    @PostMapping
    CommonResponse<String> createOpinion(@RequestBody OpinionCreateReq opinionCreateReq, @AuthenticationPrincipal AuthenticatedUser authenticatedUser) {
        log.info("createOpinion Controller 진입");
        opinionService.createOpinion(opinionCreateReq, authenticatedUser);
        return CommonResponse.success(SUCCESS);
    }

}
