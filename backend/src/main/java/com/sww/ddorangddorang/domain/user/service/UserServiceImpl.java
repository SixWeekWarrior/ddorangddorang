package com.sww.ddorangddorang.domain.user.service;

import com.sww.ddorangddorang.domain.mastercode.entity.MasterCode;
import com.sww.ddorangddorang.domain.user.dto.UsersMoreinfoPutReq;
import com.sww.ddorangddorang.domain.user.dto.UsersSignupPostReq;
import com.sww.ddorangddorang.domain.user.dto.UsersSsafyinfoPutReq;
import com.sww.ddorangddorang.domain.user.dto.UsersTodayinfoPostReq;
import com.sww.ddorangddorang.domain.user.entity.Hint;
import com.sww.ddorangddorang.domain.user.entity.User;
import com.sww.ddorangddorang.domain.user.repository.HintRepository;
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
    private final HintRepository hintRepository;

    public void signUp(UsersSignupPostReq usersSignupPostReq) throws Exception {

        if (userRepository.findByEmail(usersSignupPostReq.getEmail()).isPresent()) {
            throw new Exception("이미 존재하는 이메일입니다.");
        }

        // TODO: properties 추가
        User user = User.signup()
                .email(usersSignupPostReq.getEmail())
                .name(usersSignupPostReq.getName())
                .role("ROLE_USER")
                .gender(usersSignupPostReq.getGender())
                .mbti(usersSignupPostReq.getMbti())
                .worry(usersSignupPostReq.getWorry())
                .likes(usersSignupPostReq.getLikes())
                .hate(usersSignupPostReq.getHate())
                .build();

//        user.passwordEncode(passwordEncoder);
        userRepository.save(user);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }


    public void todayInfo(Long userId, UsersTodayinfoPostReq usersTodayinfoPostReq) {
        User user = userRepository.getReferenceById(userId);
        MasterCode masterCode = usersTodayinfoPostReq.getMasterCode();
        Optional<Hint> optionalHint = hintRepository.findByUserAndMasterCode(user, masterCode);
        Hint hint;
        if (optionalHint.isEmpty()) {
            hint = Hint.builder().content(usersTodayinfoPostReq.getContent()).user(user).masterCode(masterCode).build();
            hintRepository.save(hint);
        } else {
            hint = optionalHint.get();
            hint.updateContent(usersTodayinfoPostReq.getContent());
        }
    }

    public void ssafyInfo(Long userId, UsersSsafyinfoPutReq usersSsafyinfoPutReq) {
        User user = userRepository.getReferenceById(userId);
        user.updateSsafyInfo(usersSsafyinfoPutReq);
    }

    public void moreInfo(Long userId, UsersMoreinfoPutReq usersMoreinfoPutReq) {
        User user = userRepository.getReferenceById(userId);
        user.updateMoreInfo(usersMoreinfoPutReq);
    }

}
