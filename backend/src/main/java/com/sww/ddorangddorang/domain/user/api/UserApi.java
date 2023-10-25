package com.sww.ddorangddorang.domain.user.api;

import com.sww.ddorangddorang.domain.user.dto.UsersPostReq;
import com.sww.ddorangddorang.domain.user.entity.User;
import com.sww.ddorangddorang.domain.user.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/users")
public class UserApi {
    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<User> login () {

        return ResponseEntity.ok(null);
    }

    @PostMapping("/signup")
    public ResponseEntity<User> signup (
        @Valid @RequestBody UsersPostReq usersPostReq
    ) throws Exception {
        return ResponseEntity.ok(userService.signUp(usersPostReq));
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<User> getUserInfo() {
        return ResponseEntity.ok(userService.getUserWithAuthorities().get());
    }

    @PutMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<User> updateUserInfo() {
        return ResponseEntity.ok(userService.getUserWithAuthorities().get());
    }

    @DeleteMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<User> resign() {
        return ResponseEntity.ok(userService.getUserWithAuthorities().get());
    }
}
