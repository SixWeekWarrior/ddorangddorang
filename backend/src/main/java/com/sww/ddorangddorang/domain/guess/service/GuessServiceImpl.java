package com.sww.ddorangddorang.domain.guess.service;

import com.sww.ddorangddorang.domain.guess.dto.GuessUserPostRes;
import com.sww.ddorangddorang.domain.guess.exception.NotInSameGameException;
import com.sww.ddorangddorang.domain.participant.entity.Participant;
import com.sww.ddorangddorang.domain.participant.exception.ParticipantNotFoundException;
import com.sww.ddorangddorang.domain.participant.repository.ParticipantRepository;
import com.sww.ddorangddorang.domain.room.entity.Room;
import com.sww.ddorangddorang.domain.room.exception.RoomNotFoundException;
import com.sww.ddorangddorang.domain.user.entity.User;
import com.sww.ddorangddorang.domain.user.exception.UserNotFoundException;
import com.sww.ddorangddorang.domain.user.exception.UserNotParticipateGameException;
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

    public Participant getParticipantInfo(Long userId) {
        User user = userRepository.getReferenceById(userId);
        return participantRepository.findByUserAndGameCount(user, user.getGameCount())
            .orElseThrow(ParticipantNotFoundException::new);
    }

    @Transactional
    public GuessUserPostRes guessManito(Long userId, Long manitoId) {
        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);

        if (user.getStatus() == null || !user.getStatus().equals(4L)) {
            throw new UserNotParticipateGameException();
        }

        Room room = user.getRoom();

        if (room == null) {
            throw new RoomNotFoundException();
        }

        Participant participant = participantRepository.findByUserAndGameCount(user,
            user.getGameCount()).orElseThrow(ParticipantNotFoundException::new);

        User manito = userRepository.findById(manitoId).orElseThrow(UserNotFoundException::new);

        if (manito.getStatus() == null || !manito.getStatus().equals(4L)) {
            throw new UserNotParticipateGameException();
        }

        if (manito.getRoom() == null || !room.equals(manito.getRoom())) {
            throw new NotInSameGameException();
        }

        participant.guessManito(manito);

        return GuessUserPostRes.builder()
            .userId(manitoId)
            .name(manito.getName())
            .isMajor(manito.getIsMajor())
            .classes(manito.getClasses())
            .build();
    }
}

