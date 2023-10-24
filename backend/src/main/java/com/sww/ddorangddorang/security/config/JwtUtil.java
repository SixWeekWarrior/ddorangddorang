package com.sww.ddorangddorang.security.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureAlgorithm;
import java.util.Date;

public class JwtUtil {
    public static String createToken(Long userId, long expireTime, String key) {
        Claims claims = Jwts.claims();
        claims.put("userId", userId);

        return Jwts.builder()
//            .signWith(Keys.hmacShaKeyFor(SignatureAlgorithm))
                .claims()
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expireTime))

                .compact();
    }

}
