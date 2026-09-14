package com.medbook.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "patients")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Patient {

    @Id
    private String id;

    private String name;

    @Column(unique = true)
    private String email;

    // Never exposed in API responses — see PatientPublicDto.
    private String passwordHash;

    private String phone;
    private Integer age;
    private String gender;
    private String registeredAt;
}
