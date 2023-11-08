package com.sww.ddorangddorang.domain.room.dto;

import com.sww.ddorangddorang.domain.user.entity.User;
import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class WaitingListRes {

    private Long userId;
    private String name;
    private String profileImage;
    private Integer generation;
    private Integer classes;

    public static WaitingListRes of(User user) {
        return WaitingListRes.builder().userId(user.getId()).name(user.getName())
            .profileImage(user.getProfileImage()).generation(user.getGeneration())
            .classes(user.getClasses()).build();
    }

    public static List<WaitingListRes> listOf(List<User> userList) {
        return userList.stream().map(WaitingListRes::of).toList();
    }
}
