package com.cloudopshire.auth.service;

import com.cloudopshire.auth.dto.request.*;
import com.cloudopshire.auth.dto.response.AuthResponse;
import com.cloudopshire.auth.entity.*;
import com.cloudopshire.auth.exception.AuthException;
import com.cloudopshire.auth.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class AuthService {

    private final UserRepository userRepository;
    private final RefreshTokenRepository tokenRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    public AuthResponse register(RegisterRequest req) {
        if (userRepository.existsByEmail(req.getEmail()))
            throw new AuthException("Email already registered");

        User user = User.builder()
            .email(req.getEmail().toLowerCase())
            .passwordHash(passwordEncoder.encode(req.getPassword()))
            .firstName(req.getFirstName())
            .lastName(req.getLastName())
            .role(req.getRole())
            .isActive(true)
            .isEmailVerified(false)
            .build();

        userRepository.save(user);
        log.info("User registered: {}", user.getEmail());
        return buildResponse(user);
    }

    public AuthResponse login(LoginRequest req) {
        User user = userRepository.findByEmail(req.getEmail().toLowerCase())
            .orElseThrow(() -> new AuthException("Invalid email or password"));

        if (!passwordEncoder.matches(req.getPassword(), user.getPasswordHash()))
            throw new AuthException("Invalid email or password");

        if (!user.isActive())
            throw new AuthException("Account deactivated");

        return buildResponse(user);
    }

    public AuthResponse refreshToken(String refreshToken) {
        RefreshToken stored = tokenRepository.findByToken(refreshToken)
            .orElseThrow(() -> new AuthException("Invalid refresh token"));

        if (stored.isRevoked() || stored.getExpiresAt().isBefore(LocalDateTime.now()))
            throw new AuthException("Refresh token expired");

        User user = userRepository.findById(stored.getUserId())
            .orElseThrow(() -> new AuthException("User not found"));

        stored.setRevoked(true);
        tokenRepository.save(stored);
        return buildResponse(user);
    }

    public void logout(String refreshToken) {
        tokenRepository.findByToken(refreshToken).ifPresent(t -> {
            t.setRevoked(true);
            tokenRepository.save(t);
        });
    }

    private AuthResponse buildResponse(User user) {
        String access = jwtService.generateAccessToken(user);
        String refresh = jwtService.generateRefreshToken(user);

        tokenRepository.save(RefreshToken.builder()
            .userId(user.getId())
            .token(refresh)
            .expiresAt(LocalDateTime.now().plusDays(7))
            .revoked(false)
            .build());

        return AuthResponse.builder()
            .accessToken(access).refreshToken(refresh)
            .tokenType("Bearer")
            .expiresIn(jwtService.getAccessExpirationSeconds())
            .userId(user.getId()).email(user.getEmail())
            .role(user.getRole().name())
            .firstName(user.getFirstName()).lastName(user.getLastName())
            .build();
    }
}