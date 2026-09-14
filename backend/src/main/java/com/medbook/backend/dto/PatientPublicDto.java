package com.medbook.backend.dto;

import com.medbook.backend.model.Patient;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PatientPublicDto {
    private String id;
    private String name;
    private String email;
    private String role = "patient";
    private String phone;
    private Integer age;
    private String gender;
    private String registeredAt;

    public static PatientPublicDto from(Patient p) {
        return new PatientPublicDto(
                p.getId(), p.getName(), p.getEmail(), "patient", p.getPhone(),
                p.getAge(), p.getGender(), p.getRegisteredAt()
        );
    }
}
