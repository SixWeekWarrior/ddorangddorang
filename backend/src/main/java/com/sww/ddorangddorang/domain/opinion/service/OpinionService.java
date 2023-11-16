package com.sww.ddorangddorang.domain.opinion.service;

import com.sww.ddorangddorang.domain.opinion.dto.OpinionCreateReq;

public interface OpinionService {

    void createOpinion(OpinionCreateReq opinionCreateReq, Long userId);

}
