package com.cloudopshire.user.controller;

import com.cloudopshire.user.dto.request.*;
import com.cloudopshire.user.dto.response.*;
import com.cloudopshire.user.service.UserProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserProfileController {

    private final UserProfileService service;

    @PostMapping
    public ResponseEntity<ApiResponse<UserProfileResponse>> create(
            @Valid @RequestBody CreateProfileRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(ApiResponse.success(service.createProfile(req), "Profile created"));
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserProfileResponse>> getMe(
            @RequestHeader("X-User-Id") Long userId) {
        return ResponseEntity.ok(
            ApiResponse.success(service.getByAuthUserId(userId), "OK"));
    }

    @PutMapping("/me")
    public ResponseEntity<ApiResponse<UserProfileResponse>> update(
            @RequestHeader("X-User-Id") Long userId,
            @RequestBody UpdateProfileRequest req) {
        return ResponseEntity.ok(
            ApiResponse.success(service.updateProfile(userId, req), "Updated"));
    }
}