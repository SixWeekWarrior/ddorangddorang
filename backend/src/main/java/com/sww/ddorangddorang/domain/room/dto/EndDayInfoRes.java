package com.sww.ddorangddorang.domain.room.dto;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class EndDayInfoRes {

    private EndDateRes endDate;
    private Long daysLeft;
    private Long currentDays;

    @Builder
    public EndDayInfoRes(LocalDateTime startDate, LocalDateTime endDate) {
        this.endDate = EndDateRes.builder()
            .endDate(endDate).build();
        LocalDateTime today = LocalDateTime.now();
        this.daysLeft = ChronoUnit.DAYS.between(today, endDate) + 1;
        this.currentDays = ChronoUnit.DAYS.between(startDate, today) + 1;
    }


}
