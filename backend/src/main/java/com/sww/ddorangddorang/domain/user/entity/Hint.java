package com.sww.ddorangddorang.domain.user.entity;

import com.sww.ddorangddorang.domain.mastercode.entity.MasterCode;
import com.sww.ddorangddorang.domain.user.dto.UsersTodayinfoPostReq;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

@DynamicInsert
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Hint {

    @Id
    @GeneratedValue
    private Long id;
    private String content;
    @JoinColumn(name = "user_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;
    @JoinColumn(name = "mastercode_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private MasterCode masterCode;


    public void updateContent(String content) {
        this.content = content;
    }

    @Builder
    public Hint(String content, User user, MasterCode masterCode) {
        this.content = content;
        this.user = user;
        this.masterCode = masterCode;
    }
}