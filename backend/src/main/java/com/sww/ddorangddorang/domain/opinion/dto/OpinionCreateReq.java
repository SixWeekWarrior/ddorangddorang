package com.sww.ddorangddorang.domain.opinion.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class OpinionCreateReq {

    private String content;

}
