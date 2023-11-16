package com.sww.ddorangddorang.domain.mission.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Mission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;                    // BIGINT
    private String title;               // VARCHAR(255) "미션 제목"
    private String content;             // TEXT "미션 내용"
    private Long missionType;          // BIGINT "미션 타입"

    @Builder
    public Mission(String title, String content, Long missionType) {
        this.title = title;
        this.content = content;
        this.missionType = missionType;
    }

}
