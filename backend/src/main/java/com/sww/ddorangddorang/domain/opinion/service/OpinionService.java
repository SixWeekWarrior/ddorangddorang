package com.sww.ddorangddorang.domain.opinion.service;

import com.sww.ddorangddorang.auth.dto.CustomOAuth2User;
import com.sww.ddorangddorang.domain.opinion.dto.OpinionCreateReq;

public interface OpinionService {

    void createOpinion(OpinionCreateReq opinionCreateReq, CustomOAuth2User customOAuth2User);

}
