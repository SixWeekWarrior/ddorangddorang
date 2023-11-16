package com.sww.ddorangddorang.domain.note.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class NoteCreateReq {

    @NotBlank
    private String title;

    @NotBlank
    private String content;

//    private Long missionPerformId;

    public NoteCreateReq(String title, String content) {
        this.title = title;
        this.content = content;
//        this.missionPerformId = missionPerformId;
    }

}
