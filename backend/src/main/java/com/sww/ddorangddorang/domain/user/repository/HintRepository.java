package com.sww.ddorangddorang.domain.user.repository;

import com.sww.ddorangddorang.domain.mastercode.entity.MasterCode;
import com.sww.ddorangddorang.domain.user.entity.Hint;
import com.sww.ddorangddorang.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface HintRepository extends JpaRepository<Hint, Long> {

    Optional<Hint> findByUserAndMasterCode(User user, Long masterCode);
}
