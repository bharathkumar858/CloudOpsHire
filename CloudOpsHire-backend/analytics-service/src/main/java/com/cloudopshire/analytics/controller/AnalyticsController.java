package com.cloudopshire.analytics.controller;

import com.cloudopshire.analytics.dto.*;
import com.cloudopshire.analytics.service.AnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
public class AnalyticsController {

    private final AnalyticsService service;

    @GetMapping("/platform")
    public ResponseEntity<ApiResponse<PlatformStatsResponse>> stats() {
        return ResponseEntity.ok(
            ApiResponse.success(service.getPlatformStats(), "OK"));
    }
}