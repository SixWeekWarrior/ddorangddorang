package com.sww.ddorangddorang.domain.user.service;


import com.sww.ddorangddorang.domain.user.dto.UsersPostReq;
import com.sww.ddorangddorang.domain.user.entity.User;

public interface UserService {
    User signUp(UsersPostReq usersPostReq) throws Exception;
}
