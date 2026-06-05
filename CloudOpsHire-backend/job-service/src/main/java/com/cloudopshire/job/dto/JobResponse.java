package com.cloudopshire.job.dto;

import com.cloudopshire.job.entity.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JobResponse {
    private String id;
    private String title;
    private String company;
    private String location;
    private JobType jobType;
    private ExperienceLevel experienceLevel;
    private Integer salaryMin;
    private Integer salaryMax;
    private boolean isRemote;
    private List<String> skills;
    private String description;
    private List<String> requirements;
    private LocalDate applicationDeadline;
    private JobStatus status;
    private Long recruiterId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
