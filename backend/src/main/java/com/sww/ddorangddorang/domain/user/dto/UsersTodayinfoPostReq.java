package com.sww.ddorangddorang.domain.user.dto;
import com.sww.ddorangddorang.domain.mastercode.entity.MasterCode;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UsersTodayinfoPostReq {
    private MasterCode masterCode;
    private String content;
}
