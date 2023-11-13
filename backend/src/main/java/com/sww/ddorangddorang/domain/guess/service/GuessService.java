package com.sww.ddorangddorang.domain.guess.service;

import com.sww.ddorangddorang.domain.guess.dto.GuessUserPostRes;

public interface GuessService {
    public GuessUserPostRes guessManito(Long userId, Long manitoId);
}
