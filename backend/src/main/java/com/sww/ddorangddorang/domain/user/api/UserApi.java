package com.sww.ddorangddorang.domain.user.api;

import com.sww.ddorangddorang.domain.user.dto.UsersMoreinfoPostReq;
import com.sww.ddorangddorang.domain.user.dto.UsersSignupPostReq;
import com.sww.ddorangddorang.domain.user.dto.UsersSsafyinfoPostReq;
import com.sww.ddorangddorang.domain.user.service.UserService;
import com.sww.ddorangddorang.global.common.CommonResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/users")
public class UserApi {
    private final UserService userService;
    private final static String SUCCESS = "Success";

    @PostMapping("/signup")
    public String signUp(@RequestBody UsersSignupPostReq usersSignupPostReq) throws Exception {
        userService.signUp(usersSignupPostReq);
        return "회원가입 성공";
    }

    @GetMapping("/jwt-test")
    public String jwtTest() {
        return "jwtTest 요청 성공";
    }

    @PostMapping("/ssafyinfo")
    public CommonResponse<String> ssafyInfo(@RequestHeader Long userId, @RequestBody UsersSsafyinfoPostReq usersSsafyinfoPostReq) {
        log.info("UserApi_ssafyInfo starts");
        userService.ssafyInfo(userId, usersSsafyinfoPostReq);
        log.info("UserApi_ssafyInfo ends");
        return CommonResponse.success(SUCCESS);
    }

    @PostMapping("/moreinfo")
    public CommonResponse<String> moreInfo(@RequestHeader Long userId, @RequestBody UsersMoreinfoPostReq usersMoreinfoPostReq) {
        log.info("UserApi_moreInfo starts");
        userService.moreInfo(userId, usersMoreinfoPostReq);
        log.info("UserApi_moreInfo ends");
        return CommonResponse.success(SUCCESS);
    }
}