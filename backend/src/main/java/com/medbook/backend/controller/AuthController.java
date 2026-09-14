package com.medbook.backend.controller;

import com.medbook.backend.dto.*;
import com.medbook.backend.exception.ApiException;
import com.medbook.backend.model.Admin;
import com.medbook.backend.model.Doctor;
import com.medbook.backend.model.Patient;
import com.medbook.backend.repository.AdminRepository;
import com.medbook.backend.repository.DoctorRepository;
import com.medbook.backend.repository.PatientRepository;
import com.medbook.backend.security.AuthUtil;
import com.medbook.backend.security.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;
    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthController(DoctorRepository doctorRepository, PatientRepository patientRepository,
                           AdminRepository adminRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.doctorRepository = doctorRepository;
        this.patientRepository = patientRepository;
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest req) {
        if (req.getRole() == null || req.getEmail() == null || req.getPassword() == null) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "role, email and password are required.");
        }

        switch (req.getRole()) {
            case "admin" -> {
                Admin admin = adminRepository.findByEmail(req.getEmail())
                        .orElseThrow(() -> new ApiException(HttpStatus.UNAUTHORIZED, "Invalid admin credentials."));
                if (!passwordEncoder.matches(req.getPassword(), admin.getPasswordHash())) {
                    throw new ApiException(HttpStatus.UNAUTHORIZED, "Invalid admin credentials.");
                }
                String token = jwtUtil.generateToken(admin.getId(), "admin");
                return ResponseEntity.ok(new AuthResponse(token, AdminPublicDto.from(admin)));
            }
            case "doctor" -> {
                Doctor doc = doctorRepository.findByEmail(req.getEmail())
                        .orElseThrow(() -> new ApiException(HttpStatus.UNAUTHORIZED, "Invalid email or password."));
                if (!passwordEncoder.matches(req.getPassword(), doc.getPasswordHash())) {
                    throw new ApiException(HttpStatus.UNAUTHORIZED, "Invalid email or password.");
                }
                if ("pending_approval".equals(doc.getStatus())) {
                    throw new ApiException(HttpStatus.FORBIDDEN,
                            "Dr. " + doc.getName() + ", your registration is pending Admin review.", "pending_approval");
                }
                if ("rejected".equals(doc.getStatus())) {
                    throw new ApiException(HttpStatus.FORBIDDEN, "Your doctor application was not approved.");
                }
                String token = jwtUtil.generateToken(doc.getId(), "doctor");
                return ResponseEntity.ok(new AuthResponse(token, DoctorPublicDto.from(doc)));
            }
            case "patient" -> {
                Patient pat = patientRepository.findByEmail(req.getEmail())
                        .orElseThrow(() -> new ApiException(HttpStatus.UNAUTHORIZED, "Invalid email or password."));
                if (!passwordEncoder.matches(req.getPassword(), pat.getPasswordHash())) {
                    throw new ApiException(HttpStatus.UNAUTHORIZED, "Invalid email or password.");
                }
                String token = jwtUtil.generateToken(pat.getId(), "patient");
                return ResponseEntity.ok(new AuthResponse(token, PatientPublicDto.from(pat)));
            }
            default -> throw new ApiException(HttpStatus.BAD_REQUEST, "Unknown role.");
        }
    }

    @PostMapping("/register/patient")
    public ResponseEntity<AuthResponse> registerPatient(@RequestBody RegisterPatientRequest req) {
        if (isBlank(req.getName()) || isBlank(req.getEmail()) || isBlank(req.getPassword()) || isBlank(req.getPhone())) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Please fill in all required fields.");
        }
        if (patientRepository.existsByEmail(req.getEmail())) {
            throw new ApiException(HttpStatus.CONFLICT, "Email is already registered.");
        }

        Patient patient = new Patient();
        patient.setId("pat-" + UUID.randomUUID());
        patient.setName(req.getName());
        patient.setEmail(req.getEmail());
        patient.setPasswordHash(passwordEncoder.encode(req.getPassword()));
        patient.setPhone(req.getPhone());
        patient.setAge(req.getAge());
        patient.setGender(req.getGender());
        patient.setRegisteredAt(LocalDate.now().format(DateTimeFormatter.ISO_LOCAL_DATE));
        patientRepository.save(patient);

        String token = jwtUtil.generateToken(patient.getId(), "patient");
        return ResponseEntity.status(HttpStatus.CREATED).body(new AuthResponse(token, PatientPublicDto.from(patient)));
    }

    @PostMapping("/register/doctor")
    public ResponseEntity<?> registerDoctor(@RequestBody RegisterDoctorRequest req) {
        if (isBlank(req.getName()) || isBlank(req.getEmail()) || isBlank(req.getPassword())
                || isBlank(req.getSpecialty()) || isBlank(req.getLicense()) || isBlank(req.getPhone())
                || req.getFee() == null) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Please fill in all required fields.");
        }
        if (doctorRepository.existsByEmail(req.getEmail())) {
            throw new ApiException(HttpStatus.CONFLICT, "A doctor with this email is already registered.");
        }

        Doctor doctor = new Doctor();
        doctor.setId("doc-" + UUID.randomUUID());
        doctor.setName(req.getName());
        doctor.setEmail(req.getEmail());
        doctor.setPasswordHash(passwordEncoder.encode(req.getPassword()));
        doctor.setSpecialty(req.getSpecialty());
        doctor.setLicense(req.getLicense());
        doctor.setPhone(req.getPhone());
        doctor.setFee(req.getFee());
        doctor.setCity(req.getCity());
        doctor.setClinic(req.getClinic());
        doctor.setClinicAddress(req.getClinicAddress());
        doctor.setStatus("pending_approval"); // requires admin approval before login works
        doctor.setRating(5.0);
        doctor.setAvatar(initials(req.getName()));
        doctor.setClinicStatus("in_clinic");
        doctor.setAvailable(new ArrayList<>());
        doctor.setSlots(new ArrayList<>());
        doctorRepository.save(doctor);

        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "pendingApproval", true,
                "doctor", DoctorPublicDto.from(doctor),
                "message", "Thank you Dr. " + req.getName() + ". Your application has been sent to Admin for approval."
        ));
    }

    @GetMapping("/me")
    public ResponseEntity<?> me() {
        String id = AuthUtil.currentUserId();
        String role = AuthUtil.currentRole();

        return switch (role) {
            case "admin" -> {
                Admin admin = adminRepository.findById(id)
                        .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "User no longer exists."));
                yield ResponseEntity.ok(Map.of("user", AdminPublicDto.from(admin), "role", role));
            }
            case "doctor" -> {
                Doctor doc = doctorRepository.findById(id)
                        .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "User no longer exists."));
                yield ResponseEntity.ok(Map.of("user", DoctorPublicDto.from(doc), "role", role));
            }
            case "patient" -> {
                Patient pat = patientRepository.findById(id)
                        .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "User no longer exists."));
                yield ResponseEntity.ok(Map.of("user", PatientPublicDto.from(pat), "role", role));
            }
            default -> throw new ApiException(HttpStatus.NOT_FOUND, "User no longer exists.");
        };
    }

    private boolean isBlank(String s) {
        return s == null || s.isBlank();
    }

    private String initials(String name) {
        StringBuilder sb = new StringBuilder();
        for (String part : name.trim().split("\\s+")) {
            if (!part.isEmpty()) sb.append(Character.toUpperCase(part.charAt(0)));
        }
        return sb.length() > 2 ? sb.substring(0, 2) : sb.toString();
    }
}
