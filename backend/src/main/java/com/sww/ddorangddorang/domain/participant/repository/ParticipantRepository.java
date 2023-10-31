package com.sww.ddorangddorang.domain.participant.repository;

import com.sww.ddorangddorang.domain.participant.entity.Participant;
import com.sww.ddorangddorang.domain.room.entity.Room;
import jakarta.persistence.EntityNotFoundException;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.parameters.P;

public interface ParticipantRepository extends JpaRepository<Participant, Long> {

    List<Participant> findAllByRoomAndIsWithdrawalFalseAndDeletedAtIsNull(Room room);
}
