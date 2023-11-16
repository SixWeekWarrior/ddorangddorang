package com.sww.ddorangddorang.domain.chat.entity;

import com.sww.ddorangddorang.domain.participant.entity.Participant;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Chat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;                    // BIGINT

    @ManyToOne(fetch = FetchType.LAZY)
    private Participant manito;                // BIGINT "manito_id"

    @ManyToOne(fetch = FetchType.LAZY)
    private Participant maniti;                // BIGINT "maniti_id"

    LocalDateTime deletedAt;    // TIMESTAMP "삭제 시간"

    LocalDateTime createdAt;    // TIMESTAMP "생성 시간"

    @Builder
    public Chat(Participant manito, Participant maniti) {
        this.manito = manito;
        this.maniti = maniti;
        this.createdAt = LocalDateTime.now().plusHours(9L);
    }

    public void deleteChat() {
        this.deletedAt = LocalDateTime.now().plusHours(9L);
    }
}
