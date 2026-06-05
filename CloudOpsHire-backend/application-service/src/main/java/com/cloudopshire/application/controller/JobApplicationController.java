package com.cloudopshire.application.controller;

import com.cloudopshire.application.dto.*;
import com.cloudopshire.application.service.JobApplicationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@RequiredArgsConstructor
public class JobApplicationController {

    private final JobApplicationService service;

    @PostMapping
    public ResponseEntity<ApiResponse<ApplicationResponse>> apply(
            @RequestHeader("X-User-Id") String userId,
            @Valid @RequestBody ApplicationRequest request) {
        // Inject the candidateId from gateway header into the request
        request.setCandidateId(Long.parseLong(userId));
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(ApiResponse.success(
                service.apply(request),
                "Application submitted successfully"));
    }

    @GetMapping("/my")
    public ResponseEntity<ApiResponse<List<ApplicationResponse>>> getMyApplications(
            @RequestHeader("X-User-Id") String userId) {
        Long candidateId = Long.parseLong(userId);
        return ResponseEntity.ok(ApiResponse.success(
            service.getCandidateApplications(candidateId),
            "Applications fetched successfully"));
    }

    @GetMapping("/recruiter/{recruiterId}")
    public ResponseEntity<ApiResponse<List<ApplicationResponse>>> getRecruiterApplications(
            @PathVariable Long recruiterId) {
        return ResponseEntity.ok(ApiResponse.success(
            service.getRecruiterApplications(recruiterId),
            "Recruiter applications fetched successfully"));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ApiResponse<ApplicationResponse>> updateStatus(
            @PathVariable Long id,
            @Valid @RequestBody StatusUpdateRequest request) {
        return ResponseEntity.ok(ApiResponse.success(
            service.updateStatus(id, request.getStatus()),
            "Application status updated successfully"));
    }
}