package com.sww.ddorangddorang.domain.guess.service;

import com.sww.ddorangddorang.domain.guess.dto.GuessStatus;
import com.sww.ddorangddorang.domain.guess.dto.Profile;
import java.util.List;

public interface GuessService {
    public Profile guessManito(Long userId, Long manitoId);

    public GuessStatus getMyGuessStatus(Long userId);

    public List<GuessStatus> getAllGuessStatus(Long userId);
}
