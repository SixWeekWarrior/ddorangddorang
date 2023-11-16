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

// TODO: 외래키 참조 컬럼은 참조 컬럼 이름을 설정해주지 않으면 컬럼네임_id로 DB에서 조회함. 이와 관련해서 에러 발생해서 전부 수정하였음
// TODO: 방장이 방을 삭제해도 관련된 방의 participant의 deletedAt 값이 변경되지 않는 문제가 발생함. gameCount로 분류하니까 상관없는가?
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
    @JoinColumn(name = "manito")
    private Participant manito;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "maniti")
    private Participant maniti;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mission")
    private Mission mission;

    private Boolean isKickedOut = false;

    @Column(name = "changes")
    private Short change = 0;

    private LocalDateTime deletedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "guess")
    private User guess;

    private Boolean isCorrect;

    @OneToMany(mappedBy = "player", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MissionPerform> missionPerforms;

    @Builder
    public Participant(User user) {
        this.user = user;
        this.gameCount = user.participateNewGame();
        this.room = user.getRoom();
    }

    public void matchManito(Participant participant) {
        this.manito = participant;
    }

    public void matchManiti(Participant participant) {
        this.maniti = participant;
    }

    public void deleteParticipant() {
        this.deletedAt = LocalDateTime.now().plusHours(9L);
        this.getUser().withdrawRoom();
        this.getRoom().removeMember();
    }

    public void allocateNickname(String nickname) {
        this.nickname = nickname;
    }

    public void changeMission() {
        this.change++;
    }

    public void guessManito(User guessUser) {
        this.guess = guessUser;
        this.isCorrect = this.manito.getUser().equals(guessUser);
    }
}
