package com.sww.ddorangddorang.domain.note.service;

import com.sww.ddorangddorang.auth.dto.CustomOAuth2User;
import com.sww.ddorangddorang.domain.mission.entity.MissionPerform;
import com.sww.ddorangddorang.domain.note.dto.NoteViewReq;
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

    public List<NoteViewRes> getNotes(CustomOAuth2User customOAuth2User) {
        User user = userRepository.findByEmail(customOAuth2User.getEmail()).orElseThrow(
            UserNotFoundException::new);

        Participant receiver = participantRepository.findByUser(user).orElseThrow(
            ParticipantNotFoundException::new);

        List<Note> notes = noteRepository.findAllByReceiver(receiver);

        return NoteViewRes.listOf(notes);
    }


    public NoteViewRes getNote(NoteViewReq noteViewReq, CustomOAuth2User customOAuth2User) {
        Note note = noteRepository.findById(noteViewReq.getId()).orElseThrow(
            ParticipantNotFoundException::new);

        User user = userRepository.findByEmail(customOAuth2User.getEmail()).orElseThrow(
            UserNotFoundException::new);

        Participant participant = participantRepository.findByUserAndRoomAndIsWithdrawalFalseAndDeletedAtIsNull(
            user, user.getRoom()).orElseThrow(ParticipantNotFoundException::new);

        if (!note.getReceiver().equals(participant)) {
            throw new NoteAccessDeniedError();
        }

        note.read();

        return NoteViewRes.of(note);
    }

    public void createNote(NoteCreateReq noteCreateReq, CustomOAuth2User customOAuth2User) {
        User user = userRepository.findByEmail(customOAuth2User.getEmail()).orElseThrow(
            UserNotFoundException::new);

        Participant sender = participantRepository.findByUserAndRoomAndIsWithdrawalFalseAndDeletedAtIsNull
            (user, user.getRoom()).orElseThrow(ParticipantNotFoundException::new);

        User user2 = sender.getManiti();

        Participant receiver = participantRepository.findByUserAndRoomAndIsWithdrawalFalseAndDeletedAtIsNull(
            user2, user.getRoom()).orElseThrow(ParticipantNotFoundException::new);

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

}
