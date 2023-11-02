package com.sww.ddorangddorang.domain.guess.repository;

import com.sww.ddorangddorang.domain.guess.entity.Guess;
import com.sww.ddorangddorang.domain.participant.entity.Participant;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GuessRepository extends JpaRepository<Guess, Long> {
    Guess findByParticipantId(Long participantId);
}
