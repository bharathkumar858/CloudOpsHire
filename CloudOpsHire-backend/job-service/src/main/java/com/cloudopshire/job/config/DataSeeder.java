package com.cloudopshire.job.config;

import com.cloudopshire.job.entity.*;
import com.cloudopshire.job.repository.JobRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.util.List;

@Configuration
@RequiredArgsConstructor
public class DataSeeder {
    private final JobRepository jobRepository;

    @Bean
    CommandLineRunner seedJobs() {
        return args -> {
            if (jobRepository.count() > 0) {
                return;
            }

            jobRepository.saveAll(List.of(
                Job.builder()
                    .title("Senior Java Developer")
                    .company("TechCorp India")
                    .location("Hyderabad")
                    .jobType(JobType.FULL_TIME)
                    .experienceLevel(ExperienceLevel.SENIOR)
                    .salaryMin(1200000)
                    .salaryMax(2000000)
                    .remote(false)
                    .skills(List.of("Java 17", "Spring Boot", "Microservices", "PostgreSQL", "Docker", "Redis"))
                    .description("Design and build scalable backend microservices for an enterprise hiring platform.")
                    .requirements(List.of("5+ years Java experience", "Strong Spring Boot knowledge", "Microservices architecture experience"))
                    .applicationDeadline(LocalDate.of(2026, 6, 30))
                    .recruiterId(1L)
                    .build(),
                Job.builder()
                    .title("React Frontend Engineer")
                    .company("StartupXYZ")
                    .location("Bangalore")
                    .jobType(JobType.FULL_TIME)
                    .experienceLevel(ExperienceLevel.MID)
                    .salaryMin(800000)
                    .salaryMax(1400000)
                    .remote(true)
                    .skills(List.of("React", "TypeScript", "Tailwind CSS", "Redux", "REST APIs"))
                    .description("Build clean, fast, responsive React screens used by job seekers and recruiters.")
                    .requirements(List.of("3+ years React experience", "Tailwind CSS knowledge", "REST API integration experience"))
                    .applicationDeadline(LocalDate.of(2026, 6, 15))
                    .recruiterId(1L)
                    .build(),
                Job.builder()
                    .title("DevOps Engineer")
                    .company("CloudSystems")
                    .location("Remote")
                    .jobType(JobType.REMOTE)
                    .experienceLevel(ExperienceLevel.MID)
                    .salaryMin(1000000)
                    .salaryMax(1800000)
                    .remote(true)
                    .skills(List.of("AWS", "Docker", "Kubernetes", "Jenkins", "Terraform", "Linux"))
                    .description("Own cloud infrastructure, CI/CD pipelines, and deployment reliability.")
                    .requirements(List.of("3+ years DevOps experience", "AWS knowledge", "Docker and Kubernetes hands-on"))
                    .applicationDeadline(LocalDate.of(2026, 6, 20))
                    .recruiterId(2L)
                    .build()
            ));
        };
    }
}
