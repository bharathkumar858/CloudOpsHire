package com.cloudopshire.job.repository;

import com.cloudopshire.job.entity.Job;
import com.cloudopshire.job.entity.ExperienceLevel;
import com.cloudopshire.job.entity.JobStatus;
import com.cloudopshire.job.entity.JobType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {

    @Query("""
        SELECT DISTINCT j FROM Job j
        LEFT JOIN j.skills s
        WHERE (:status IS NULL OR j.status = :status)
          AND (:jobType IS NULL OR j.jobType = :jobType)
          AND (:experienceLevel IS NULL OR j.experienceLevel = :experienceLevel)
          AND (:remoteOnly = false OR j.remote = true)
          AND (:location IS NULL
               OR LOWER(j.location) LIKE LOWER(CONCAT('%', :location, '%')))
          AND (:keyword IS NULL
               OR LOWER(j.title)   LIKE LOWER(CONCAT('%', :keyword, '%'))
               OR LOWER(j.company) LIKE LOWER(CONCAT('%', :keyword, '%'))
               OR LOWER(s)         LIKE LOWER(CONCAT('%', :keyword, '%')))
        ORDER BY j.createdAt DESC
        """)
    List<Job> searchJobs(
            @Param("status")          JobStatus status,
            @Param("jobType")         JobType jobType,
            @Param("experienceLevel") ExperienceLevel experienceLevel,
            @Param("remoteOnly")      boolean remoteOnly,
            @Param("location")        String location,
            @Param("keyword")         String keyword
    );

    List<Job> findByRecruiterIdOrderByCreatedAtDesc(Long recruiterId);
}
