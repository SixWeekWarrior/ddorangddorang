package com.sww.ddorangddorang.domain.participant.entity;

import com.sww.ddorangddorang.domain.room.entity.Room;
import com.sww.ddorangddorang.domain.user.entity.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

@DynamicInsert
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Participant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private Room room;

    private String nickname;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private User manito;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private User maniti;

    private Integer mission;

    private Boolean isWithdrawal;

    @Column(name = "`change`")
    private Short change;

    private LocalDateTime deletedAt;

    public void matchManito(Participant participant) {
        this.manito = participant.getUser();
    }

    public void matchManiti(Participant participant) {
        this.maniti = participant.getUser();
    }

    public void deleteParticipant() {
        this.deletedAt = LocalDateTime.now();
//        Participant를 null로, 상태를 1L로 설정
//        this.getUser().removeRoom();
    }

    public void allocateNickname(String nickname) {
        this.nickname = nickname;
    }

    @Builder
    public Participant(User user, Room room) {
        this.user = user;
        this.room = room;
        this.isWithdrawal = false;
        this.change = 0;
    }
}
