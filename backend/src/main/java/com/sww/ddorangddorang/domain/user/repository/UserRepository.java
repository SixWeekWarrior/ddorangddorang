package com.sww.ddorangddorang.domain.user.repository;

import com.sww.ddorangddorang.domain.user.entity.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    Optional<User> findByName(String name);

    Optional<User> findByRefreshToken(String refreshToken);

    Optional<User> findByProviderTypeAndProviderId(String providerType, String providerId);
}
