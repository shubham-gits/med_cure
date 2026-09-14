package com.medbook.backend.controller;

import com.medbook.backend.dto.PatientPublicDto;
import com.medbook.backend.exception.ApiException;
import com.medbook.backend.repository.PatientRepository;
import com.medbook.backend.security.AuthUtil;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/patients")
public class PatientController {

    private final PatientRepository patientRepository;

    public PatientController(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    // Admin-only: full patient directory.
    @GetMapping
    public List<PatientPublicDto> listPatients() {
        if (!"admin".equals(AuthUtil.currentRole())) {
            throw new ApiException(HttpStatus.FORBIDDEN, "You don't have permission to do that.");
        }
        return patientRepository.findAll().stream().map(PatientPublicDto::from).toList();
    }
}
