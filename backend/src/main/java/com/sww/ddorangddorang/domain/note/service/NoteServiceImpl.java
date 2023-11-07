package com.sww.ddorangddorang.domain.note.service;

import com.sww.ddorangddorang.auth.dto.AuthenticatedUser;
import com.sww.ddorangddorang.domain.mission.entity.MissionPerform;
import com.sww.ddorangddorang.domain.note.dto.NoteViewRes;
import com.sww.ddorangddorang.domain.note.exception.NoteAccessDeniedError;
import com.sww.ddorangddorang.domain.participant.exception.ParticipantNotFoundException;
import com.sww.ddorangddorang.domain.user.exception.UserNotFoundException;
import com.sww.ddorangddorang.domain.mission.repository.MissionPerformRepository;
import com.sww.ddorangddorang.domain.note.dto.NoteCreateReq;
import com.sww.ddorangddorang.domain.note.entity.Note;
import com.sww.ddorangddorang.domain.note.repository.NoteRepository;
import com.sww.ddorangddorang.domain.participant.entity.Participant;
import com.sww.ddorangddorang.domain.participant.repository.ParticipantRepository;
import com.sww.ddorangddorang.domain.user.entity.User;
import com.sww.ddorangddorang.domain.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Transactional
@Service
@RequiredArgsConstructor
public class NoteServiceImpl implements NoteService {

    private final NoteRepository noteRepository;
    private final UserRepository userRepository;
    private final ParticipantRepository participantRepository;
    private final MissionPerformRepository missionPerformRepository;

    public List<NoteViewRes> getNotes(AuthenticatedUser authenticatedUser) {
        log.info("getNotes Service 진입");
        log.info("id: {}", authenticatedUser.getId());

        User user = findUserById(authenticatedUser.getId());

        Participant receiver = participantRepository.findByUserAndGameCount(user,
            user.getGameCount()).orElseThrow(ParticipantNotFoundException::new);

        List<Note> notes = noteRepository.findAllByReceiver(receiver);

        return NoteViewRes.listOf(notes);
    }


    public NoteViewRes getNote(Long id, AuthenticatedUser authenticatedUser) {
        log.info("getNote Service 진입");
        log.info("id: {}", authenticatedUser.getId());

        Note note = noteRepository.findById(id).orElseThrow(
            ParticipantNotFoundException::new);

        User user = findUserById(authenticatedUser.getId());

        Participant participant = participantRepository.findByUserAndGameCount(user,
            user.getGameCount()).orElseThrow(ParticipantNotFoundException::new);

        if (!note.getReceiver().equals(participant)) {
            throw new NoteAccessDeniedError();
        }

        note.read();

        return NoteViewRes.of(note);
    }

    public void createNote(NoteCreateReq noteCreateReq, AuthenticatedUser authenticatedUser) {
        log.info("createNote Service 진입");
        log.info("id: {}", authenticatedUser.getId());
        User user = findUserById(authenticatedUser.getId());

        Participant sender = participantRepository.findByUserAndGameCount(user, user.getGameCount())
            .orElseThrow(ParticipantNotFoundException::new);
        Participant receiver = sender.getManiti();

        Optional<MissionPerform> missionPerform = missionPerformRepository.findById(
            noteCreateReq.getMissionPerformId());

        MissionPerform openMissionPerform = missionPerform.orElse(null);

        Note note = Note.builder()
            .title(noteCreateReq.getTitle())
            .content(noteCreateReq.getContent())
            .missionPerform(openMissionPerform)
            .sender(sender)
            .receiver(receiver)
            .build();

        noteRepository.save(note);
    }

    private User findUserById(Long id) {
        return userRepository.findById(id).orElseThrow(UserNotFoundException::new);
    }

}
