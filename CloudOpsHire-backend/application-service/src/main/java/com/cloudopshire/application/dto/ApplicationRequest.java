package com.cloudopshire.application.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationRequest {
    @NotNull
    private Long jobId;

    @NotNull
    private Long candidateId;

    private Long recruiterId;
    private String candidateName;
    private String candidateEmail;
    private String jobTitle;
    private String company;
    private String coverLetter;
    private String resumeFileName;
}
