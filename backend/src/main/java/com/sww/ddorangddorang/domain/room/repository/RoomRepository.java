package com.sww.ddorangddorang.domain.room.repository;

import com.sww.ddorangddorang.domain.room.entity.Room;
import com.sww.ddorangddorang.domain.user.entity.User;
import jakarta.persistence.EntityNotFoundException;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<Room, Long> {

    Room findByAccessCodeAndStartedAtNullAndDeletedAtNull(Integer accessCode)
        throws EntityNotFoundException;

    List<Room> findAllByStartedAtNullAndDeletedAtNull();

    Room findByAdminAndStartedAtNullAndDeletedAtNull(User admin)
        throws EntityNotFoundException;
}
