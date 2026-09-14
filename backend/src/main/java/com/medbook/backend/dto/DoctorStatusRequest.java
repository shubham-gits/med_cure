package com.medbook.backend.dto;

import lombok.Data;

@Data
public class DoctorStatusRequest {
    private String status; // "approved" | "rejected" | "pending_approval" | etc.
}
