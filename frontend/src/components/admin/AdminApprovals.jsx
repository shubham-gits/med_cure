import React, { useState } from "react";
import Badge from "../common/Badge";
import DoctorDetailModal from "./DoctorDetailModal";

export default function AdminApprovals({ doctors, appointments, onApprove, onReject }) {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const pendingDoctors = doctors.filter((d) => d.status === "pending_approval");

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h2 style={{ margin: 0, fontWeight: 800, color: "#0f172a", fontSize: 24 }}>Doctor Registration Approvals</h2>
          <p style={{ margin: "4px 0 0", fontSize: 13, color: "#64748b" }}>
            Click any doctor profile card to review medical license, clinic address, and full credentials
          </p>
        </div>
        <div style={{ background: "#fefce8", color: "#a16207", padding: "6px 16px", borderRadius: 20, fontWeight: 700, fontSize: 13, border: "1px solid #fef08a" }}>
          {pendingDoctors.length} Pending Approval(s)
        </div>
      </div>

      {pendingDoctors.length === 0 ? (
        <div style={cardStyle}>
          <div style={{ textAlign: "center", padding: "48px 20px", color: "#64748b" }}>
            <div style={{ fontSize: 44, marginBottom: 12 }}>🛡️</div>
            <div style={{ fontWeight: 700, fontSize: 16, color: "#0f172a" }}>All doctor applications reviewed</div>
            <p style={{ margin: "4px 0 0", fontSize: 13 }}>New doctor self-registrations will appear here for verification.</p>
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {pendingDoctors.map((doc) => (
            <div
              key={doc.id}
              onClick={() => setSelectedDoctor(doc)}
              style={cardStyle}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
                <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      background: "#fef3c7",
                      color: "#b45309",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      fontSize: 18,
                      flexShrink: 0,
                    }}
                  >
                    {doc.avatar || (doc.name ? doc.name.slice(0, 2).toUpperCase() : "DR")}
                  </div>

                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontWeight: 800, fontSize: 18, color: "#0f172a" }}>{doc.name}</span>
                      <Badge status="pending_approval" />
                    </div>

                    <div style={{ fontSize: 14, color: "#0f766e", fontWeight: 700, marginTop: 2 }}>
                      {doc.specialty} • {doc.experience} Experience
                    </div>

                    <div style={{ display: "flex", gap: 18, marginTop: 8, flexWrap: "wrap", fontSize: 13, color: "#475569" }}>
                      <span>📄 <strong>License:</strong> {doc.license || "MCI-Pending"}</span>
                      <span>💰 <strong>Fee:</strong> ₹{doc.fee}</span>
                      <span>📞 <strong>Phone:</strong> {doc.phone || "N/A"}</span>
                      <span>✉️ <strong>Email:</strong> {doc.email}</span>
                    </div>

                    <div style={{ marginTop: 8, fontSize: 12, color: "#0f766e", fontWeight: 700 }}>
                      🔍 Click to inspect complete credentials & bio →
                    </div>
                  </div>
                </div>

                {/* Approve / Reject Action Buttons */}
                <div style={{ display: "flex", gap: 10 }} onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => onApprove(doc.id)}
                    style={{
                      background: "#16a34a",
                      color: "#ffffff",
                      border: "none",
                      padding: "10px 20px",
                      borderRadius: 10,
                      fontWeight: 700,
                      fontSize: 14,
                      cursor: "pointer",
                      boxShadow: "0 2px 8px rgba(22, 163, 74, 0.25)",
                    }}
                  >
                    ✓ Approve Doctor
                  </button>
                  <button
                    onClick={() => onReject(doc.id)}
                    style={{
                      background: "#fef2f2",
                      color: "#b91c1c",
                      border: "1px solid #fecaca",
                      padding: "10px 18px",
                      borderRadius: 10,
                      fontWeight: 700,
                      fontSize: 14,
                      cursor: "pointer",
                    }}
                  >
                    ✕ Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Doctor Detailed Profile Modal */}
      {selectedDoctor && (
        <DoctorDetailModal
          doctor={selectedDoctor}
          appointments={appointments}
          onToggleStatus={(id, status) => {
            if (status === "approved") onApprove(id);
            else onReject(id);
          }}
          onClose={() => setSelectedDoctor(null)}
        />
      )}
    </div>
  );
}

const cardStyle = {
  background: "#ffffff",
  borderRadius: 16,
  padding: 22,
  border: "1px solid #e2e8f0",
  boxShadow: "0 4px 16px rgba(0,0,0,0.03)",
  cursor: "pointer",
  transition: "transform 0.15s",
};
