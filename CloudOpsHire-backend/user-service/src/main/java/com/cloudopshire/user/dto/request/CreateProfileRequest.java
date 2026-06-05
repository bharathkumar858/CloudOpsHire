package com.cloudopshire.user.dto.request;

import com.cloudopshire.user.entity.UserProfile;
import jakarta.validation.constraints.*;
import lombok.Data;
import java.util.List;

@Data
public class CreateProfileRequest {
    @NotNull  private Long authUserId;
    @NotBlank @Email private String email;
    @NotBlank private String firstName;
    @NotBlank private String lastName;
    @NotNull  private UserProfile.Role role;
    private String phone, location, linkedinUrl, headline, summary;
    private Integer yearsOfExperience;
    private List<String> skills;
    private String companyName, companyWebsite, industry;
}