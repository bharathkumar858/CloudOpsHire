package com.cloudopshire.user.dto.request;

import lombok.Data;
import java.util.List;

@Data
public class UpdateProfileRequest {
    private String phone, location, linkedinUrl, headline, summary;
    private Integer yearsOfExperience;
    private List<String> skills;
    private String companyName, companyWebsite, industry;
}