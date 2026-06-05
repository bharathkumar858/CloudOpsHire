package com.cloudopshire.analytics.dto;

import lombok.*;
import java.util.List;
import java.util.Map;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class PlatformStatsResponse {
    private long totalUsers, totalJobs, totalApplications, activeJobs;
    private long totalCandidates, totalRecruiters;
    private double avgAtsScore;
    private List<Map<String, Object>> monthlyData;
    private List<Map<String, Object>> topSkills;
    private Map<String, Long> applicationsByStatus;
    private Map<String, Long> jobsByType;
}