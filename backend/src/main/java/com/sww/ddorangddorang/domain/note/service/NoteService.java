package com.sww.ddorangddorang.domain.note.service;

import com.sww.ddorangddorang.auth.dto.CustomOAuth2User;
import com.sww.ddorangddorang.domain.note.dto.NoteCreateReq;
import com.sww.ddorangddorang.domain.note.dto.NoteViewReq;
import com.sww.ddorangddorang.domain.note.dto.NoteViewRes;
import java.util.List;

public interface NoteService {

    List<NoteViewRes> getNotes(CustomOAuth2User customOAuth2User);

    NoteViewRes getNote(NoteViewReq noteViewReq, CustomOAuth2User customOAuth2User);
    void createNote(NoteCreateReq noteCreateReq, CustomOAuth2User customOAuth2User);

}
