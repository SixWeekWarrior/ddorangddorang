package com.sww.ddorangddorang.domain.user.service;

import com.sww.ddorangddorang.domain.mastercode.entity.MasterCode;
import com.sww.ddorangddorang.domain.mastercode.repository.MasterCodeRepository;
import com.sww.ddorangddorang.domain.user.dto.HintDto;
import com.sww.ddorangddorang.domain.user.dto.UsersMoreinfoPutReq;
import com.sww.ddorangddorang.domain.user.dto.UsersSignupPostReq;
import com.sww.ddorangddorang.domain.user.dto.UsersSsafyinfoPutReq;
import com.sww.ddorangddorang.domain.user.dto.UsersTodayinfoPostReq;
import com.sww.ddorangddorang.domain.user.dto.UsersTokenInfo;
import com.sww.ddorangddorang.domain.user.entity.Hint;
import com.sww.ddorangddorang.domain.user.entity.User;
import com.sww.ddorangddorang.domain.user.exception.UserAlreadyExistException;
import com.sww.ddorangddorang.domain.user.exception.UserNotFoundException;
import com.sww.ddorangddorang.domain.user.repository.HintRepository;
import com.sww.ddorangddorang.domain.user.repository.UserRepository;
import com.sww.ddorangddorang.global.common.exception.UnexpectedException;
import jakarta.transaction.Transactional;

import java.util.ArrayList;
import java.util.List;
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
    private final HintRepository hintRepository;
    private final MasterCodeRepository masterCodeRepository;

    public void signUp(User user) throws Exception {
        if (userRepository.findByEmailAndProviderType(user.getEmail(), user.getProviderType()).isPresent()) {
            throw new UserAlreadyExistException(user);
        }

        userRepository.save(user);
    }
    @Transactional
    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }


    public void todayInfo(Long userId, UsersTodayinfoPostReq usersTodayinfoPostReq) {
        User user = userRepository.getReferenceById(userId);

        List<Hint> hintList = new ArrayList<Hint>();
        if (usersTodayinfoPostReq.getColor() != null) {
            MasterCode colorCode = masterCodeRepository.getReferenceById(1_001L);
            hintList.add(Hint.builder()
                            .user(user)
                            .masterCode(colorCode)
                            .content(usersTodayinfoPostReq.getColor())
                            .build());
        }

        if (usersTodayinfoPostReq.getMood() != null) {
            MasterCode moodCode = masterCodeRepository.getReferenceById(1_002L);
            hintList.add(Hint.builder()
                            .user(user)
                            .masterCode(moodCode)
                            .content(usersTodayinfoPostReq.getMood())
                            .build());
        }

        for (Hint hint : hintList) {
            Optional<Hint> optionalHint = hintRepository.findByUserAndMasterCode(user, hint.getMasterCode());
            if (optionalHint.isEmpty()) {
                hintRepository.save(hint);
            } else {
                optionalHint.orElseThrow(UnexpectedException::new).updateContent(hint.getContent());
            }
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

    public void saveRefreshToken(UsersTokenInfo usersTokenInfo) {
        User user = userRepository.findByEmail(usersTokenInfo.getEmail())
            .orElseThrow(UserNotFoundException::new);

        user.updateRefreshToken(usersTokenInfo.getRefreshToken());
    };

    public User getUserInfo(Long id) {
        return userRepository.findById(id).orElseThrow(UserNotFoundException::new);
    }

    @Transactional
    @Override
    public HintDto getHints(Long id) {
        String color = "";
        String mood = "";

        User user = userRepository.findById(id).orElseThrow(UserNotFoundException::new);

        MasterCode colorCode = masterCodeRepository.findById(1_001L).orElseThrow(UnexpectedException::new);
        Optional<Hint> colorHint = hintRepository.findByUserAndMasterCode(user, colorCode);

        if (colorHint.isPresent()) {
            color = colorHint.orElseThrow(UnexpectedException::new).getContent();
        }

        MasterCode moodCode = masterCodeRepository.findById(1_002L).orElseThrow(UnexpectedException::new);
        Optional<Hint>  moodHint = hintRepository.findByUserAndMasterCode(user, moodCode);

        if (moodHint.isPresent()) {
            mood = moodHint.orElseThrow(UnexpectedException::new).getContent();
        }

        return HintDto.builder()
                        .color(color)
                        .mood(mood)
                        .build();
    }

}
