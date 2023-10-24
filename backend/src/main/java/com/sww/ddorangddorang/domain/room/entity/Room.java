package com.sww.ddorangddorang.domain.room.entity;

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
import lombok.Getter;
import lombok.NoArgsConstructor;
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

    @Column(name = "is_open")
    @NotNull
    private Boolean isOpen = true;  //TINYINT(1)

    @Column(name = "access_code")
    @NotNull
    private String accessCode;  //VARCHAR(255)

    @Column(name = "min_member")
    @NotNull
    private Integer minMember = 1;  //INT

    /**
     * 현재 참여 인원
     * 방 생성 시 참여 인원은 방 생성자 혼자이므로 기본값 = 1
     */
    @Column(name = "head_count")
    @NotNull
    private Integer headCount = 1;  //INT

    @Column(name = "max_member")
    @NotNull
    private Integer maxMember = Integer.MAX_VALUE;  //INT

    /**
     * DB에서 DEFAULT_VALUE = CURRENT_TIMESTAMP로 설정
     */
    @Column(name = "create_at")
    @NotNull
    private LocalDateTime createdAt = LocalDateTime.now();  //DATETIME

    @Column(name = "start_at")
    private LocalDateTime startedAt;    //DATETIME

    @Column(name = "end_at")
    private LocalDateTime endAt;    //DATETIME

    @Column(name = "profile_image")
    private String profileImage;    //TEXT

    @Column(name = "delete_at")
    private LocalDateTime deletedAt;    //DATETIME


}
