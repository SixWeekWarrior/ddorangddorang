package com.sww.ddorangddorang.domain.mission.repository;

import com.sww.ddorangddorang.domain.mission.entity.MissionPerform;
import com.sww.ddorangddorang.domain.participant.entity.Participant;
import java.util.List;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MissionPerformRepository extends JpaRepository<MissionPerform, Long> {

    // discard가 false인 것만 리턴하고 싶음
    @EntityGraph(attributePaths = {"mission"})
    List<MissionPerform> findAllByPlayerAndDeletedAtIsNull(Participant player);

    List<MissionPerform> findAllByPlayerAndDiscardFalse(Participant player);
}
