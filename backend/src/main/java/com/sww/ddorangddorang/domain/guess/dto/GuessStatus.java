package com.sww.ddorangddorang.domain.guess.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

@Getter
@DynamicInsert
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GuessStatus {
    private Profile me;
    private Profile guessUser;
    private Profile manito;
    private Boolean isCorrect;

    @Builder
    public GuessStatus(Profile me, Profile guessUser, Profile manito, Boolean isCorrect) {
        this.me = me;
        this.guessUser = guessUser;
        this.manito = manito;
        this.isCorrect = isCorrect;
    }
}
