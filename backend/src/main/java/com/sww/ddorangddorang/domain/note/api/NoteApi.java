package com.sww.ddorangddorang.domain.note.api;

import com.sww.ddorangddorang.auth.dto.AuthenticatedUser;
import com.sww.ddorangddorang.domain.note.dto.NoteCreateReq;
import com.sww.ddorangddorang.domain.note.dto.NoteViewRes;
import com.sww.ddorangddorang.domain.note.service.NoteService;
import com.sww.ddorangddorang.global.common.CommonResponse;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/notes")
public class NoteApi {

    private final NoteService noteService;
    private static final String SUCCESS = "SUCCESS";

    // TODO: 게임 시작 메소드 테스트 이후에 Note 보내지는지 확인하기
    @GetMapping("/{id}")
    public CommonResponse<NoteViewRes> getNote(@PathVariable Long id,
        @AuthenticationPrincipal AuthenticatedUser authenticatedUser) {
        log.info("getNote Controller 진입");
        return CommonResponse.success(noteService.getNote(id, authenticatedUser));
    }

    @GetMapping
    public CommonResponse<List<NoteViewRes>> getNotes(
        @AuthenticationPrincipal AuthenticatedUser authenticatedUser) {
        log.info("getNotes Controller 진입");
        return CommonResponse.success(noteService.getNotes(authenticatedUser));
    }

    @PostMapping
    public CommonResponse<String> createNote(@RequestBody NoteCreateReq noteCreateReq,
        @AuthenticationPrincipal AuthenticatedUser authenticatedUser) {
        log.info("createNote Controller 진입");
        noteService.createNote(noteCreateReq, authenticatedUser);
        return CommonResponse.success(SUCCESS);
    }

}
