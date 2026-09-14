package com.medbook.backend.dto;

import lombok.Data;

@Data
public class RegisterDoctorRequest {
    private String name;
    private String email;
    private String password;
    private String specialty;
    private String license;
    private String phone;
    private Double fee;
    private String city;
    private String clinic;
    private String clinicAddress;
}
