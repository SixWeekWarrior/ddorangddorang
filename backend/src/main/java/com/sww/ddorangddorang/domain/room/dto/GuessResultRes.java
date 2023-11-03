package com.sww.ddorangddorang.domain.room.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GuessResultRes {
    private GuessUserRes user;
    private GuessUserRes guessUser;
    private GuessUserRes manito;
    private Boolean guessResult;
}
