package com.sww.ddorangddorang.domain.participant.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

@DynamicInsert
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "nickname_prefix")
@Entity
public class Prefix {

    @Id
    private Long id;

    private String adjective;

}
