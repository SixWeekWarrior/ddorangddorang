package com.sww.ddorangddorang.domain.user.dto;

import com.sww.ddorangddorang.domain.user.entity.User;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UsersGetRes {

    private String name;
    private String email;
    private Integer generation;
    private Boolean isMajor;
    private Boolean gender;
    private Integer campus;
    private Integer classes;
    private Integer floor;
    private String profileImage;
    private String likes;
    private String hate;
    private String mbti;
    private String worry;
    private Long roomId;
    private Long status;
    private String mood;
    private String color;

    @Builder
    public UsersGetRes(String name, String email, Integer generation, Boolean isMajor,
        Boolean gender,
        Integer campus, Integer classes, Integer floor, String profileImage, String likes,
        String hate,
        String mbti, String worry, Long roomId, Long status, String mood, String color) {
        this.name = name;
        this.email = email;
        this.generation = generation;
        this.isMajor = isMajor;
        this.gender = gender;
        this.campus = campus;
        this.classes = classes;
        this.floor = floor;
        this.profileImage = profileImage;
        this.likes = likes;
        this.hate = hate;
        this.mbti = mbti;
        this.worry = worry;
        this.roomId = roomId;
        this.status = status;
        this.mood = mood;
        this.color = color;
    }

    public static UsersGetRes userToDto(User user, HintDto hintDto) {
        return UsersGetRes.builder()
            .name(user.getName())
            .email(user.getEmail())
            .generation(user.getGeneration())
            .isMajor(user.getIsMajor())
            .gender(user.getGender())
            .campus(user.getCampus())
            .classes(user.getClasses())
            .floor(user.getFloor())
            .profileImage(user.getProfileImage())
            .likes(user.getLikes())
            .hate(user.getHate())
            .mbti(user.getMbti())
            .worry(user.getWorry())
            .roomId(user.getRoom() == null ? null : user.getRoom().getId())
            .status(user.getStatus())
            .mood(hintDto.getMood())
            .color(hintDto.getColor())
            .build();
    }
}
