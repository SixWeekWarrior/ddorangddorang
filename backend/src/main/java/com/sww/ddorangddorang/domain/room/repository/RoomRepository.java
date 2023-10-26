package com.sww.ddorangddorang.domain.room.repository;

import com.sww.ddorangddorang.domain.room.entity.Room;
import jakarta.persistence.EntityNotFoundException;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<Room, Long> {
    Room findRoomByAccessCodeAndStartedAtAndDeletedAt(Integer accessCode, LocalDateTime startedAt, LocalDateTime deletedAt) throws EntityNotFoundException;

    List<Room> findAllByStartedAtAndDeletedAt(LocalDateTime startedAt, LocalDateTime deletedAt) throws EntityNotFoundException;
}
