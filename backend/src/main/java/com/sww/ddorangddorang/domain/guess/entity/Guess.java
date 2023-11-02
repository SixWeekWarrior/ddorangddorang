package com.sww.ddorangddorang.domain.guess.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Guess {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;                    // BIGINT
    private Long participantId;           // BIGINT "현재 플레이어"
    private Long manito;             // BIGINT "추측한 사람"
    private Boolean isCorrect = false;    // TINYINT "정답 여부"
    private LocalDateTime deletedAt;    // TIMESTAMP "삭제 시간"

    public void updateGuessInfo(Long manito, Boolean isCorrect){
        this.manito = manito;
        this.isCorrect = isCorrect;
    }
}

