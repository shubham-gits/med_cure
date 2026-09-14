import React, { useState } from "react";
import Modal from "../common/Modal";
import AvailabilityCalendar from "./AvailabilityCalendar";

const today = () => new Date().toISOString().split("T")[0];

export default function BookingModal({ doctor, patient, appointments, onConfirm, onClose }) {
  const [date, setDate] = useState(today());
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentMode, setPaymentMode] = useState("pay_at_clinic"); // pay_at_clinic | paid_online
  const [reports, setReports] = useState([]);

  const doctorSlots = doctor.slots || ["09:00", "10:00", "11:00", "14:00", "15:00"];

  // Find slots already booked for this doctor on selected date
  const takenSlots = appointments
    .filter((a) => a.doctorId === doctor.id && a.date === date && a.status !== "cancelled")
    .map((a) => a.time);



  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newReports = files.map((f) => ({
      name: f.name,
      size: `${(f.size / 1024).toFixed(0)} KB`,
    }));
    setReports((prev) => [...prev, ...newReports]);
  };

  const removeReport = (index) => {
    setReports((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date || !time) return;

    onConfirm({
      doctorId: doctor.id,
      doctorName: doctor.name,
      specialty: doctor.specialty,
      patientId: patient.id,
      patientName: patient.name,
      patientPhone: patient.phone || "N/A",
      date,
      time,
      reason,
      notes,
      fee: doctor.fee,
      paymentMode,
      reports,
    });
  };

  return (
    <Modal title={`Book Clinic Visit - ${doctor.name}`} onClose={onClose} maxWidth={580}>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Doctor & Clinic Header Card */}
        <div style={{ padding: 16, background: "linear-gradient(135deg, #ccfbf1 0%, #e0f2fe 100%)", borderRadius: 14, border: "1px solid #99f6e4" }}>
          <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 12 }}>
            <div
              style={{
                width: 50,
                height: 50,
                borderRadius: "50%",
                background: "#0f766e",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: 18,
                flexShrink: 0,
              }}
            >
              {doctor.avatar || (doctor.name ? doctor.name.slice(0, 2).toUpperCase() : "DR")}
            </div>
            <div>
              <div style={{ fontWeight: 800, color: "#0f172a", fontSize: 17 }}>{doctor.name}</div>
              <div style={{ fontSize: 13, color: "#0f766e", fontWeight: 700 }}>{doctor.specialty}</div>
              <div style={{ fontSize: 13, fontWeight: 800, color: "#0f172a", marginTop: 2 }}>
                Consultation Fee: ₹{doctor.fee}
              </div>
            </div>
          </div>

          {/* Clinic Location & Map Link */}
          <div style={{ background: "#ffffff", padding: 12, borderRadius: 10, border: "1px solid #cbd5e1" }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#0f172a", display: "flex", alignItems: "center", gap: 6 }}>
              📍 {doctor.clinic || "Specialty Clinic"}
            </div>
            <div style={{ fontSize: 12, color: "#475569", marginTop: 2 }}>
              {doctor.clinicAddress || "Central OPD Complex, City Center"}
            </div>
            {doctor.landmark && (
              <div style={{ fontSize: 11, color: "#0f766e", fontWeight: 700, marginTop: 2 }}>
                Landmark: {doctor.landmark}
              </div>
            )}
            <a
              href={doctor.mapsUrl || "https://maps.google.com"}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-block", marginTop: 6, fontSize: 12, fontWeight: 700, color: "#0f766e", textDecoration: "underline" }}
            >
              📍 Open Directions on Google Maps →
            </a>
          </div>
        </div>

        {/* Date Selection */}
        <div>
          <label style={labelStyle}>Consultation Date</label>
          <AvailabilityCalendar
            doctor={doctor}
            selectedDate={date}
            onSelectDate={(d) => { setDate(d); setTime(""); }}
          />
        </div>

        {/* Time Slot Picker */}
        <div>
          <label style={labelStyle}>Select Time Slot ({date})</label>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginTop: 6 }}>
            {doctorSlots.map((slot) => {
              const isTaken = takenSlots.includes(slot);
              const isSelected = time === slot;
              return (
                <button
                  key={slot}
                  type="button"
                  disabled={isTaken}
                  onClick={() => setTime(slot)}
                  style={{
                    padding: "9px 4px",
                    borderRadius: 8,
                    border: `1.5px solid ${isSelected ? "#0f766e" : isTaken ? "#e2e8f0" : "#cbd5e1"}`,
                    background: isSelected ? "#0f766e" : isTaken ? "#f1f5f9" : "#ffffff",
                    color: isSelected ? "#ffffff" : isTaken ? "#94a3b8" : "#0f172a",
                    fontWeight: 700,
                    fontSize: 13,
                    cursor: isTaken ? "not-allowed" : "pointer",
                    opacity: isTaken ? 0.6 : 1,
                  }}
                >
                  {slot} {isTaken ? "(Booked)" : ""}
                </button>
              );
            })}
          </div>
        </div>

        {/* Symptoms / Chief Complaint */}
        <div>
          <label style={labelStyle}>Reason for Clinic Visit</label>
          <input
            style={inputStyle}
            placeholder="e.g. Chest pain, Fever, Skin rash..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />
        </div>

        {/* Additional Notes for the Doctor */}
        <div>
          <label style={labelStyle}>Additional Notes for the Doctor (Optional)</label>
          <textarea
            style={{ ...inputStyle, minHeight: 70, resize: "vertical" }}
            placeholder="e.g. Symptoms started 3 days ago, currently on medication X..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        {/* Medical Reports File Uploader */}
        <div>
          <label style={labelStyle}>Attach Past Medical Reports / Lab Tests (Optional)</label>
          <input
            type="file"
            multiple
            accept="image/*,.pdf"
            onChange={handleFileUpload}
            style={{ display: "none" }}
            id="report-file-input"
          />
          <label
            htmlFor="report-file-input"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              padding: "10px",
              background: "#f8fafc",
              border: "1.5px dashed #cbd5e1",
              borderRadius: 10,
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 600,
              color: "#0f766e",
            }}
          >
            📁 Upload Blood Reports, X-Rays, or Prescriptions
          </label>

          {reports.length > 0 && (
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 }}>
              {reports.map((rep, idx) => (
                <span
                  key={idx}
                  style={{
                    background: "#ccfbf1",
                    color: "#0f766e",
                    padding: "4px 10px",
                    borderRadius: 6,
                    fontSize: 12,
                    fontWeight: 700,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  📄 {rep.name} ({rep.size})
                  <button
                    type="button"
                    onClick={() => removeReport(idx)}
                    style={{ background: "none", border: "none", cursor: "pointer", color: "#c2410c", fontWeight: 800 }}
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Payment Mode Selection */}
        <div>
          <label style={labelStyle}>Select Payment Mode</label>
          <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
            {[
              { id: "pay_at_clinic", label: "💵 Pay at Clinic Reception (Cash/UPI)", desc: "Pay ₹" + doctor.fee + " when you arrive" },
              { id: "paid_online", label: "💳 Pre-Pay Online Now", desc: "Instant digital pass" },
            ].map((pm) => (
              <div
                key={pm.id}
                onClick={() => setPaymentMode(pm.id)}
                style={{
                  flex: 1,
                  padding: 12,
                  borderRadius: 10,
                  border: `1.5px solid ${paymentMode === pm.id ? "#0f766e" : "#cbd5e1"}`,
                  background: paymentMode === pm.id ? "#ccfbf1" : "#ffffff",
                  cursor: "pointer",
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 700, color: paymentMode === pm.id ? "#0f766e" : "#0f172a" }}>{pm.label}</div>
                <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>{pm.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
          <button type="button" onClick={onClose} style={{ ...btnStyle, background: "#f1f5f9", color: "#475569", flex: 1 }}>
            Cancel
          </button>
          <button
            type="submit"
            disabled={!time}
            style={{
              ...btnStyle,
              background: time ? "#0f766e" : "#94a3b8",
              color: "#ffffff",
              flex: 2,
              cursor: time ? "pointer" : "not-allowed",
            }}
          >
            Confirm Booking (₹{doctor.fee})
          </button>
        </div>
      </form>
    </Modal>
  );
}

const labelStyle = {
  fontSize: 12,
  fontWeight: 700,
  color: "#475569",
  marginBottom: 6,
  display: "block",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
};

const inputStyle = {
  width: "100%",
  padding: "10px 14px",
  border: "1.5px solid #cbd5e1",
  borderRadius: 10,
  fontSize: 14,
  background: "#f8fafc",
  color: "#0f172a",
  outline: "none",
  boxSizing: "border-box",
};

const btnStyle = {
  padding: "12px",
  borderRadius: 10,
  fontWeight: 700,
  fontSize: 14,
  border: "none",
};
