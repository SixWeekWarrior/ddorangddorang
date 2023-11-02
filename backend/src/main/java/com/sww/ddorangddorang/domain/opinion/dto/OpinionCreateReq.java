package com.sww.ddorangddorang.domain.opinion.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class OpinionCreateReq {

    @NotBlank
    private String content;

}
