package com.sww.ddorangddorang.domain.user.repository;

import com.sww.ddorangddorang.domain.room.entity.Room;
import com.sww.ddorangddorang.domain.user.entity.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    Optional<User> findByName(String name);

    Optional<User> findByRefreshToken(String refreshToken);

    List<User> findAllByRoom(Room room);

    Optional<User> findByEmailAndProviderType(String email, String providerType);

    List<User> findAllByRoomAndStatus(Room room, Long status);

}
