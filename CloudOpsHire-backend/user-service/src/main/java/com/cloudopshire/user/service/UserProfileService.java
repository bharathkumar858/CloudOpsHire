package com.cloudopshire.user.service;

import com.cloudopshire.user.dto.request.*;
import com.cloudopshire.user.dto.response.UserProfileResponse;
import com.cloudopshire.user.entity.UserProfile;
import com.cloudopshire.user.exception.ResourceNotFoundException;
import com.cloudopshire.user.repository.UserProfileRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service @RequiredArgsConstructor @Slf4j @Transactional
public class UserProfileService {

    private final UserProfileRepository repo;

    public UserProfileResponse createProfile(CreateProfileRequest req) {
        if (repo.existsByAuthUserId(req.getAuthUserId()))
            return getByAuthUserId(req.getAuthUserId());

        UserProfile p = UserProfile.builder()
            .authUserId(req.getAuthUserId()).email(req.getEmail())
            .firstName(req.getFirstName()).lastName(req.getLastName())
            .role(req.getRole()).phone(req.getPhone())
            .location(req.getLocation()).linkedinUrl(req.getLinkedinUrl())
            .headline(req.getHeadline()).summary(req.getSummary())
            .yearsOfExperience(req.getYearsOfExperience())
            .skills(req.getSkills()).companyName(req.getCompanyName())
            .companyWebsite(req.getCompanyWebsite()).industry(req.getIndustry())
            .build();

        log.info("Creating profile for: {}", req.getEmail());
        return toResponse(repo.save(p));
    }

    @Transactional(readOnly = true)
    public UserProfileResponse getByAuthUserId(Long authUserId) {
        return toResponse(repo.findByAuthUserId(authUserId)
            .orElseThrow(() ->
                new ResourceNotFoundException("Profile not found: " + authUserId)));
    }

    public UserProfileResponse updateProfile(Long authUserId, UpdateProfileRequest req) {
        UserProfile p = repo.findByAuthUserId(authUserId)
            .orElseThrow(() -> new ResourceNotFoundException("Profile not found"));

        if (req.getPhone()             != null) p.setPhone(req.getPhone());
        if (req.getLocation()          != null) p.setLocation(req.getLocation());
        if (req.getLinkedinUrl()       != null) p.setLinkedinUrl(req.getLinkedinUrl());
        if (req.getHeadline()          != null) p.setHeadline(req.getHeadline());
        if (req.getSummary()           != null) p.setSummary(req.getSummary());
        if (req.getYearsOfExperience() != null) p.setYearsOfExperience(req.getYearsOfExperience());
        if (req.getSkills()            != null) p.setSkills(req.getSkills());
        if (req.getCompanyName()       != null) p.setCompanyName(req.getCompanyName());
        if (req.getCompanyWebsite()    != null) p.setCompanyWebsite(req.getCompanyWebsite());
        if (req.getIndustry()          != null) p.setIndustry(req.getIndustry());

        return toResponse(repo.save(p));
    }

    private UserProfileResponse toResponse(UserProfile p) {
        return UserProfileResponse.builder()
            .id(p.getId()).authUserId(p.getAuthUserId()).email(p.getEmail())
            .firstName(p.getFirstName()).lastName(p.getLastName()).role(p.getRole())
            .phone(p.getPhone()).location(p.getLocation()).linkedinUrl(p.getLinkedinUrl())
            .headline(p.getHeadline()).summary(p.getSummary())
            .yearsOfExperience(p.getYearsOfExperience()).skills(p.getSkills())
            .companyName(p.getCompanyName()).companyWebsite(p.getCompanyWebsite())
            .industry(p.getIndustry()).createdAt(p.getCreatedAt()).updatedAt(p.getUpdatedAt())
            .build();
    }
}