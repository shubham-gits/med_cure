import React, { useState } from "react";
import Modal from "../common/Modal";

export default function PrescribeModal({ appointment, onSubmit, onClose }) {
  const [diagnosis, setDiagnosis] = useState(appointment?.reason || "");
  const [notes, setNotes] = useState(appointment?.notes || "");
  const [prescription, setPrescription] = useState(appointment?.prescription || "");

  const handleSave = () => {
    onSubmit(appointment.id, {
      diagnosis,
      notes,
      prescription,
      status: "completed",
      completedAt: new Date().toISOString(),
    });
  };

  return (
    <Modal title={`Consultation & Prescription - ${appointment?.patientName}`} onClose={onClose} maxWidth={600}>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Patient Summary Header */}
        <div style={{ background: "#f8fafc", padding: 14, borderRadius: 12, border: "1px solid #e2e8f0" }}>
          <div style={{ fontWeight: 700, color: "#0f172a", fontSize: 15 }}>{appointment?.patientName}</div>
          <div style={{ fontSize: 13, color: "#64748b", marginTop: 2 }}>
            Phone: {appointment?.patientPhone || "N/A"} | Date: {appointment?.date} at {appointment?.time}
          </div>
          {appointment?.reason && (
            <div style={{ fontSize: 13, color: "#0f766e", marginTop: 4, fontWeight: 600 }}>
              Chief Complaint: {appointment.reason}
            </div>
          )}
        </div>

        <div>
          <label style={labelStyle}>Diagnosis / Assessment</label>
          <input
            style={inputStyle}
            placeholder="e.g. Acute Migraine, Essential Hypertension"
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
          />
        </div>

        <div>
          <label style={labelStyle}>Doctor Consultation Notes</label>
          <textarea
            style={{ ...inputStyle, minHeight: 70 }}
            placeholder="Observations, vitals, exam notes..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <div>
          <label style={labelStyle}>Prescription & Rx Dosage</label>
          <textarea
            style={{ ...inputStyle, minHeight: 100, fontFamily: "monospace" }}
            placeholder={"1. Tab Paracetamol 500mg - 1-0-1 after meals (5 days)\n2. Cap Amoxicillin 250mg - 1-0-1 (7 days)"}
            value={prescription}
            onChange={(e) => setPrescription(e.target.value)}
          />
        </div>

        <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
          <button onClick={onClose} style={{ ...btnStyle, background: "#f1f5f9", color: "#475569", flex: 1 }}>
            Cancel
          </button>
          <button onClick={handleSave} style={{ ...btnStyle, background: "#047857", color: "#ffffff", flex: 2 }}>
            Complete Consultation & Send Prescription
          </button>
        </div>
      </div>
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
  cursor: "pointer",
};
