package com.cloudopshire.user.dto.response;

import com.cloudopshire.user.entity.UserProfile;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class UserProfileResponse {
    private Long id, authUserId;
    private String email, firstName, lastName;
    private UserProfile.Role role;
    private String phone, location, linkedinUrl, headline, summary;
    private Integer yearsOfExperience;
    private List<String> skills;
    private String companyName, companyWebsite, industry;
    private LocalDateTime createdAt, updatedAt;
}