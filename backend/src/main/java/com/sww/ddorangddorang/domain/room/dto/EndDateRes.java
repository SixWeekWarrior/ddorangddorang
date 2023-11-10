package com.sww.ddorangddorang.domain.room.dto;

import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class EndDateRes {

    private Integer year;
    private Integer month;
    private Integer date;

    @Builder
    public EndDateRes(LocalDateTime endDate) {
        this.year = endDate.getYear();
        this.month = endDate.getMonth().getValue();
        this.date = endDate.getDayOfMonth();
    }

}
