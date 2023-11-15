package com.sww.ddorangddorang.domain.chat.repository;

import com.sww.ddorangddorang.domain.chat.entity.Chat;
import com.sww.ddorangddorang.domain.participant.entity.Participant;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRepository extends JpaRepository<Chat, Long> {

    Optional<Chat> findByManito(Participant participant);

    Optional<Chat> findByManiti(Participant participant);
}
