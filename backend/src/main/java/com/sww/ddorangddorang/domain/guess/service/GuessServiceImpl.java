package com.sww.ddorangddorang.domain.guess.service;

import com.sww.ddorangddorang.domain.guess.dto.GuessStatus;
import com.sww.ddorangddorang.domain.guess.dto.Profile;
import com.sww.ddorangddorang.domain.guess.exception.CannotGuessMyselfException;
import com.sww.ddorangddorang.domain.guess.exception.NotGuessableException;
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
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
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
    public Profile guessManito(Long userId, Long manitoId) {
        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);

        if (user.getStatus() == null || !user.getStatus().equals(4L)) {
            throw new UserNotParticipateGameException();
        }

        if(userId.equals(manitoId)) {
            throw new CannotGuessMyselfException();
        }

        Room room = user.getRoom();

        if (room == null) {
            throw new RoomNotFoundException();
        }

        if(room.getStartedAt().plusDays(room.getDuration()).minusDays(3L).toLocalDate().isBefore(
            LocalDate.now())) {
            throw new NotGuessableException();
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

        return Profile.builder()
            .userId(manitoId)
            .name(manito.getName())
            .isMajor(manito.getIsMajor())
            .classes(manito.getClasses())
            .profileImage(manito.getProfileImage())
            .build();
    }

    public GuessStatus getMyGuessStatus(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
        Profile myProfile;
        Profile guessUserProfile;
        Profile manitoProfile;

        if (user.getStatus() == null) {
            throw new UserNotParticipateGameException();
        }

        Room room = user.getRoom();

        if (room == null) {
            throw new RoomNotFoundException();
        }

        if(room.getStartedAt().plusDays(room.getDuration()).minusDays(3L).toLocalDate().isBefore(
            LocalDate.now())) {
            throw new NotGuessableException();
        }

        Participant participant = participantRepository.findByUserAndGameCount(user,
            user.getGameCount()).orElseThrow(ParticipantNotFoundException::new);

        User guessUser = participant.getGuess();
        User manito = participant.getManito().getUser();
        Boolean isCorrect = room.isEnded() ? participant.getIsCorrect() : null;

        myProfile = Profile.builder()
            .userId(userId)
            .name(user.getName())
            .isMajor(user.getIsMajor())
            .classes(user.getClasses())
            .profileImage(user.getProfileImage())
            .build();

        guessUserProfile = Profile.builder()
            .userId(guessUser.getId())
            .name(guessUser.getName())
            .isMajor(guessUser.getIsMajor())
            .classes(guessUser.getClasses())
            .profileImage(guessUser.getProfileImage())
            .build();

        if (room.isEnded()) {
            manitoProfile = Profile.builder()
                .userId(manito.getId())
                .name(manito.getName())
                .isMajor(manito.getIsMajor())
                .classes(manito.getClasses())
                .profileImage(manito.getProfileImage())
                .build();
        } else {
            manitoProfile = Profile.builder().build();
        }

        return GuessStatus.builder()
            .me(myProfile)
            .guessUser(guessUserProfile)
            .manito(manitoProfile)
            .isCorrect(isCorrect)
            .build();
    }

    public List<GuessStatus> getAllGuessStatus(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);

        if (user.getStatus() == null) {
            throw new UserNotParticipateGameException();
        }

        Optional<Participant> optionalParticipant = participantRepository.findByUserAndGameCount(user,
            user.getGameCount());

        if (!optionalParticipant.isPresent()) {
            throw new RoomNotFoundException();
        }
        Participant participant = optionalParticipant.get();

        Room room = participant.getRoom();

        if (room == null) {
            throw new RoomNotFoundException();
        }

        if(room.getStartedAt().plusDays(room.getDuration()).minusDays(3L).toLocalDate().isBefore(
            LocalDate.now())) {
            throw new NotGuessableException();
        }

        List<Participant> participantList = participantRepository.findAllByRoomAndDeletedAtIsNull(
            room);

        List<Participant> playerList = new LinkedList<>();

        playerList.add(participant);
        for (Participant player : participantList) {
            if (player.equals(player) || player.getDeletedAt() != null) {
                continue;
            }

            playerList.add(player);
        }

        Boolean ended = room.isEnded();
        List<GuessStatus> guessStatusList = new ArrayList<>();
        for(Participant player: playerList) {
            User me = player.getUser();
            Profile myProfile = Profile.builder()
                .userId(me.getId())
                .name(me.getName())
                .isMajor(me.getIsMajor())
                .classes(me.getClasses())
                .profileImage(me.getProfileImage())
                .build();
            Profile guessProfile;
            if(player.getGuess() != null) {
                User guessUser = player.getGuess();
                guessProfile = Profile.builder()
                    .userId(guessUser.getId())
                    .name(guessUser.getName())
                    .isMajor(guessUser.getIsMajor())
                    .classes(guessUser.getClasses())
                    .profileImage(guessUser.getProfileImage())
                    .build();
            } else {
                guessProfile = Profile.builder().build();
            }

            Profile manitoProfile;
            if(ended) {
                User manito = player.getManito().getUser();
                manitoProfile = Profile.builder()
                    .userId(manito.getId())
                    .name(manito.getName())
                    .isMajor(manito.getIsMajor())
                    .classes(manito.getClasses())
                    .profileImage(manito.getProfileImage())
                    .build();
            } else {
                manitoProfile = Profile.builder().build();
            }

            GuessStatus guessStatus = GuessStatus.builder()
                .me(myProfile)
                .guessUser(guessProfile)
                .manito(manitoProfile)
                .isCorrect(ended ? player.getIsCorrect() : null)
                .build();
            guessStatusList.add(guessStatus);
        }

        return guessStatusList;
    }
}

