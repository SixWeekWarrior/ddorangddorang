package com.sww.ddorangddorang.domain.mission.repository;

import com.sww.ddorangddorang.domain.mission.entity.MissionPerform;
import com.sww.ddorangddorang.domain.participant.entity.Participant;
import com.sww.ddorangddorang.domain.user.entity.User;
import java.util.List;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MissionPerformRepository extends JpaRepository<MissionPerform, Long> {

    @EntityGraph(attributePaths = {"mission"})
    List<MissionPerform> findAllByPlayer(Participant player);

}
