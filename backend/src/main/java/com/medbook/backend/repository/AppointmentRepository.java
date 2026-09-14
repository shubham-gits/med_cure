package com.medbook.backend.repository;

import com.medbook.backend.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, String> {

    List<Appointment> findByPatientId(String patientId);

    List<Appointment> findByDoctorId(String doctorId);

    // Used for the double-booking check on create, and for the queue-position
    // endpoint — deliberately returns only what's needed for a count/comparison,
    // never exposed directly to a patient client for other patients' rows.
    List<Appointment> findByDoctorIdAndDateAndStatusNot(String doctorId, String date, String status);

    List<Appointment> findByDoctorIdAndDateAndStatus(String doctorId, String date, String status);
}
