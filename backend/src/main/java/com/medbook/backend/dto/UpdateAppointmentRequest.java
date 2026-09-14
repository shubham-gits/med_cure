package com.medbook.backend.dto;

import lombok.Data;

@Data
public class UpdateAppointmentRequest {
    private String status;
    private String diagnosis;
    private String notes;
    private String prescription;
    private String completedAt;
}
