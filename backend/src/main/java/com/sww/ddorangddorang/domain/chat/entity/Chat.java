package com.sww.ddorangddorang.domain.chat.entity;

import com.sww.ddorangddorang.domain.participant.entity.Participant;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
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
    @JoinColumn(name = "manito_id")
    private Participant manito;                // BIGINT "manito"

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "maniti_id")
    private Participant maniti;                // BIGINT "maniti"

    private Boolean isSentByManito;

    private String content;

    private LocalDateTime createdAt = LocalDateTime.now().plusHours(9L);    // TIMESTAMP "생성 시각"

    private LocalDateTime deletedAt;    // TIMESTAMP "삭제 시긱"

    @Builder
    public Chat(Participant participant, Boolean isSentByManito, String content) {
        if(isSentByManito) {
            this.manito = participant;
            this.maniti = participant.getManiti();
        } else {
            this.manito = participant.getManito();
            this.maniti = participant;
        }
        this.isSentByManito = isSentByManito;
        this.content = content;
    }

    public void deleteChat() {
        this.deletedAt = LocalDateTime.now().plusHours(9L);
    }
}
