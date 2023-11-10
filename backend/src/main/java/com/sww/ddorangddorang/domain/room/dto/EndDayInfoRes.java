package com.sww.ddorangddorang.domain.room.dto;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import lombok.Builder;
import lombok.Getter;

@Getter
//@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class EndDayInfoRes {

    private final EndDateRes endDate;
    private final Long daysLeft;
    private final Long currentDays;

    @Builder(builderMethodName = "participatingRoom", builderClassName = "ParticipatingRoom")
    public EndDayInfoRes(LocalDateTime startDate, LocalDateTime endDate) {
        this.endDate = EndDateRes.havingEndDate()
            .endDate(endDate).build();
        LocalDateTime today = LocalDateTime.now();
        this.daysLeft = ChronoUnit.DAYS.between(today, endDate) + 1;
        this.currentDays = ChronoUnit.DAYS.between(startDate, today) + 1;
    }

    @Builder(builderMethodName = "noRoom", builderClassName = "NoRoom")
    public EndDayInfoRes() {
        this.endDate = EndDateRes.noEndDate().build();
        this.daysLeft = this.currentDays = null;
    }
}
