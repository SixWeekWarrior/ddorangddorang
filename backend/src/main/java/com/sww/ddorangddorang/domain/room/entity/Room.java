package com.sww.ddorangddorang.domain.room.entity;

import com.sww.ddorangddorang.domain.room.dto.RoomInfoReq;
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
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicInsert;

@DynamicInsert
@Table(name = "room")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;    //BIGINT

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "admin_id")
    @NotNull
    private User admin; //BIGINT

    @NotNull
    private Boolean isOpen;  //TINYINT(1)

    @NotNull
    private Integer accessCode;  //INT

    @NotNull
    private Integer campus; //INT

    //    @Column(name = "min_member")
    @NotNull
    private Integer minMember = 1;  //INT

    /**
     * 현재 참여 인원 방 생성 시 참여 인원은 방 생성자 혼자이므로 기본값 = 1
     */
//    @Column(name = "head_count")
    @NotNull
    private Integer headCount;  //INT

    //    @Column(name = "max_member")
    @NotNull
    private Integer maxMember = Integer.MAX_VALUE;  //INT

    /**
     * DB에서 DEFAULT_VALUE = CURRENT_TIMESTAMP로 설정
     */
    @Column(name = "create_at")
    @NotNull
    @CreationTimestamp
    private LocalDateTime createdAt;    //DATETIME

    @Column(name = "start_at")
    private LocalDateTime startedAt;    //DATETIME

    @Column
    @NotNull
    private Integer duration;    //INT

    //    @Column(name = "profile_image")
    private String profileImage;    //TEXT

    //    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;    //DATETIME

    public void startGame() {
        this.startedAt = LocalDateTime.now();
    }

    public void deleteRoom() {
        this.deletedAt = LocalDateTime.now();
    }

    public void joinMember() {
        ++this.headCount;
    }

    public void removeMember() {
        --this.headCount;
    }

    public void updateHeadCount(Integer headCount) {
        this.headCount = headCount;
    }

    public void updateRoomInfo(RoomInfoReq roomInfoReq) {
        this.maxMember = roomInfoReq.getMaxMember();
        this.minMember = roomInfoReq.getMinMember();
        this.isOpen = roomInfoReq.getIsOpen();
        this.duration = roomInfoReq.getDuration();
    }

    public Boolean isEnded() {
        return LocalDateTime.now().isAfter(this.startedAt.plusDays(this.duration));
    }

    @Builder
    public Room(User admin, Integer accessCode, Integer minMember, Integer maxMember,
        Integer duration,
        String profileImage) {
        this.admin = admin;
        this.isOpen = true;
        this.accessCode = accessCode;
        this.campus = admin.getCampus();
        this.minMember = minMember;
        this.headCount = 1;
        this.maxMember = maxMember;
        this.createdAt = LocalDateTime.now();
        this.duration = duration;
        this.profileImage = profileImage;
    }
}
