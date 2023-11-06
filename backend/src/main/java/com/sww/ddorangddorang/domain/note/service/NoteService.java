package com.sww.ddorangddorang.domain.note.service;

import com.sww.ddorangddorang.auth.dto.AuthenticatedUser;
import com.sww.ddorangddorang.domain.note.dto.NoteCreateReq;
import com.sww.ddorangddorang.domain.note.dto.NoteViewRes;
import java.util.List;

public interface NoteService {

    List<NoteViewRes> getNotes(AuthenticatedUser authenticatedUser);
    NoteViewRes getNote(Long id, AuthenticatedUser authenticatedUser);
    void createNote(NoteCreateReq noteCreateReq, AuthenticatedUser authenticatedUser);

}
