package com.sww.ddorangddorang.domain.report.entity;

import com.sww.ddorangddorang.domain.room.entity.Room;
import com.sww.ddorangddorang.domain.user.entity.User;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

@DynamicInsert
@Table
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn
    @ManyToOne(fetch = FetchType.LAZY)
    private User reporter;

    @JoinColumn
    @ManyToOne(fetch = FetchType.LAZY)
    private User reportee;

    @JoinColumn
    @ManyToOne(fetch = FetchType.LAZY)
    private Room room;

    private String content;

    @Builder
    public Report(User reporter, User reportee, Room room, String content) {
        this.reporter = reporter;
        this.reportee = reportee;
        this.room = room;
        this.content = content;
    }
}
