package com.cloudopshire.job.controller;

import com.cloudopshire.job.dto.*;
import com.cloudopshire.job.entity.*;
import com.cloudopshire.job.service.JobService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@RequiredArgsConstructor
public class JobController {
    private final JobService jobService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<JobResponse>>> searchJobs(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) JobType jobType,
            @RequestParam(required = false) ExperienceLevel experienceLevel,
            @RequestParam(defaultValue = "false") boolean remoteOnly) {
        return ResponseEntity.ok(ApiResponse.success(
            jobService.search(search, location, jobType, experienceLevel, remoteOnly),
            "Jobs fetched successfully"
        ));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<JobResponse>> getJob(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(jobService.getById(id), "Job fetched successfully"));
    }

    @GetMapping("/recruiter/{recruiterId}")
    public ResponseEntity<ApiResponse<List<JobResponse>>> getRecruiterJobs(@PathVariable Long recruiterId) {
        return ResponseEntity.ok(ApiResponse.success(
            jobService.getByRecruiter(recruiterId),
            "Recruiter jobs fetched successfully"
        ));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<JobResponse>> createJob(@Valid @RequestBody JobRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(ApiResponse.success(jobService.create(request), "Job created successfully"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<JobResponse>> updateJob(
            @PathVariable Long id,
            @Valid @RequestBody JobRequest request) {
        return ResponseEntity.ok(ApiResponse.success(jobService.update(id, request), "Job updated successfully"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteJob(@PathVariable Long id) {
        jobService.delete(id);
        return ResponseEntity.ok(ApiResponse.success(null, "Job closed successfully"));
    }
}
