package com.medbook.backend.dto;

import com.medbook.backend.model.Doctor;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

// Mirrors the Node.js backend's publicUser()/publicDoctor() helpers — strips
// passwordHash before anything is sent to a client.
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DoctorPublicDto {
    private String id;
    private String name;
    private String email;
    private String role = "doctor";
    private String specialty;
    private String experience;
    private String license;
    private String phone;
    private Double fee;
    private String avatar;
    private Double rating;
    private String status;
    private String bio;
    private String city;
    private String clinic;
    private String clinicAddress;
    private String landmark;
    private String mapsUrl;
    private String clinicStatus;
    private List<String> available;
    private List<String> slots;

    public static DoctorPublicDto from(Doctor d) {
        DoctorPublicDto dto = new DoctorPublicDto();
        dto.setId(d.getId());
        dto.setName(d.getName());
        dto.setEmail(d.getEmail());
        dto.setRole("doctor");
        dto.setSpecialty(d.getSpecialty());
        dto.setExperience(d.getExperience());
        dto.setLicense(d.getLicense());
        dto.setPhone(d.getPhone());
        dto.setFee(d.getFee());
        dto.setAvatar(d.getAvatar());
        dto.setRating(d.getRating());
        dto.setStatus(d.getStatus());
        dto.setBio(d.getBio());
        dto.setCity(d.getCity());
        dto.setClinic(d.getClinic());
        dto.setClinicAddress(d.getClinicAddress());
        dto.setLandmark(d.getLandmark());
        dto.setMapsUrl(d.getMapsUrl());
        dto.setClinicStatus(d.getClinicStatus());
        dto.setAvailable(d.getAvailable());
        dto.setSlots(d.getSlots());
        return dto;
    }
}
