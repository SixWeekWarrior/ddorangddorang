package com.sww.ddorangddorang.domain.note.repository;

import com.sww.ddorangddorang.domain.note.entity.Note;
import com.sww.ddorangddorang.domain.participant.entity.Participant;
import java.util.List;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoteRepository extends JpaRepository<Note, Integer> {

    @EntityGraph(attributePaths = {"sender"})
    List<Note> findAllByReceiver(Participant receiver);

}
