package com.sww.ddorangddorang.domain.room.dto;

import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

@Getter
@DynamicInsert
//@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class EndDateRes {

    private Integer year = null;
    private Integer month = null;
    private Integer date = null;

    @Builder
    public EndDateRes(LocalDateTime endDate) {
        this.year = endDate.getYear();
        this.month = endDate.getMonth().getValue();
        this.date = endDate.getDayOfMonth();
    }

    @Builder(builderMethodName = "noEndDate", builderClassName = "NoEndDate")
    public EndDateRes() {
        this.year=this.month=this.date=null;
    }
}
