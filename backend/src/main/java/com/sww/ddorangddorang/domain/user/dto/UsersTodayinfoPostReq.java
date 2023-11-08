package com.sww.ddorangddorang.domain.user.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UsersTodayinfoPostReq {
    private String mood;        // 1_002
    private String color;       // 1_001
}
