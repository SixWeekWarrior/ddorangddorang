package com.sww.ddorangddorang.domain.opinion.service;

import com.sww.ddorangddorang.auth.dto.AuthenticatedUser;
import com.sww.ddorangddorang.domain.user.exception.UserNotFoundException;
import com.sww.ddorangddorang.domain.opinion.dto.OpinionCreateReq;
import com.sww.ddorangddorang.domain.opinion.entity.Opinion;
import com.sww.ddorangddorang.domain.opinion.repository.OpinionRepository;
import com.sww.ddorangddorang.domain.user.entity.User;
import com.sww.ddorangddorang.domain.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Transactional
@Service
@RequiredArgsConstructor
public class OpinionServiceImpl implements OpinionService {

    private final OpinionRepository opinionRepository;
    private final UserRepository userRepository;

    public void createOpinion(OpinionCreateReq opinionCreateReq, AuthenticatedUser authenticatedUser) {
        String email = authenticatedUser.getEmail();
        log.info("email: {}", email);
        User user = userRepository.findByEmail(email).orElseThrow(UserNotFoundException::new);
        log.info("user: {}", user);

        Opinion opinion = Opinion.builder()
            .user(user)
            .content(opinionCreateReq.getContent())
            .build();

        opinionRepository.save(opinion);
    }

}
