package com.sww.ddorangddorang.domain.user.service;

import com.sww.ddorangddorang.domain.user.dto.UsersPostReq;
import com.sww.ddorangddorang.domain.user.entity.User;
import com.sww.ddorangddorang.domain.user.repository.UserRepository;
import com.sww.ddorangddorang.global.config.BCryptConfig;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Transactional
@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final BCryptConfig bCryptConfig;

    public User signUp(UsersPostReq usersPostReq) throws Exception {

        if (userRepository.findByEmail(usersPostReq.getEmail()).isPresent()) {
            throw new Exception("이미 존재하는 이메일입니다.");
        }

        User user = User.builder()
            .email(usersPostReq.getEmail())
            .name(usersPostReq.getName())
            .paassword(usersPostReq.getPassword())
            .role("ROLE_USER")
            .build();

        user.passwordEncode(bCryptConfig.passwordEncoder());
        userRepository.save(user);
    }

}
