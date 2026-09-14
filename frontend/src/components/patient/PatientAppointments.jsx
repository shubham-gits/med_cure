import React, { useState } from "react";
import Badge from "../common/Badge";
import QueueBadge from "./QueueBadge";

export default function PatientAppointments({ myAppointments, doctors, onCancel }) {
  const [filterStatus, setFilterStatus] = useState("all");

  const filtered = filterStatus === "all"
    ? myAppointments
    : myAppointments.filter((a) => a.status === filterStatus);

  const sorted = [...filtered].sort((a, b) => new Date(b.bookedAt) - new Date(a.bookedAt));

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h2 style={{ margin: 0, fontWeight: 800, color: "#0f172a", fontSize: 24 }}>My Clinic Appointments</h2>
          <p style={{ margin: "4px 0 0", fontSize: 13, color: "#64748b" }}>
            View doctor clinic locations, appointment details, and e-prescriptions
          </p>
        </div>

        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {["all", "pending", "confirmed", "completed", "cancelled"].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              style={{
                padding: "6px 14px",
                borderRadius: 20,
                border: `1.5px solid ${filterStatus === st ? "#0f766e" : "#cbd5e1"}`,
                cursor: "pointer",
                fontSize: 12,
                fontWeight: 600,
                background: filterStatus === st ? "#0f766e" : "#ffffff",
                color: filterStatus === st ? "#ffffff" : "#475569",
              }}
            >
              {st.charAt(0).toUpperCase() + st.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {sorted.length === 0 ? (
        <div style={cardStyle}>
          <div style={{ textAlign: "center", padding: "48px 20px", color: "#64748b" }}>
            <div style={{ fontSize: 44, marginBottom: 12 }}>📭</div>
            <div style={{ fontWeight: 700, fontSize: 16, color: "#0f172a" }}>No clinic appointments</div>
            <p style={{ margin: "4px 0 0", fontSize: 13 }}>Book a physical clinic visit with top specialists to get started.</p>
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {sorted.map((apt) => {
            const doc = doctors.find((d) => d.id === apt.doctorId) || {
              clinic: "Specialty Clinic",
              clinicAddress: "Suite 402, Medical Complex",
              landmark: "Central Metro Hub",
            };

            return (
              <div key={apt.id} style={cardStyle}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
                  <div style={{ display: "flex", gap: 16, alignItems: "flex-start", flex: 1 }}>
                    <div
                      style={{
                        width: 52,
                        height: 52,
                        borderRadius: 14,
                        background: "#ccfbf1",
                        color: "#0f766e",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 800,
                        fontSize: 18,
                        flexShrink: 0,
                      }}
                    >
                      {apt.doctorName ? apt.doctorName.replace("Dr. ", "").slice(0, 2).toUpperCase() : "DR"}
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                        <span style={{ fontWeight: 800, fontSize: 17, color: "#0f172a" }}>{apt.doctorName}</span>
                        <Badge status={apt.status} />
                      </div>

                      <div style={{ fontSize: 13, color: "#0f766e", fontWeight: 700, marginTop: 2 }}>
                        {apt.specialty} • 🏥 {doc.clinic || "Specialty Clinic"}
                      </div>

                      {/* Clinic Address & Directions */}
                      <div style={{ fontSize: 12, color: "#475569", marginTop: 4 }}>
                        📍 {doc.clinicAddress || "Medical Center Address"} {doc.landmark ? `(Landmark: ${doc.landmark})` : ""}
                        <a
                          href={doc.mapsUrl || "https://maps.google.com"}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ marginLeft: 8, color: "#0f766e", fontWeight: 700, textDecoration: "underline" }}
                        >
                          Get Directions →
                        </a>
                      </div>

                      <div style={{ display: "flex", gap: 16, marginTop: 8, flexWrap: "wrap", fontSize: 13, color: "#475569", alignItems: "center" }}>
                        <span>📅 <strong>Date:</strong> {apt.date}</span>
                        <span>⏰ <strong>Time Slot:</strong> {apt.time}</span>
                        <span>💰 <strong>Fee:</strong> ₹{apt.fee}</span>
                        {apt.status === "confirmed" && apt.date === new Date().toISOString().split("T")[0] && (
                          <QueueBadge doctorId={apt.doctorId} date={apt.date} time={apt.time} />
                        )}
                      </div>

                      {/* Doctor Confirmation Note */}
                      {apt.status === "pending" && (
                        <div style={{ marginTop: 10, fontSize: 12, color: "#c2410c", background: "#fff7ed", padding: "6px 12px", borderRadius: 8, border: "1px solid #ffedd5" }}>
                          ⏳ Awaiting confirmation directly from {apt.doctorName}.
                        </div>
                      )}

                      {/* Prescription Section */}
                      {apt.prescription && (
                        <div style={{ marginTop: 10, background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 10, padding: 12, color: "#166534" }}>
                          <div style={{ fontWeight: 800, fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>
                            📄 Doctor's Prescription & Medication Advice:
                          </div>
                          <pre style={{ margin: "6px 0 0", fontFamily: "inherit", fontSize: 13, whiteSpace: "pre-wrap" }}>
                            {apt.prescription}
                          </pre>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {(apt.status === "pending" || apt.status === "confirmed") && (
                      <button
                        onClick={() => onCancel(apt.id)}
                        style={{
                          background: "#fef2f2",
                          color: "#b91c1c",
                          border: "1px solid #fecaca",
                          padding: "6px 14px",
                          borderRadius: 8,
                          fontSize: 12,
                          fontWeight: 700,
                          cursor: "pointer",
                        }}
                      >
                        Cancel Booking
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

const cardStyle = {
  background: "#ffffff",
  borderRadius: 16,
  padding: 20,
  border: "1px solid #e2e8f0",
  boxShadow: "0 4px 16px rgba(0,0,0,0.03)",
};
