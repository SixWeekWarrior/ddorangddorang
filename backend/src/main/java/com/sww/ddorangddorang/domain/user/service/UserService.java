package com.sww.ddorangddorang.domain.user.service;


import com.sww.ddorangddorang.domain.user.dto.UsersSignupPostReq;
import com.sww.ddorangddorang.domain.user.entity.User;
import java.util.Optional;

public interface UserService {
    void signUp(UsersSignupPostReq usersPostReq) throws Exception;

    Optional<User> findByEmail(String email);
}
