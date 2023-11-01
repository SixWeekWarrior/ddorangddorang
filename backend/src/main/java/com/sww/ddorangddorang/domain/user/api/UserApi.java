package com.sww.ddorangddorang.domain.user.api;

import com.sww.ddorangddorang.domain.user.dto.UsersMoreinfoPostReq;
import com.sww.ddorangddorang.domain.user.dto.UsersSignupPostReq;
import com.sww.ddorangddorang.domain.user.dto.UsersSsafyinfoPostReq;
import com.sww.ddorangddorang.domain.user.entity.User;
import com.sww.ddorangddorang.domain.user.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/users")
public class UserApi {
    private final UserService userService;

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
    public String ssafyInfo(@RequestHeader Long userId, @RequestBody UsersSsafyinfoPostReq usersSsafyinfoPostReq) {
        userService.ssafyInfo(userId, usersSsafyinfoPostReq);
        return "수정완료";
    }

    @PostMapping("/moreinfo")
    public String moreInfo(@RequestHeader Long userId, @RequestBody UsersMoreinfoPostReq usersMoreinfoPostReq) {
        userService.moreInfo(userId, usersMoreinfoPostReq);
        return "수정완료";
    }


}
