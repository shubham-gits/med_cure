package com.medbook.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "appointments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Appointment {

    @Id
    private String id;

    private String doctorId;
    private String doctorName;
    private String specialty;

    private String patientId;
    private String patientName;
    private String patientPhone;

    // Stored as ISO strings (yyyy-MM-dd and HH:mm) to mirror the original
    // Node.js backend's data shape and keep date-string comparisons (e.g. in
    // the queue-position query) simple.
    private String date;
    private String time;

    private String reason;
    private String notes;
    private Double fee;
    private String paymentMode;

    // pending | confirmed | completed | cancelled
    private String status;

    private String bookedAt;

    private String diagnosis;
    private String prescription;
    private String completedAt;
}
