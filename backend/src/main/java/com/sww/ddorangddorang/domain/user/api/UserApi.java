package com.sww.ddorangddorang.domain.user.api;

import com.sww.ddorangddorang.auth.service.JwtService;
import com.sww.ddorangddorang.domain.user.dto.UsersMoreinfoPutReq;
import com.sww.ddorangddorang.domain.user.dto.UsersSignupPostReq;
import com.sww.ddorangddorang.domain.user.dto.UsersSsafyinfoPutReq;
import com.sww.ddorangddorang.domain.user.dto.UsersTodayinfoPostReq;
import com.sww.ddorangddorang.domain.user.entity.User;
import com.sww.ddorangddorang.domain.user.exception.UserNotFoundException;
import com.sww.ddorangddorang.domain.user.service.UserService;
import com.sww.ddorangddorang.global.common.CommonResponse;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserApi {
    private final UserService userService;
    private final JwtService jwtService;
    private final static String SUCCESS = "SUCCESS";

    @PostMapping("/login")
    public CommonResponse<String> login(@RequestHeader("Authorization") String authorizationHeader, HttpServletResponse response) throws Exception {
        log.info(authorizationHeader.substring(7));

        Jwt jwt = NimbusJwtDecoder.withJwkSetUri("https://www.googleapis.com/oauth2/v3/certs").build().decode(authorizationHeader.substring(7));

        String email = jwt.getClaim("email");
        log.info(email);

        User checkUser = userService.findByEmail(email).orElseThrow(UserNotFoundException::new);

        return CommonResponse.success(SUCCESS);
    }

    @PostMapping("/signup")
    public CommonResponse<String> signUp(@RequestBody UsersSignupPostReq usersSignupPostReq) throws Exception {
        userService.signUp(usersSignupPostReq);
        return CommonResponse.success(SUCCESS);
    }

    @GetMapping("/jwt-test")
    public String jwtTest() {
        return "jwtTest 요청 성공";
    }

    @PostMapping("/todayinfo")
    public CommonResponse<String> todayinfo(@RequestHeader Long userId, @RequestBody UsersTodayinfoPostReq usersTodayinfoPostReq) {
        log.info("UserApi_todayInfo starts");
        userService.todayInfo(userId, usersTodayinfoPostReq);
        log.info("UserApi_todayInfo ends");
        return CommonResponse.success(SUCCESS);
    }

    @PutMapping("/ssafyinfo")
    public CommonResponse<String> ssafyInfo(@RequestHeader Long userId, @RequestBody UsersSsafyinfoPutReq usersSsafyinfoPutReq) {
        log.info("UserApi_ssafyInfo starts");
        userService.ssafyInfo(userId, usersSsafyinfoPutReq);
        log.info("UserApi_ssafyInfo ends");
        return CommonResponse.success(SUCCESS);
    }

    @PutMapping("/moreinfo")
    public CommonResponse<String> moreInfo(@RequestHeader Long userId, @RequestBody UsersMoreinfoPutReq usersMoreinfoPutReq) {
        log.info("UserApi_moreInfo starts");
        userService.moreInfo(userId, usersMoreinfoPutReq);
        log.info("UserApi_moreInfo ends");
        return CommonResponse.success(SUCCESS);
    }
}