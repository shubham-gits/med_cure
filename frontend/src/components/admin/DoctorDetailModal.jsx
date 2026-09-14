import React from "react";
import Modal from "../common/Modal";
import Badge from "../common/Badge";

export default function DoctorDetailModal({ doctor, appointments, onToggleStatus, onClose }) {
  if (!doctor) return null;

  const docApts = appointments ? appointments.filter((a) => a.doctorId === doctor.id) : [];
  const completedApts = docApts.filter((a) => a.status === "completed");
  const totalRevenue = completedApts.reduce((sum, a) => sum + (a.fee || 0), 0);

  return (
    <Modal title={`Doctor Detailed Profile - ${doctor.name}`} onClose={onClose} maxWidth={640}>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {/* Doctor Header Banner */}
        <div style={{ display: "flex", alignItems: "center", gap: 18, padding: 18, background: "#f8fafc", borderRadius: 16, border: "1px solid #e2e8f0" }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: "#0f766e",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: 26,
              flexShrink: 0,
            }}
          >
            {doctor.avatar || (doctor.name ? doctor.name.slice(0, 2).toUpperCase() : "DR")}
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <span style={{ fontSize: 22, fontWeight: 800, color: "#0f172a" }}>{doctor.name}</span>
              <Badge status={doctor.status || "approved"} />
            </div>

            <div style={{ fontSize: 14, color: "#0f766e", fontWeight: 700, marginTop: 2 }}>
              {doctor.specialty} • {doctor.experience} Experience
            </div>

            <div style={{ fontSize: 13, color: "#64748b", marginTop: 4, display: "flex", gap: 12 }}>
              <span>⭐ Rating: <strong>{doctor.rating || "4.9"}</strong></span>
              <span>Status: <strong style={{ textTransform: "capitalize", color: doctor.onlineStatus === "online" ? "#16a34a" : "#64748b" }}>{doctor.onlineStatus || "Online"}</strong></span>
            </div>
          </div>
        </div>

        {/* Primary Information Grid */}
        <div>
          <h4 style={sectionHeaderStyle}>Medical Credentials & Contact</h4>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, background: "#ffffff", padding: 16, borderRadius: 12, border: "1px solid #e2e8f0" }}>
            <DetailItem label="Medical License No." value={doctor.license || "MCI-Verified"} />
            <DetailItem label="Consultation Fee" value={`₹${doctor.fee}`} />
            <DetailItem label="Email Address" value={doctor.email} />
            <DetailItem label="Phone Contact" value={doctor.phone || "N/A"} />
            <DetailItem label="Clinic / Hospital" value={doctor.clinic || "Primary Health Center"} span2 />
          </div>
        </div>

        {/* Professional Bio */}
        {doctor.bio && (
          <div>
            <h4 style={sectionHeaderStyle}>Professional Bio & Summary</h4>
            <p style={{ margin: 0, fontSize: 13, color: "#334155", background: "#f8fafc", padding: 14, borderRadius: 12, border: "1px solid #e2e8f0", lineHeight: 1.5 }}>
              {doctor.bio}
            </p>
          </div>
        )}

        {/* Schedule & Availability */}
        <div>
          <h4 style={sectionHeaderStyle}>Working Days & Slot Schedule</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, background: "#ffffff", padding: 16, borderRadius: 12, border: "1px solid #e2e8f0" }}>
            <div>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#64748b" }}>AVAILABLE DAYS: </span>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>
                {doctor.available ? doctor.available.join(", ") : "Mon, Wed, Fri"}
              </span>
            </div>

            <div>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#64748b" }}>DAILY SLOTS: </span>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 6 }}>
                {(doctor.slots || ["09:00", "10:00", "11:00", "14:00", "15:00"]).map((sl) => (
                  <span key={sl} style={{ background: "#ccfbf1", color: "#0f766e", padding: "4px 10px", borderRadius: 6, fontSize: 12, fontWeight: 700 }}>
                    {sl}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Summary */}
        <div>
          <h4 style={sectionHeaderStyle}>Platform Performance Analytics</h4>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            <MetricCard number={docApts.length} label="Total Bookings" />
            <MetricCard number={completedApts.length} label="Completed Consults" color="#16a34a" />
            <MetricCard number={`₹${totalRevenue}`} label="Total Platform Revenue" color="#0f766e" />
          </div>
        </div>

        {/* Admin Action Buttons */}
        <div style={{ display: "flex", gap: 12, paddingTop: 12, borderTop: "1px solid #f1f5f9" }}>
          {doctor.status === "pending_approval" ? (
            <button
              onClick={() => { onToggleStatus(doctor.id, "approved"); onClose(); }}
              style={{ ...actionBtn, background: "#16a34a", color: "#ffffff", flex: 2 }}
            >
              ✓ Approve Doctor Application
            </button>
          ) : doctor.status === "approved" ? (
            <button
              onClick={() => { onToggleStatus(doctor.id, "rejected"); onClose(); }}
              style={{ ...actionBtn, background: "#fef2f2", color: "#b91c1c", border: "1px solid #fecaca", flex: 2 }}
            >
              🚫 Suspend Doctor Access
            </button>
          ) : (
            <button
              onClick={() => { onToggleStatus(doctor.id, "approved"); onClose(); }}
              style={{ ...actionBtn, background: "#16a34a", color: "#ffffff", flex: 2 }}
            >
              ✓ Reactivate Doctor
            </button>
          )}

          <button onClick={onClose} style={{ ...actionBtn, background: "#f1f5f9", color: "#475569", flex: 1 }}>
            Close Profile
          </button>
        </div>
      </div>
    </Modal>
  );
}

function DetailItem({ label, value, span2 }) {
  return (
    <div style={{ gridColumn: span2 ? "span 2" : "auto" }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>{label}</div>
      <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a", marginTop: 2 }}>{value}</div>
    </div>
  );
}

function MetricCard({ number, label, color = "#0f172a" }) {
  return (
    <div style={{ background: "#f8fafc", padding: "12px", borderRadius: 10, textAlign: "center", border: "1px solid #e2e8f0" }}>
      <div style={{ fontSize: 18, fontWeight: 800, color }}>{number}</div>
      <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>{label}</div>
    </div>
  );
}

const sectionHeaderStyle = {
  margin: "0 0 8px",
  fontSize: 12,
  fontWeight: 800,
  color: "#64748b",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
};

const actionBtn = {
  padding: "12px",
  borderRadius: 10,
  fontWeight: 700,
  fontSize: 14,
  border: "none",
  cursor: "pointer",
};
