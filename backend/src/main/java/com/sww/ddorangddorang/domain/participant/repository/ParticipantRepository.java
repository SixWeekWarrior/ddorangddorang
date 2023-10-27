package com.sww.ddorangddorang.domain.participant.repository;

import com.sww.ddorangddorang.domain.participant.entity.Participant;
import com.sww.ddorangddorang.domain.room.entity.Room;
import jakarta.persistence.EntityNotFoundException;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ParticipantRepository extends JpaRepository<Participant, Long> {

    List<Participant> findAllByRoomAndIsWithdrawalAndDeletedAt(Room room, Boolean isWithdrawal,
        LocalDateTime deletedAt);
}
