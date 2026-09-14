package com.medbook.backend.controller;

import com.medbook.backend.dto.DoctorPublicDto;
import com.medbook.backend.dto.DoctorStatusRequest;
import com.medbook.backend.dto.UpdateDoctorProfileRequest;
import com.medbook.backend.exception.ApiException;
import com.medbook.backend.model.Doctor;
import com.medbook.backend.repository.DoctorRepository;
import com.medbook.backend.security.AuthUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctors")
public class DoctorController {

    private final DoctorRepository doctorRepository;

    public DoctorController(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }

    // Public: list all doctors (no auth required, mirrors the Node backend).
    @GetMapping
    public List<DoctorPublicDto> listDoctors() {
        return doctorRepository.findAll().stream().map(DoctorPublicDto::from).toList();
    }

    // Admin only: approve / reject / suspend a doctor.
    @PatchMapping("/{id}/status")
    public List<DoctorPublicDto> updateStatus(@PathVariable String id, @RequestBody DoctorStatusRequest req) {
        if (!"admin".equals(AuthUtil.currentRole())) {
            throw new ApiException(HttpStatus.FORBIDDEN, "You don't have permission to do that.");
        }
        if (req.getStatus() == null) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "status is required.");
        }

        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Doctor not found."));
        doctor.setStatus(req.getStatus());
        doctorRepository.save(doctor);

        return doctorRepository.findAll().stream().map(DoctorPublicDto::from).toList();
    }

    // Doctor updates their own profile/schedule (or admin, for support purposes).
    @PatchMapping("/{id}")
    public DoctorPublicDto updateProfile(@PathVariable String id, @RequestBody UpdateDoctorProfileRequest req) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Doctor not found."));

        String role = AuthUtil.currentRole();
        String callerId = AuthUtil.currentUserId();
        boolean isSelf = "doctor".equals(role) && doctor.getId().equals(callerId);
        boolean isAdmin = "admin".equals(role);

        if (!isSelf && !isAdmin) {
            throw new ApiException(HttpStatus.FORBIDDEN, "You can only update your own profile.");
        }

        if (req.getFee() != null) doctor.setFee(req.getFee());
        if (req.getAvailable() != null) doctor.setAvailable(req.getAvailable());
        if (req.getSlots() != null) doctor.setSlots(req.getSlots());
        if (req.getClinic() != null) doctor.setClinic(req.getClinic());
        if (req.getCity() != null) doctor.setCity(req.getCity());
        if (req.getClinicAddress() != null) doctor.setClinicAddress(req.getClinicAddress());
        if (req.getLandmark() != null) doctor.setLandmark(req.getLandmark());
        if (req.getMapsUrl() != null) doctor.setMapsUrl(req.getMapsUrl());
        if (req.getClinicStatus() != null) doctor.setClinicStatus(req.getClinicStatus());
        if (req.getBio() != null) doctor.setBio(req.getBio());

        doctorRepository.save(doctor);
        return DoctorPublicDto.from(doctor);
    }
}
