package com.sww.ddorangddorang.domain.user.dto;

import com.sww.ddorangddorang.domain.user.entity.User;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UsersSignupPostReq {

    private String name;
    private Integer generation;         // INT
    private Boolean isMajor;            // TINYINT
    private Boolean gender;             // TINYINT
    private Integer campus;             // INT
    private Integer classes;            // INT
    private Integer floor;              // INT
    private String like;                // VARCHAR(255)
    private String hate;                // VARCHAR(255)
    private String mbti;                // VARCHAR(255)
    private String worry;               // TEXT

    public User toUser(){
        return User.signup()
            .name(this.name)
            .generation(this.generation)
            .isMajor(this.isMajor)
            .gender(this.gender)
            .campus(this.campus)
            .classes(this.classes)
            .floor(this.floor)
            .likes(this.like)
            .hate(this.hate)
            .mbti(this.mbti)
            .worry(this.worry)
            .build();
    }
}
