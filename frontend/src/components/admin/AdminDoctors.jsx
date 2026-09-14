import React, { useState } from "react";
import Badge from "../common/Badge";
import DoctorDetailModal from "./DoctorDetailModal";

export default function AdminDoctors({ doctors, appointments, onToggleStatus }) {
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h2 style={{ margin: 0, fontWeight: 800, color: "#0f172a", fontSize: 24 }}>Doctor Directory Management</h2>
          <p style={{ margin: "4px 0 0", fontSize: 13, color: "#64748b" }}>
            Click on any doctor card to view full credentials, license details, and analytics
          </p>
        </div>
        <div style={{ background: "#ccfbf1", color: "#0f766e", padding: "6px 16px", borderRadius: 20, fontWeight: 700, fontSize: 13 }}>
          {doctors.length} Registered Doctors
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(330px, 1fr))", gap: 20 }}>
        {doctors.map((doc) => {
          const docApts = appointments.filter((a) => a.doctorId === doc.id);
          const revenue = docApts.filter((a) => a.status === "completed").reduce((s, a) => s + (a.fee || 0), 0);

          return (
            <div
              key={doc.id}
              onClick={() => setSelectedDoctor(doc)}
              style={cardStyle}
            >
              <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 16 }}>
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: "50%",
                    background: "#0f172a",
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 800,
                    fontSize: 18,
                  }}
                >
                  {doc.avatar || (doc.name ? doc.name.slice(0, 2).toUpperCase() : "DR")}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontWeight: 800, fontSize: 16, color: "#0f172a" }}>{doc.name}</span>
                  </div>
                  <div style={{ fontSize: 13, color: "#0f766e", fontWeight: 700 }}>{doc.specialty}</div>
                  <div style={{ fontSize: 12, color: "#64748b" }}>License: {doc.license || "Verified"}</div>
                </div>

                <Badge status={doc.status || "approved"} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 14 }}>
                <MiniStat label="Total Booked" value={docApts.length} />
                <MiniStat label="Completed" value={docApts.filter((a) => a.status === "completed").length} color="#16a34a" />
                <MiniStat label="Revenue" value={`₹${revenue}`} color="#0f766e" />
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 12, borderTop: "1px solid #f1f5f9" }}>
                <span style={{ fontSize: 12, color: "#0f766e", fontWeight: 700 }}>🔍 View Full Profile</span>

                <div onClick={(e) => e.stopPropagation()}>
                  {doc.status === "pending_approval" ? (
                    <button onClick={() => onToggleStatus(doc.id, "approved")} style={approveBtn}>
                      Approve
                    </button>
                  ) : doc.status === "approved" ? (
                    <button onClick={() => onToggleStatus(doc.id, "rejected")} style={rejectBtn}>
                      Suspend
                    </button>
                  ) : (
                    <button onClick={() => onToggleStatus(doc.id, "approved")} style={approveBtn}>
                      Reactivate
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Doctor Detailed Profile Modal */}
      {selectedDoctor && (
        <DoctorDetailModal
          doctor={selectedDoctor}
          appointments={appointments}
          onToggleStatus={onToggleStatus}
          onClose={() => setSelectedDoctor(null)}
        />
      )}
    </div>
  );
}

function MiniStat({ label, value, color = "#0f172a" }) {
  return (
    <div style={{ background: "#f8fafc", borderRadius: 8, padding: "8px 10px", textAlign: "center", border: "1px solid #f1f5f9" }}>
      <div style={{ fontWeight: 800, fontSize: 15, color }}>{value}</div>
      <div style={{ fontSize: 11, color: "#64748b" }}>{label}</div>
    </div>
  );
}

const cardStyle = {
  background: "#ffffff",
  borderRadius: 16,
  padding: 20,
  border: "1px solid #e2e8f0",
  boxShadow: "0 4px 16px rgba(0,0,0,0.03)",
  cursor: "pointer",
  transition: "transform 0.15s, box-shadow 0.15s",
};

const approveBtn = {
  background: "#f0fdf4",
  color: "#15803d",
  border: "1px solid #bbf7d0",
  padding: "4px 12px",
  borderRadius: 6,
  fontWeight: 700,
  fontSize: 12,
  cursor: "pointer",
};

const rejectBtn = {
  background: "#fef2f2",
  color: "#b91c1c",
  border: "1px solid #fecaca",
  padding: "4px 12px",
  borderRadius: 6,
  fontWeight: 700,
  fontSize: 12,
  cursor: "pointer",
};
