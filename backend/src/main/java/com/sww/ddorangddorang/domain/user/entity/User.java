package com.sww.ddorangddorang.domain.user.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class User {
    @Id
    @GeneratedValue
    private Long id;                    // BIGINT

    private String name;                // VARCHAR(255)
    private String email;               // VARCHAR(255)
    private Integer generation;         // INT
    private Byte isMajor;               // TINYINT
    private Byte gender;                // TINYINT
    private Integer campus;             // INT
    private Integer classes;            // INT
    private Integer floor;              // INT
    private String profileImage;        // TEXT
    private String like;                // VARCHAR(255)
    private String hate;                // VARCHAR(255)
    private String mbti;                // VARCHAR(255)
    private String worry;               // TEXT
    private Integer reportCount;        // INT
    private Long participate;           // BIGINT - FK(ROOM)
    private Long status;                // BIGINT - FK(MASTER_CODE)
    private LocalDateTime deletedAt;    // TIMESTAMP
}
