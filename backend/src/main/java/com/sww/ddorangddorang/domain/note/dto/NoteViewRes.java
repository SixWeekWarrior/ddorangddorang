package com.sww.ddorangddorang.domain.note.dto;

import com.sww.ddorangddorang.domain.note.entity.Note;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class NoteViewRes {

    private Long id;
    private String title;
    private String content;
    private String sender;
    private Boolean isRead;
    private LocalDateTime createdAt;
    private String url;

    public static NoteViewRes of(Note note) {
        return NoteViewRes.builder()
            .id(note.getId())
            .title(note.getTitle())
            .content(note.getContent())
            .sender(note.getSender().getNickname()) // 이거 N+1 터질텐데 -> EntityGraph 넣었음
            .isRead(note.getIsRead())
            .createdAt(note.getCreatedAt())
            .url(note.getUrl())
            .build();
    }

    public static List<NoteViewRes> listOf(List<Note> notes) {
        return notes.stream()
            .map(NoteViewRes::of)
            .collect(Collectors.toList());
    }

}