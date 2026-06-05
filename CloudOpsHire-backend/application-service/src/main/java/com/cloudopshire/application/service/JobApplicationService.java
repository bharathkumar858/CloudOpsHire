package com.cloudopshire.application.service;

import com.cloudopshire.application.dto.*;
import com.cloudopshire.application.entity.*;
import com.cloudopshire.application.repository.JobApplicationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class JobApplicationService {
    private final JobApplicationRepository repository;

    public ApplicationResponse apply(ApplicationRequest request) {
        repository.findByJobIdAndCandidateId(request.getJobId(), request.getCandidateId())
            .ifPresent(existing -> {
                throw new IllegalArgumentException("You already applied for this job");
            });

        JobApplication application = JobApplication.builder()
            .jobId(request.getJobId())
            .candidateId(request.getCandidateId())
            .recruiterId(request.getRecruiterId())
            .candidateName(request.getCandidateName())
            .candidateEmail(request.getCandidateEmail())
            .jobTitle(request.getJobTitle())
            .company(request.getCompany())
            .coverLetter(request.getCoverLetter())
            .resumeFileName(request.getResumeFileName())
            .atsScore(calculateAtsScore(request))
            .status(ApplicationStatus.APPLIED)
            .build();

        return toResponse(repository.save(application));
    }

    @Transactional(readOnly = true)
    public List<ApplicationResponse> getCandidateApplications(Long candidateId) {
        return repository.findByCandidateIdOrderByAppliedAtDesc(candidateId)
            .stream()
            .map(this::toResponse)
            .toList();
    }

    @Transactional(readOnly = true)
    public List<ApplicationResponse> getRecruiterApplications(Long recruiterId) {
        return repository.findByRecruiterIdOrderByAppliedAtDesc(recruiterId)
            .stream()
            .map(this::toResponse)
            .toList();
    }

    public ApplicationResponse updateStatus(Long id, ApplicationStatus status) {
        JobApplication application = repository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Application not found"));
        application.setStatus(status);
        return toResponse(repository.save(application));
    }

    private int calculateAtsScore(ApplicationRequest request) {
        int score = 70;
        if (request.getCoverLetter() != null && request.getCoverLetter().length() > 80) {
            score += 10;
        }
        if (request.getResumeFileName() != null && request.getResumeFileName().toLowerCase().endsWith(".pdf")) {
            score += 8;
        }
        if (request.getJobTitle() != null && !request.getJobTitle().isBlank()) {
            score += 5;
        }
        return Math.min(score, 95);
    }

    private ApplicationResponse toResponse(JobApplication application) {
        return ApplicationResponse.builder()
            .id(application.getId())
            .jobId(application.getJobId())
            .candidateId(application.getCandidateId())
            .recruiterId(application.getRecruiterId())
            .candidateName(application.getCandidateName())
            .candidateEmail(application.getCandidateEmail())
            .jobTitle(application.getJobTitle())
            .company(application.getCompany())
            .coverLetter(application.getCoverLetter())
            .resumeFileName(application.getResumeFileName())
            .atsScore(application.getAtsScore())
            .status(application.getStatus())
            .appliedAt(application.getAppliedAt())
            .updatedAt(application.getUpdatedAt())
            .build();
    }
}
