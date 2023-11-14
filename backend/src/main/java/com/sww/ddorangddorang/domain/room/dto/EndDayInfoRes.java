package com.sww.ddorangddorang.domain.room.dto;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

@Getter
@DynamicInsert
//@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class EndDayInfoRes {

    private EndDateRes endDate;
    private Long daysLeft = null;
    private Long currentDays = null;

    @Builder
    public EndDayInfoRes(LocalDateTime startDate, LocalDateTime endDate) {
        this.endDate = EndDateRes.builder().endDate(endDate).build();
        LocalDateTime today = LocalDateTime.now().plusHours(9L);
        this.daysLeft = ChronoUnit.DAYS.between(today.toLocalDate(), endDate.toLocalDate()) + 1;
        this.currentDays = ChronoUnit.DAYS.between(startDate.toLocalDate(), today.toLocalDate()) + 1;
    }

    @Builder(builderMethodName = "noRoom", builderClassName = "NoRoom")
    public EndDayInfoRes() {
        this.endDate = EndDateRes.noEndDate().build();
        this.daysLeft = this.currentDays = null;
    }
}
