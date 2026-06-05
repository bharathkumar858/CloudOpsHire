package com.cloudopshire.application.dto;

import com.cloudopshire.application.entity.ApplicationStatus;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationResponse {
    private Long id;
    private Long jobId;
    private Long candidateId;
    private Long recruiterId;
    private String candidateName;
    private String candidateEmail;
    private String jobTitle;
    private String company;
    private String coverLetter;
    private String resumeFileName;
    private Integer atsScore;
    private ApplicationStatus status;
    private LocalDateTime appliedAt;
    private LocalDateTime updatedAt;
}
