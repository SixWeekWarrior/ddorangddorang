package com.sww.ddorangddorang.domain.room.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AccessCodeReq {

    private Integer accessCode;

}
