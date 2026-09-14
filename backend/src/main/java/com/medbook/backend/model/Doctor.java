package com.medbook.backend.model;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "doctors")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Doctor {

    @Id
    private String id;

    private String name;

    @Column(unique = true)
    private String email;

    // Never exposed in API responses — see DoctorPublicDto.
    private String passwordHash;

    private String specialty;
    private String experience;
    private String license;
    private String phone;
    private Double fee;
    private String avatar;
    private Double rating;

    // approved | pending_approval | rejected
    private String status;

    private String bio;
    private String city;
    private String clinic;
    private String clinicAddress;
    private String landmark;
    private String mapsUrl;

    // in_clinic | in_surgery | emergency_call | clinic_closed
    private String clinicStatus;



    @ElementCollection(fetch = jakarta.persistence.FetchType.EAGER)
    @CollectionTable(name = "doctor_available_days", joinColumns = @jakarta.persistence.JoinColumn(name = "doctor_id"))
    @Column(name = "available_day")
    private List<String> available = new ArrayList<>();

    @ElementCollection(fetch = jakarta.persistence.FetchType.EAGER)
    @CollectionTable(name = "doctor_slots", joinColumns = @jakarta.persistence.JoinColumn(name = "doctor_id"))
    @Column(name = "slot")
    private List<String> slots = new ArrayList<>();

    private String appliedAt;
}
