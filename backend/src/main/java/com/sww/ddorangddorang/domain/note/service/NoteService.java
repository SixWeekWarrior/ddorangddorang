package com.sww.ddorangddorang.domain.note.service;

import com.sww.ddorangddorang.domain.note.dto.NoteCreateReq;
import com.sww.ddorangddorang.domain.note.dto.NoteViewRes;
import java.util.List;

public interface NoteService {

    List<NoteViewRes> getNotes(Long userId);
    NoteViewRes getNote(Long id, Long userId);
    void createNote(NoteCreateReq noteCreateReq, Long userId);

}
