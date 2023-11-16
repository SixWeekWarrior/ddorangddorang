package com.sww.ddorangddorang.auth.dto;

import com.sww.ddorangddorang.domain.user.entity.User;
import java.util.Arrays;
import java.util.Collection;
import lombok.Builder;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Getter
public class AuthenticatedUser implements UserDetails {
    private Long id;
    private String providerType;
    private String email;
    private String role;

    @Builder
    public AuthenticatedUser(Long id, String providerType, String email, String role) {
        this.id = id;
        this.providerType = providerType;
        this.email = email;
        this.role = role;
    }

    public static AuthenticatedUser authenticate(User user) {
        return AuthenticatedUser.builder()
            .id(user.getId())
            .providerType(user.getProviderType())
            .email(user.getEmail())
            .role(user.getRole())
            .build();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Arrays.asList(new SimpleGrantedAuthority(role));
    }

    @Override
    public String getPassword() {
        return null;
    }

    @Override
    public String getUsername() {
        return id.toString();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
