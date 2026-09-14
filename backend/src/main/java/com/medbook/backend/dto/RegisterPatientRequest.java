package com.medbook.backend.dto;

import lombok.Data;

@Data
public class RegisterPatientRequest {
    private String name;
    private String email;
    private String password;
    private String phone;
    private Integer age;
    private String gender;
}
