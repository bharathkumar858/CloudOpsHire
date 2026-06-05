package com.cloudopshire.analytics.service;

import com.cloudopshire.analytics.dto.PlatformStatsResponse;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class AnalyticsService {

    public PlatformStatsResponse getPlatformStats() {
        return PlatformStatsResponse.builder()
            .totalUsers(1342).totalJobs(113)
            .totalApplications(3891).activeJobs(87)
            .totalCandidates(1253).totalRecruiters(89)
            .avgAtsScore(76.4)
            .monthlyData(buildMonthly())
            .topSkills(buildTopSkills())
            .applicationsByStatus(buildStatusMap())
            .jobsByType(buildJobTypeMap())
            .build();
    }

    private List<Map<String, Object>> buildMonthly() {
        List<Map<String, Object>> list = new ArrayList<>();
        String[] months = {"Jan","Feb","Mar","Apr","May"};
        int[] jobs = {12,18,24,31,28};
        int[] apps = {89,134,198,267,312};
        for (int i = 0; i < months.length; i++) {
            Map<String, Object> m = new LinkedHashMap<>();
            m.put("month", months[i]);
            m.put("jobs", jobs[i]);
            m.put("applications", apps[i]);
            list.add(m);
        }
        return list;
    }

    private List<Map<String, Object>> buildTopSkills() {
        List<Map<String, Object>> list = new ArrayList<>();
        Object[][] data = {{"Java",89},{"React",76},{"Python",71},
                           {"AWS",64},{"Docker",58},{"Kubernetes",43}};
        for (Object[] d : data) {
            Map<String, Object> m = new LinkedHashMap<>();
            m.put("skill", d[0]); m.put("count", d[1]); list.add(m);
        }
        return list;
    }

    private Map<String, Long> buildStatusMap() {
        Map<String, Long> m = new LinkedHashMap<>();
        m.put("APPLIED",1200L); m.put("UNDER_REVIEW",890L);
        m.put("SHORTLISTED",440L); m.put("INTERVIEW_SCHEDULED",210L);
        m.put("HIRED",89L); m.put("REJECTED",1062L);
        return m;
    }

    private Map<String, Long> buildJobTypeMap() {
        Map<String, Long> m = new LinkedHashMap<>();
        m.put("FULL_TIME",62L); m.put("REMOTE",21L);
        m.put("CONTRACT",10L); m.put("INTERNSHIP",7L);
        return m;
    }
}