package com.sww.ddorangddorang.domain.user.entity;

import com.sww.ddorangddorang.global.config.BCryptConfig;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import java.time.LocalDateTime;
import java.util.Set;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class User {
    @Id
    @GeneratedValue
    private Long id;                    // BIGINT

    private String name;                // VARCHAR(255) "유저 이름"
    private String email;               // VARCHAR(255) "유저 이메일"
    private String providerType;        // VARCHAR(255) "소셜 로그인 타입 -GOOGLE, KAKAO" - for OAuth2
    private String providerId;          // VARCHAR(255) "소셜 로그인 식별자 값"            - for OAuth2
    private String password;            // VARCHAR(255)                                 - for security
    private String role;                // VARCHAR(255)                                 - for security
    private String refreshToken;        // VARCHAR(255) "리프레시 토큰"                   - for jwt
    private Integer generation;         // INT
    private Byte isMajor;               // TINYINT
    private Byte gender;                // TINYINT
    private Integer campus;             // INT
    private Integer classes;            // INT
    private Integer floor;              // INT
    private String profileImage;        // TEXT "프로필 이미지"
    private String like;                // VARCHAR(255)
    private String hate;                // VARCHAR(255)
    private String mbti;                // VARCHAR(255)
    private String worry;               // TEXT
    private Integer reportCount;        // INT
    private Long participate;           // BIGINT - FK(ROOM)
    private Long status;                // BIGINT - FK(MASTER_CODE)
    private LocalDateTime deletedAt;    // TIMESTAMP

    @Builder
     public User(String name, String email, String paassword, String role) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
     }
     
    // 유저 권한 설정 메소드
    public void authorizeUser() {
        this.role = "ROLE_USER";
    }

    // 비밀번호 암호화 메소드
    public void passwordEncode(BCryptPasswordEncoder bCrypt) {
        this.password = bCrypt.encode(this.password);
    }

    public void updateRefreshToken(String updateRefreshToken) {
        this.refreshToken = updateRefreshToken;
    }
}
