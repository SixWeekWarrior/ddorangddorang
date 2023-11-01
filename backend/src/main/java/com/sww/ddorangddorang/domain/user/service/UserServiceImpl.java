package com.sww.ddorangddorang.domain.user.service;

import com.sww.ddorangddorang.domain.user.dto.UsersMoreinfoPostReq;
import com.sww.ddorangddorang.domain.user.dto.UsersSignupPostReq;
import com.sww.ddorangddorang.domain.user.dto.UsersSsafyinfoPostReq;
import com.sww.ddorangddorang.domain.user.entity.User;
import com.sww.ddorangddorang.domain.user.repository.UserRepository;
import jakarta.transaction.Transactional;

import java.util.Optional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Transactional
@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public void signUp(UsersSignupPostReq usersSignupPostReq) throws Exception {

        if (userRepository.findByEmail(usersSignupPostReq.getEmail()).isPresent()) {
            throw new Exception("이미 존재하는 이메일입니다.");
        }

        // TODO: properties 추가
        User user = User.signup()
                .email(usersSignupPostReq.getEmail())
                .password(usersSignupPostReq.getPassword())
                .name(usersSignupPostReq.getName())
                .role("ROLE_USER")
                .build();

        user.passwordEncode(passwordEncoder);
        userRepository.save(user);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public void ssafyInfo(Long userId, UsersSsafyinfoPostReq usersSsafyinfoPostReq) {
        User user = userRepository.getReferenceById(userId);
        user.updateSsafyInfo(usersSsafyinfoPostReq);
    }

    public void moreInfo(Long userId, UsersMoreinfoPostReq usersMoreinfoPostReq) {
        User user = userRepository.getReferenceById(userId);
        user.updateMoreInfo(usersMoreinfoPostReq);
    }

}
