package com.cloudopshire.application.repository;

import com.cloudopshire.application.entity.JobApplication;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.*;

public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {
    List<JobApplication> findByCandidateIdOrderByAppliedAtDesc(Long candidateId);
    List<JobApplication> findByRecruiterIdOrderByAppliedAtDesc(Long recruiterId);
    Optional<JobApplication> findByJobIdAndCandidateId(Long jobId, Long candidateId);
}
