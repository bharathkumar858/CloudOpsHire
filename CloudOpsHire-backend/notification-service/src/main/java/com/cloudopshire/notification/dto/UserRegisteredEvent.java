package com.cloudopshire.notification.dto;

import lombok.Data;

@Data
public class UserRegisteredEvent {
    private Long userId;
    private String email;
    private String firstName;
    private String role;
}