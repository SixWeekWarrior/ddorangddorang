package com.sww.ddorangddorang.auth.service;

import com.sww.ddorangddorang.auth.dto.AuthenticatedUser;
import com.sww.ddorangddorang.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthenticatedUserService implements UserDetailsService {
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return AuthenticatedUser.authenticate(userRepository.getReferenceById(Long.parseLong(username)));
    }
}
