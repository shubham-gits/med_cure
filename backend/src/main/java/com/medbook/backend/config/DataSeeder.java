package com.medbook.backend.config;

import com.medbook.backend.model.Admin;
import com.medbook.backend.model.Doctor;
import com.medbook.backend.model.Patient;
import com.medbook.backend.repository.AdminRepository;
import com.medbook.backend.repository.DoctorRepository;
import com.medbook.backend.repository.PatientRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Seeds the same demo accounts as the original Node.js backend's
 * server/data/seed.js, so the two versions are drop-in comparable. Runs
 * once — if the tables already have rows, it does nothing.
 */
@Component
public class DataSeeder implements CommandLineRunner {

    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;
    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(DoctorRepository doctorRepository, PatientRepository patientRepository,
                       AdminRepository adminRepository, PasswordEncoder passwordEncoder) {
        this.doctorRepository = doctorRepository;
        this.patientRepository = patientRepository;
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (doctorRepository.count() > 0 || patientRepository.count() > 0 || adminRepository.count() > 0) {
            return; // already seeded
        }

        Admin admin = new Admin();
        admin.setId("admin-1");
        admin.setName("Super Admin");
        admin.setEmail("admin@medbook.in");
        admin.setPasswordHash(passwordEncoder.encode("admin123"));
        adminRepository.save(admin);

        Doctor d1 = new Doctor();
        d1.setId("doc-1"); d1.setName("Dr. Priya Sharma"); d1.setEmail("priya@medbook.in");
        d1.setPasswordHash(passwordEncoder.encode("doc123"));
        d1.setSpecialty("Cardiologist"); d1.setExperience("12 yrs"); d1.setFee(800.0); d1.setAvatar("PS");
        d1.setAvailable(List.of("Mon", "Wed", "Fri"));
        d1.setSlots(List.of("09:00", "10:00", "11:00", "14:00", "15:00", "16:00"));
        d1.setRating(4.9); d1.setStatus("approved"); d1.setLicense("MCI-884920"); d1.setPhone("+91 98765 43210");
        d1.setBio("Senior Consultant Cardiologist with 12+ years of experience in cardiovascular interventions.");
        d1.setClinic("Heart Care Institute & OPD Center"); d1.setCity("New Delhi");
        d1.setClinicAddress("Suite 402, Heart Care Tower, MG Road, New Delhi");
        d1.setLandmark("Opposite Metro Pillar 124");
        d1.setMapsUrl("https://maps.google.com/?q=New+Delhi+Cardiology+Clinic");
        d1.setClinicStatus("in_clinic");
        doctorRepository.save(d1);

        Doctor d2 = new Doctor();
        d2.setId("doc-2"); d2.setName("Dr. Arjun Mehta"); d2.setEmail("arjun@medbook.in");
        d2.setPasswordHash(passwordEncoder.encode("doc123"));
        d2.setSpecialty("Neurologist"); d2.setExperience("8 yrs"); d2.setFee(700.0); d2.setAvatar("AM");
        d2.setAvailable(List.of("Tue", "Thu", "Sat"));
        d2.setSlots(List.of("10:00", "11:00", "12:00", "15:00", "16:00", "17:00"));
        d2.setRating(4.7); d2.setStatus("approved"); d2.setLicense("MCI-673910"); d2.setPhone("+91 98123 45678");
        d2.setBio("Specialist in neuro-degenerative diseases and stroke rehabilitation.");
        d2.setClinic("Neuro Life Clinic & Diagnostic OPD"); d2.setCity("Mumbai");
        d2.setClinicAddress("Plot 88, Bandra West Medical Hub, Mumbai");
        d2.setLandmark("Near Lilavati Hospital Flyover");
        d2.setMapsUrl("https://maps.google.com/?q=Bandra+Mumbai+Neurology");
        d2.setClinicStatus("in_clinic");
        doctorRepository.save(d2);

        Doctor d3 = new Doctor();
        d3.setId("doc-3"); d3.setName("Dr. Sunita Rao"); d3.setEmail("sunita@medbook.in");
        d3.setPasswordHash(passwordEncoder.encode("doc123"));
        d3.setSpecialty("Dermatologist"); d3.setExperience("15 yrs"); d3.setFee(600.0); d3.setAvatar("SR");
        d3.setAvailable(List.of("Mon", "Tue", "Thu"));
        d3.setSlots(List.of("09:00", "10:00", "11:00", "14:00", "15:00"));
        d3.setRating(4.8); d3.setStatus("approved"); d3.setLicense("MCI-452109"); d3.setPhone("+91 97654 32109");
        d3.setBio("Expert in cosmetic dermatology and pediatric skin care.");
        d3.setClinic("Skin Glow Skin & Laser Clinic"); d3.setCity("Bangalore");
        d3.setClinicAddress("12th Main Road, Indiranagar, Bangalore");
        d3.setLandmark("Behind Metro Station Exit B");
        d3.setMapsUrl("https://maps.google.com/?q=Indiranagar+Bangalore+Dermatology");
        d3.setClinicStatus("in_surgery");
        doctorRepository.save(d3);

        Doctor d4 = new Doctor();
        d4.setId("doc-4"); d4.setName("Dr. Vikram Patel"); d4.setEmail("vikram@medbook.in");
        d4.setPasswordHash(passwordEncoder.encode("doc123"));
        d4.setSpecialty("Orthopedic"); d4.setExperience("10 yrs"); d4.setFee(750.0); d4.setAvatar("VP");
        d4.setAvailable(List.of("Wed", "Fri", "Sat"));
        d4.setSlots(List.of("09:00", "11:00", "13:00", "15:00", "16:00"));
        d4.setRating(4.6); d4.setStatus("approved"); d4.setLicense("MCI-991204"); d4.setPhone("+91 98450 11223");
        d4.setBio("Joint replacement specialist and sports medicine consultant.");
        d4.setClinic("Apex Bone & Joint OPD Clinic"); d4.setCity("Ahmedabad");
        d4.setClinicAddress("CG Road, Near Stadium Circle, Ahmedabad");
        d4.setLandmark("Next to HDFC Bank Branch");
        d4.setMapsUrl("https://maps.google.com/?q=Ahmedabad+Orthopedic+Clinic");
        d4.setClinicStatus("in_clinic");
        doctorRepository.save(d4);

        Doctor d5 = new Doctor();
        d5.setId("doc-5"); d5.setName("Dr. Ananya Gupta"); d5.setEmail("ananya@medbook.in");
        d5.setPasswordHash(passwordEncoder.encode("doc123"));
        d5.setSpecialty("Pediatrician"); d5.setExperience("6 yrs"); d5.setFee(500.0); d5.setAvatar("AG");
        d5.setAvailable(List.of("Mon", "Wed", "Fri", "Sat"));
        d5.setSlots(List.of("09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"));
        d5.setRating(4.9); d5.setStatus("approved"); d5.setLicense("MCI-332910"); d5.setPhone("+91 99001 22334");
        d5.setBio("Compassionate child healthcare specialist and vaccination expert.");
        d5.setClinic("Little Stars Children's OPD Clinic"); d5.setCity("Pune");
        d5.setClinicAddress("Koregaon Park Road 5, Pune");
        d5.setLandmark("Opposite German Bakery Lane");
        d5.setMapsUrl("https://maps.google.com/?q=Pune+Pediatric+Clinic");
        d5.setClinicStatus("emergency_call");
        doctorRepository.save(d5);

        Doctor d6 = new Doctor();
        d6.setId("doc-6"); d6.setName("Dr. Rohit Joshi"); d6.setEmail("rohit@medbook.in");
        d6.setPasswordHash(passwordEncoder.encode("doc123"));
        d6.setSpecialty("General Physician"); d6.setExperience("20 yrs"); d6.setFee(400.0); d6.setAvatar("RJ");
        d6.setAvailable(List.of("Mon", "Tue", "Wed", "Thu", "Fri"));
        d6.setSlots(List.of("08:00", "09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00"));
        d6.setRating(4.5); d6.setStatus("approved"); d6.setLicense("MCI-119283"); d6.setPhone("+91 98777 66554");
        d6.setBio("Family physician providing comprehensive preventative healthcare.");
        d6.setClinic("City Family Healthcare OPD"); d6.setCity("Hyderabad");
        d6.setClinicAddress("Banjara Hills Road No. 1, Hyderabad");
        d6.setLandmark("Near GVK One Mall Signal");
        d6.setMapsUrl("https://maps.google.com/?q=Hyderabad+Family+Clinic");
        d6.setClinicStatus("in_clinic");
        doctorRepository.save(d6);

        Patient p1 = new Patient();
        p1.setId("pat-1"); p1.setName("Rahul Verma"); p1.setEmail("rahul@gmail.com");
        p1.setPasswordHash(passwordEncoder.encode("patient123"));
        p1.setPhone("+91 98765 12345"); p1.setAge(32); p1.setGender("Male"); p1.setRegisteredAt("2026-07-15");
        patientRepository.save(p1);

        Patient p2 = new Patient();
        p2.setId("pat-2"); p2.setName("Kavita Sharma"); p2.setEmail("kavita@gmail.com");
        p2.setPasswordHash(passwordEncoder.encode("patient123"));
        p2.setPhone("+91 98111 22334"); p2.setAge(28); p2.setGender("Female"); p2.setRegisteredAt("2026-07-20");
        patientRepository.save(p2);

        System.out.println("Seeded demo data: 6 doctors, 2 patients, 1 admin.");
    }
}
