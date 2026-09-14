package com.medbook.backend.controller;

import com.medbook.backend.dto.CreateAppointmentRequest;
import com.medbook.backend.dto.QueueResponse;
import com.medbook.backend.dto.UpdateAppointmentRequest;
import com.medbook.backend.exception.ApiException;
import com.medbook.backend.model.Appointment;
import com.medbook.backend.model.Doctor;
import com.medbook.backend.model.Patient;
import com.medbook.backend.repository.AppointmentRepository;
import com.medbook.backend.repository.DoctorRepository;
import com.medbook.backend.repository.PatientRepository;
import com.medbook.backend.security.AuthUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    private final AppointmentRepository appointmentRepository;
    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;

    public AppointmentController(AppointmentRepository appointmentRepository,
                                  DoctorRepository doctorRepository,
                                  PatientRepository patientRepository) {
        this.appointmentRepository = appointmentRepository;
        this.doctorRepository = doctorRepository;
        this.patientRepository = patientRepository;
    }

    // Scoped by role: patients see only their own, doctors see only their
    // own, admins see everything — same rule as the Node backend.
    @GetMapping
    public List<Appointment> listAppointments() {
        String role = AuthUtil.currentRole();
        String id = AuthUtil.currentUserId();

        return switch (role) {
            case "patient" -> appointmentRepository.findByPatientId(id);
            case "doctor" -> appointmentRepository.findByDoctorId(id);
            case "admin" -> appointmentRepository.findAll();
            default -> throw new ApiException(HttpStatus.FORBIDDEN, "You don't have permission to do that.");
        };
    }

    // Patient books a new appointment.
    @PostMapping
    public ResponseEntity<Appointment> createAppointment(@RequestBody CreateAppointmentRequest req) {
        if (!"patient".equals(AuthUtil.currentRole())) {
            throw new ApiException(HttpStatus.FORBIDDEN, "You don't have permission to do that.");
        }
        if (req.getDate() == null || req.getTime() == null) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "date and time are required.");
        }

        Patient patient = patientRepository.findById(AuthUtil.currentUserId())
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Patient not found."));
        Doctor doctor = doctorRepository.findById(req.getDoctorId())
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Doctor not found."));

        // Server-side double-booking check — never trust the client's disabled-slot UI alone.
        boolean alreadyTaken = appointmentRepository
                .findByDoctorIdAndDateAndStatusNot(doctor.getId(), req.getDate(), "cancelled")
                .stream()
                .anyMatch(a -> req.getTime().equals(a.getTime()));
        if (alreadyTaken) {
            throw new ApiException(HttpStatus.CONFLICT, "That slot was just booked by someone else. Please pick another.");
        }

        Appointment apt = new Appointment();
        apt.setId("apt-" + UUID.randomUUID());
        apt.setDoctorId(doctor.getId());
        apt.setDoctorName(doctor.getName());
        apt.setSpecialty(doctor.getSpecialty());
        apt.setPatientId(patient.getId());
        apt.setPatientName(patient.getName());
        apt.setPatientPhone(patient.getPhone() != null ? patient.getPhone() : "N/A");
        apt.setDate(req.getDate());
        apt.setTime(req.getTime());
        apt.setReason(req.getReason() != null ? req.getReason() : "");
        apt.setNotes(req.getNotes() != null ? req.getNotes() : "");
        apt.setFee(doctor.getFee());
        apt.setPaymentMode(req.getPaymentMode() != null ? req.getPaymentMode() : "pay_at_clinic");
        apt.setStatus("pending");
        apt.setBookedAt(Instant.now().toString());

        appointmentRepository.save(apt);
        return ResponseEntity.status(HttpStatus.CREATED).body(apt);
    }

    // Doctor confirms/declines/completes; patient cancels their own; admin can do anything.
    @PatchMapping("/{id}")
    public Appointment updateAppointment(@PathVariable String id, @RequestBody UpdateAppointmentRequest req) {
        Appointment apt = appointmentRepository.findById(id)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Appointment not found."));

        String role = AuthUtil.currentRole();
        String callerId = AuthUtil.currentUserId();
        boolean isOwnerPatient = "patient".equals(role) && apt.getPatientId().equals(callerId);
        boolean isOwnerDoctor = "doctor".equals(role) && apt.getDoctorId().equals(callerId);
        boolean isAdmin = "admin".equals(role);

        if (!isOwnerPatient && !isOwnerDoctor && !isAdmin) {
            throw new ApiException(HttpStatus.FORBIDDEN, "You don't have permission to update this appointment.");
        }

        // Patients may only cancel their own appointment, nothing else.
        if (isOwnerPatient && !"cancelled".equals(req.getStatus())) {
            throw new ApiException(HttpStatus.FORBIDDEN, "Patients can only cancel appointments.");
        }

        if (req.getStatus() != null) apt.setStatus(req.getStatus());
        if (req.getDiagnosis() != null) apt.setDiagnosis(req.getDiagnosis());
        if (req.getNotes() != null) apt.setNotes(req.getNotes());
        if (req.getPrescription() != null) apt.setPrescription(req.getPrescription());
        if (req.getCompletedAt() != null) apt.setCompletedAt(req.getCompletedAt());

        appointmentRepository.save(apt);
        return apt;
    }

    // Queue position for a specific doctor/date/time — returns only a count,
    // never other patients' details, so it's safe for any authenticated caller.
    @GetMapping("/queue")
    public QueueResponse queuePosition(@RequestParam String doctorId,
                                        @RequestParam String date,
                                        @RequestParam String time) {
        List<Appointment> sameDayConfirmed = appointmentRepository
                .findByDoctorIdAndDateAndStatus(doctorId, date, "confirmed");

        long position = sameDayConfirmed.stream()
                .filter(a -> a.getTime() != null && a.getTime().compareTo(time) < 0)
                .count() + 1;

        int totalConfirmedToday = sameDayConfirmed.size();
        int estimatedWaitMinutes = (int) (position - 1) * 15; // rough average consult length

        return new QueueResponse((int) position, totalConfirmedToday, estimatedWaitMinutes);
    }
}
