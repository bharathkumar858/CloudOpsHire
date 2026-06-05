package com.cloudopshire.notification.dto;

import lombok.Data;

@Data
public class ApplicationEvent {
    private Long applicationId;
    private String candidateEmail;
    private String candidateName;
    private String jobTitle;
    private String companyName;
    private String newStatus;
    private String oldStatus;
}