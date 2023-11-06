package com.sww.ddorangddorang.domain.participant.entity;

import com.sww.ddorangddorang.domain.mission.entity.Mission;
import com.sww.ddorangddorang.domain.mission.entity.MissionPerform;
import com.sww.ddorangddorang.domain.room.entity.Room;
import com.sww.ddorangddorang.domain.user.entity.User;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

@DynamicInsert
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@SQLDelete(sql = "UPDATE participant SET deleted_at = NOW() WHERE id = ?")
@Where(clause = "deleted_at IS NULL")
public class Participant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private Integer gameCount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private Room room;

    private String nickname;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Participant manito;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Participant maniti;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Mission mission;

    private Boolean isKickedOut = false;

    @Column(name = "changes")
    private Short change = 0;

    private LocalDateTime deletedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private User guess;

    private Boolean isCorrect;

    @OneToMany(mappedBy = "player", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MissionPerform> missionPerforms;

    @Builder
    public Participant(User user) {
        this.user = user;
        this.gameCount = user.getGameCount();
        this.room = user.getRoom();
    }

    public void matchManito(Participant participant) {
        this.manito = participant;
    }

    public void matchManiti(Participant participant) {
        this.maniti = participant;
    }

    public void deleteParticipant() {
        this.deletedAt = LocalDateTime.now();
        this.getUser().withdrawRoom();
        this.getRoom().removeMember();
    }

    public void allocateNickname(String nickname) {
        this.nickname = nickname;
    }
}
