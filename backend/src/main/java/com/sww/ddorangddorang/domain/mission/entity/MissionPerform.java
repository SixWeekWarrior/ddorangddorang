package com.sww.ddorangddorang.domain.mission.entity;

import com.sww.ddorangddorang.domain.user.entity.User;
import jakarta.persistence.Entity;
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
import org.hibernate.annotations.CreationTimestamp;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class MissionPerform {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;                    // BIGINT

    @ManyToOne
    @JoinColumn(name = "player_id")
    private User player;                // BIGINT "유저 아이디"

    @ManyToOne
    @JoinColumn(name = "mission_id")
    private Mission mission;            // BIGINT "미션 아이디"

    @CreationTimestamp
    private LocalDateTime receivedAt;   // TIMESTAMP "생성 시간"

    private LocalDateTime performedAt;  // TIMESTAMP "완료 시간"
    private Long reaction;              // BIGINT "반응"
    private String proof;               // TEXT "증명"
    private Boolean discard = false;    // TINYINT "포기 여부"
    private LocalDateTime deletedAt;    // TIMESTAMP "삭제 시간"

    @Builder
    public MissionPerform(User player, Mission mission) {
        this.player = player;
        this.mission = mission;
    }

    public void missionComplete(Long reaction, String proof) {
        this.performedAt = LocalDateTime.now();
        this.reaction = reaction;
        this.proof = proof;
    }

    public void missionComplete() {
        this.performedAt = LocalDateTime.now();
    }

    public void missionGiveup() {
        this.discard = true;
    }

    public boolean isCompleted() {
        return this.performedAt != null;
    }

}
