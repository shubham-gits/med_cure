package com.medbook.backend.dto;

import lombok.Data;

@Data
public class CreateAppointmentRequest {
    private String doctorId;
    private String date;
    private String time;
    private String reason;
    private String notes;
    private String paymentMode;
}
