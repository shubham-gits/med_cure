package com.medbook.backend.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String role;   // "admin" | "doctor" | "patient"
    private String email;
    private String password;
}
