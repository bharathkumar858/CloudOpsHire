package com.cloudopshire.job.service;

import com.cloudopshire.job.dto.*;
import com.cloudopshire.job.entity.*;
import com.cloudopshire.job.repository.JobRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class JobService {
    private final JobRepository jobRepository;

    @Transactional(readOnly = true)
    public List<JobResponse> search(String search, String location, JobType jobType,
                                    ExperienceLevel experienceLevel, boolean remoteOnly) {
        return jobRepository.searchJobs(JobStatus.ACTIVE, jobType, experienceLevel,
                remoteOnly, blankToNull(location), blankToNull(search))
            .stream()
            .map(this::toResponse)
            .toList();
    }

    @Transactional(readOnly = true)
    public JobResponse getById(Long id) {
        return jobRepository.findById(id)
            .map(this::toResponse)
            .orElseThrow(() -> new IllegalArgumentException("Job not found"));
    }

    @Transactional(readOnly = true)
    public List<JobResponse> getByRecruiter(Long recruiterId) {
        return jobRepository.findByRecruiterIdOrderByCreatedAtDesc(recruiterId)
            .stream()
            .map(this::toResponse)
            .toList();
    }

    public JobResponse create(JobRequest request) {
        Job job = Job.builder().build();
        copyRequest(job, request);
        return toResponse(jobRepository.save(job));
    }

    public JobResponse update(Long id, JobRequest request) {
        Job job = jobRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Job not found"));
        copyRequest(job, request);
        return toResponse(jobRepository.save(job));
    }

    public void delete(Long id) {
        Job job = jobRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Job not found"));
        job.setStatus(JobStatus.CLOSED);
        jobRepository.save(job);
    }

    private void copyRequest(Job job, JobRequest request) {
        job.setTitle(request.getTitle());
        job.setCompany(request.getCompany());
        job.setLocation(request.getLocation());
        job.setJobType(request.getJobType());
        job.setExperienceLevel(request.getExperienceLevel());
        job.setSalaryMin(request.getSalaryMin());
        job.setSalaryMax(request.getSalaryMax());
        job.setRemote(Boolean.TRUE.equals(request.getIsRemote()));
        job.setSkills(request.getSkills() == null ? List.of() : request.getSkills());
        job.setDescription(request.getDescription());
        job.setRequirements(request.getRequirements() == null ? List.of() : request.getRequirements());
        job.setApplicationDeadline(request.getApplicationDeadline());
        job.setRecruiterId(request.getRecruiterId());
        job.setStatus(request.getStatus() == null ? JobStatus.ACTIVE : request.getStatus());
    }

    private JobResponse toResponse(Job job) {
        return JobResponse.builder()
            .id(String.valueOf(job.getId()))
            .title(job.getTitle())
            .company(job.getCompany())
            .location(job.getLocation())
            .jobType(job.getJobType())
            .experienceLevel(job.getExperienceLevel())
            .salaryMin(job.getSalaryMin())
            .salaryMax(job.getSalaryMax())
            .isRemote(job.isRemote())
            .skills(job.getSkills())
            .description(job.getDescription())
            .requirements(job.getRequirements())
            .applicationDeadline(job.getApplicationDeadline())
            .status(job.getStatus())
            .recruiterId(job.getRecruiterId())
            .createdAt(job.getCreatedAt())
            .updatedAt(job.getUpdatedAt())
            .build();
    }

    private String blankToNull(String value) {
        return value == null || value.isBlank() ? null : value;
    }
}
