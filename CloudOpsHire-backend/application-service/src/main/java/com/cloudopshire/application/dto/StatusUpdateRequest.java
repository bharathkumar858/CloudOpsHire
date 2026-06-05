package com.cloudopshire.application.dto;

import com.cloudopshire.application.entity.ApplicationStatus;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StatusUpdateRequest {
    @NotNull
    private ApplicationStatus status;
}
