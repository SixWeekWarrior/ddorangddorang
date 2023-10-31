package com.sww.ddorangddorang.global.util;

import com.sww.ddorangddorang.global.config.RedisConfig;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

@Slf4j
@RequiredArgsConstructor
@Component
public class RedisUtil {
    private final RedisConfig redisConfig;
    private final RedisTemplate<?, ?> redisTemplate;
    private final ListOperations<String, String> listOperations;
    private final String ACCESS_CODE = "accesscode";


    @Autowired
    public RedisUtil(RedisConfig redisConfig) {
        this.redisConfig = redisConfig;
        this.redisTemplate = redisConfig.redisTemplate();
        this.listOperations = (ListOperations<String, String>) redisTemplate.opsForList();
    }

    public Integer getAccessCode() {
        String accessCode = listOperations.leftPop(ACCESS_CODE);

        if(accessCode == null) {
            return -1;
        }

        return Integer.parseInt(accessCode);
    }

    public void putAccessCode(Integer accessCode) {
        listOperations.rightPush(ACCESS_CODE, accessCode.toString());
    }

    public Integer initAccessCode(Boolean[] accessCodeStatusList) {
        List<Integer> unusedAccessCodeList = new ArrayList<>();

        for(int i=0;i<10000;++i) {
            if(accessCodeStatusList[i] == null) {
                unusedAccessCodeList.add(i);
            }
        }

        Collections.shuffle(unusedAccessCodeList);

        for(Integer accessCode: unusedAccessCodeList) {
            putAccessCode(accessCode);
        }

        return getAccessCode();
    }
}
