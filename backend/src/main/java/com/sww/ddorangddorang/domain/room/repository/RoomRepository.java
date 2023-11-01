package com.sww.ddorangddorang.domain.room.repository;

import com.sww.ddorangddorang.domain.room.entity.Room;
import com.sww.ddorangddorang.domain.user.entity.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<Room, Long> {

    Optional<Room> findByAccessCodeAndStartedAtNullAndDeletedAtNull(Integer accessCode);

    List<Room> findAllByStartedAtNullAndDeletedAtNull();

    Optional<Room> findByAdminAndStartedAtNullAndDeletedAtNull(User admin);
}
