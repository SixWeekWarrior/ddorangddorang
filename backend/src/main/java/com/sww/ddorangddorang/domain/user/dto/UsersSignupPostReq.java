package com.sww.ddorangddorang.domain.user.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UsersSignupPostReq {

    private String userName;
    private String email;
    private String password;
    private Integer generation;         // INT
    private Byte isMajor;               // TINYINT
    private Byte gender;                // TINYINT
    private Integer campus;             // INT
    private Integer classes;            // INT
    private Integer floor;              // INT
    private String profileImage;        // TEXT "프로필 이미지"
    private String like;                // VARCHAR(255)
    private String hate;                // VARCHAR(255)
    private String mbti;                // VARCHAR(255)
    private String worry;               // TEXT
}
