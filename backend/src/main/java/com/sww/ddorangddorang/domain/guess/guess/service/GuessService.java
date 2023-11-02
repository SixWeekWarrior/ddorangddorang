package com.sww.ddorangddorang.domain.guess.guess.service;

import com.sww.ddorangddorang.domain.guess.entity.Guess;

public interface GuessService {
    public Guess getGuessInfo(Long userId);
    public void updateGuessInfo(Long userId, Long guessedUserId);
}
