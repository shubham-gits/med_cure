package com.medbook.backend.dto;

import lombok.Data;

import java.util.List;

@Data
public class UpdateDoctorProfileRequest {
    private Double fee;
    private List<String> available;
    private List<String> slots;
    private String clinic;
    private String city;
    private String clinicAddress;
    private String landmark;
    private String mapsUrl;
    private String clinicStatus;
    private String bio;
}
