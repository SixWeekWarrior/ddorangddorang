package com.sww.ddorangddorang.domain.chat.repository;

import com.sww.ddorangddorang.domain.chat.entity.Chat;
import com.sww.ddorangddorang.domain.participant.entity.Participant;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRepository extends JpaRepository<Chat, Long> {
    List<Chat> findAllByManitoAndDeletedAtIsNotNull(Participant manito);
    List<Chat> findAllByManitiAndDeletedAtIsNotNull(Participant maniti);

//    Optional<Chat> findByManito(Participant participant);
//
//    Optional<Chat> findByManiti(Participant participant);
}
