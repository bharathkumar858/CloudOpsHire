package com.cloudopshire.job.dto;

import com.cloudopshire.job.entity.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class JobRequest {
    @NotBlank
    private String title;

    @NotBlank
    private String company;

    @NotBlank
    private String location;

    @NotNull
    private JobType jobType;

    @NotNull
    private ExperienceLevel experienceLevel;

    private Integer salaryMin;
    private Integer salaryMax;
    private Boolean isRemote;
    private List<String> skills;
    private String description;
    private List<String> requirements;
    private LocalDate applicationDeadline;
    private Long recruiterId;
    private JobStatus status;
}
