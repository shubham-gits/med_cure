import React, { useState } from "react";
import Badge from "../common/Badge";
import PrescribeModal from "./PrescribeModal";

export default function DoctorAppointments({ doctor, appointments, onUpdateStatus }) {
  const [filterStatus, setFilterStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [activeApt, setActiveApt] = useState(null);
  const [reportPreview, setReportPreview] = useState(null);

  const docApts = appointments.filter((a) => a.doctorId === doctor.id);

  const filtered = docApts
    .filter((a) => filterStatus === "all" || a.status === filterStatus)
    .filter((a) =>
      a.patientName?.toLowerCase().includes(search.toLowerCase()) ||
      a.reason?.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => new Date(b.bookedAt) - new Date(a.bookedAt));

  return (
    <div>
      {/* Header & Filter Controls */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h2 style={{ margin: 0, fontWeight: 800, color: "#0f172a", fontSize: 24 }}>Clinic Visit Appointments</h2>
          <p style={{ margin: "4px 0 0", fontSize: 13, color: "#64748b" }}>
            Review incoming physical clinic visit bookings and attached lab reports
          </p>
        </div>
        <input
          style={searchInputStyle}
          placeholder="Search patient name or symptom..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Status Filter Buttons */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {["all", "pending", "confirmed", "completed", "cancelled"].map((st) => {
          const count = docApts.filter((a) => st === "all" || a.status === st).length;
          const isActive = filterStatus === st;
          return (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              style={{
                padding: "7px 16px",
                borderRadius: 20,
                border: `1.5px solid ${isActive ? "#047857" : "#cbd5e1"}`,
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 600,
                background: isActive ? "#047857" : "#ffffff",
                color: isActive ? "#ffffff" : "#475569",
                transition: "all 0.15s",
              }}
            >
              {st.charAt(0).toUpperCase() + st.slice(1)} ({count})
            </button>
          );
        })}
      </div>

      {/* Appointments List */}
      {filtered.length === 0 ? (
        <div style={cardStyle}>
          <div style={{ textAlign: "center", padding: "48px 20px", color: "#64748b" }}>
            <div style={{ fontSize: 44, marginBottom: 12 }}>📅</div>
            <div style={{ fontWeight: 700, fontSize: 16, color: "#0f172a" }}>No appointment records found</div>
            <p style={{ margin: "4px 0 0", fontSize: 13 }}>New clinic slot bookings will show up here for your confirmation.</p>
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {filtered.map((apt) => (
            <div key={apt.id} style={cardStyle}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
                <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  {/* Patient Avatar */}
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
                    {apt.patientName ? apt.patientName.slice(0, 2).toUpperCase() : "PT"}
                  </div>

                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                      <span style={{ fontWeight: 800, fontSize: 17, color: "#0f172a" }}>{apt.patientName}</span>
                      <Badge status={apt.status} />
                      <span style={{ fontSize: 11, fontWeight: 800, color: apt.paymentMode === "paid_online" ? "#16a34a" : "#c2410c", background: apt.paymentMode === "paid_online" ? "#f0fdf4" : "#fff7ed", padding: "3px 8px", borderRadius: 6, border: `1px solid ${apt.paymentMode === "paid_online" ? "#bbf7d0" : "#ffedd5"}` }}>
                        {apt.paymentMode === "paid_online" ? "✓ Paid Online" : "💵 Pay at Clinic Reception"}
                      </span>
                    </div>

                    <div style={{ display: "flex", gap: 16, marginTop: 6, flexWrap: "wrap", fontSize: 13, color: "#475569" }}>
                      <span>📅 <strong>Date:</strong> {apt.date}</span>
                      <span>⏰ <strong>Slot:</strong> {apt.time}</span>
                      <span>📞 <strong>Contact:</strong> {apt.patientPhone || "N/A"}</span>
                      <span>💰 <strong>Fee:</strong> ₹{apt.fee}</span>
                    </div>

                    {apt.reason && (
                      <div style={{ marginTop: 8, fontSize: 13, background: "#f8fafc", padding: "6px 12px", borderRadius: 8, border: "1px solid #e2e8f0" }}>
                        💬 <strong>Reason for Clinic Visit:</strong> {apt.reason}
                      </div>
                    )}

                    {/* Attached Patient Lab Reports */}
                    {apt.reports && apt.reports.length > 0 && (
                      <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: "#0f766e" }}>📁 Attached Patient Lab Reports:</span>
                        {apt.reports.map((rep, idx) => (
                          <button
                            key={idx}
                            onClick={() => setReportPreview(rep)}
                            style={{
                              background: "#ccfbf1",
                              color: "#0f766e",
                              border: "1px solid #99f6e4",
                              padding: "3px 10px",
                              borderRadius: 6,
                              fontSize: 12,
                              fontWeight: 700,
                              cursor: "pointer",
                            }}
                          >
                            📄 {rep.name} ({rep.size})
                          </button>
                        ))}
                      </div>
                    )}

                    {apt.prescription && (
                      <div style={{ marginTop: 8, fontSize: 12, background: "#f0fdf4", padding: "8px 12px", borderRadius: 8, border: "1px solid #bbf7d0", color: "#166534" }}>
                        📝 <strong>Prescription Issued:</strong>
                        <pre style={{ margin: "4px 0 0", fontFamily: "inherit", whiteSpace: "pre-wrap" }}>{apt.prescription}</pre>
                      </div>
                    )}
                  </div>
                </div>

                {/* Doctor Actions */}
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  {apt.status === "pending" && (
                    <>
                      <button
                        onClick={() => onUpdateStatus(apt.id, "confirmed")}
                        style={{ ...actionBtn, background: "#f0fdf4", color: "#15803d", border: "1px solid #bbf7d0" }}
                      >
                        ✓ Confirm Slot
                      </button>
                      <button
                        onClick={() => onUpdateStatus(apt.id, "cancelled")}
                        style={{ ...actionBtn, background: "#fef2f2", color: "#b91c1c", border: "1px solid #fecaca" }}
                      >
                        ✕ Decline
                      </button>
                    </>
                  )}

                  {apt.status === "confirmed" && (
                    <>
                      <button
                        onClick={() => setActiveApt(apt)}
                        style={{ ...actionBtn, background: "#047857", color: "#ffffff", border: "none" }}
                      >
                        🩺 Start Consult & Prescribe
                      </button>
                      <button
                        onClick={() => onUpdateStatus(apt.id, "cancelled")}
                        style={{ ...actionBtn, background: "#fef2f2", color: "#b91c1c", border: "1px solid #fecaca" }}
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Report Preview Notice */}
      {reportPreview && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ background: "#ffffff", padding: 24, borderRadius: 16, maxWidth: 440, width: "100%", boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}>
            <h3 style={{ margin: "0 0 10px", fontSize: 18, fontWeight: 800 }}>Medical Document Preview</h3>
            <div style={{ background: "#f8fafc", padding: 16, borderRadius: 10, border: "1px solid #e2e8f0", marginBottom: 16 }}>
              <div style={{ fontWeight: 800, fontSize: 15, color: "#0f766e" }}>📄 {reportPreview.name}</div>
              <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>File Size: {reportPreview.size} • Attached by Patient</div>
              <div style={{ fontSize: 13, color: "#0f172a", marginTop: 12, lineHeight: 1.4 }}>
                Report file attached by patient. Ready for in-clinic consultation review.
              </div>
            </div>
            <button onClick={() => setReportPreview(null)} style={{ width: "100%", background: "#0f766e", color: "#ffffff", border: "none", padding: "10px", borderRadius: 8, fontWeight: 700, cursor: "pointer" }}>
              Close Preview
            </button>
          </div>
        </div>
      )}

      {/* Prescribe & Diagnosis Modal */}
      {activeApt && (
        <PrescribeModal
          appointment={activeApt}
          onSubmit={(aptId, extra) => {
            onUpdateStatus(aptId, "completed", extra);
            setActiveApt(null);
          }}
          onClose={() => setActiveApt(null)}
        />
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

const searchInputStyle = {
  width: 280,
  padding: "9px 14px",
  border: "1.5px solid #cbd5e1",
  borderRadius: 10,
  fontSize: 14,
  background: "#ffffff",
  outline: "none",
};

const actionBtn = {
  padding: "8px 16px",
  borderRadius: 8,
  cursor: "pointer",
  fontWeight: 700,
  fontSize: 13,
  transition: "all 0.15s",
};
