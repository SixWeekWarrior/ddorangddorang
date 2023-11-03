package com.sww.ddorangddorang.domain.guess.guess.service;

import com.sww.ddorangddorang.domain.guess.entity.Guess;
import com.sww.ddorangddorang.domain.guess.repository.GuessRepository;
import com.sww.ddorangddorang.domain.participant.entity.Participant;
import com.sww.ddorangddorang.domain.participant.exception.ParticipantNotFoundException;
import com.sww.ddorangddorang.domain.participant.repository.ParticipantRepository;
import com.sww.ddorangddorang.domain.room.entity.Room;
import com.sww.ddorangddorang.domain.user.entity.User;
import com.sww.ddorangddorang.domain.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Slf4j
@Service
public class GuessServiceImpl implements GuessService {

    private final UserRepository userRepository;
    private final ParticipantRepository participantRepository;
    private final GuessRepository guessRepository;


    public Participant getParticipantInfo(Long userId) {
        User user = userRepository.getReferenceById(userId);
        return participantRepository.findByUserAndGameCount(user, user.getGameCount())
            .orElseThrow(ParticipantNotFoundException::new);
    }

    @Override
    public Guess getGuessInfo(Long participantId) {
        return guessRepository.findByParticipantId(participantId);
    }

    public Boolean guessManito(Long manitoId, Long guessedUserId) {
        return manitoId.equals(guessedUserId);
    }

    @Transactional
    @Override
    public void updateGuessInfo(Long userId, Long guessedUserId) {
        Guess guess = this.getGuessInfo(userId);
        Participant participant = this.getParticipantInfo(userId);
        //업데이트 하는 코드
        // update(guessManito(
    }

}

