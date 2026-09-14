import React from "react";
import Badge from "../common/Badge";

export default function DoctorProfile({ doctor, appointments }) {
  const docApts = appointments.filter((a) => a.doctorId === doctor.id);
  const completedCount = docApts.filter((a) => a.status === "completed").length;
  const totalRevenue = docApts.filter((a) => a.status === "completed").reduce((sum, a) => sum + (a.fee || 0), 0);

  return (
    <div style={{ maxWidth: 700 }}>
      <h2 style={{ margin: "0 0 24px", fontWeight: 800, color: "#0f172a", fontSize: 24 }}>Doctor Profile</h2>

      <div style={cardStyle}>
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 24, paddingBottom: 24, borderBottom: "1px solid #f1f5f9" }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: "#047857",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: 26,
            }}
          >
            {doctor.avatar || (doctor.name ? doctor.name.slice(0, 2).toUpperCase() : "DR")}
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 22, fontWeight: 800, color: "#0f172a" }}>{doctor.name}</span>
              <Badge status={doctor.status || "approved"} />
            </div>
            <div style={{ fontSize: 14, color: "#047857", fontWeight: 700, marginTop: 2 }}>
              {doctor.specialty} • {doctor.experience} Experience
            </div>
            <div style={{ fontSize: 13, color: "#64748b", marginTop: 2 }}>{doctor.email}</div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
          <ProfileField label="Medical License" value={doctor.license || "MCI-Registered"} />
          <ProfileField label="Consultation Fee" value={`₹${doctor.fee}`} />
          <ProfileField label="Phone Contact" value={doctor.phone || "N/A"} />
          <ProfileField label="Clinic Address" value={doctor.clinic || "Primary Health Care Center"} />
        </div>

        {doctor.bio && (
          <div style={{ marginBottom: 24, background: "#f8fafc", padding: 16, borderRadius: 12, border: "1px solid #e2e8f0" }}>
            <div style={labelStyle}>Professional Bio</div>
            <p style={{ margin: "4px 0 0", fontSize: 13, color: "#334155", lineHeight: 1.5 }}>{doctor.bio}</p>
          </div>
        )}

        <div style={{ paddingTop: 20, borderTop: "1px solid #f1f5f9" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#64748b", marginBottom: 12, textTransform: "uppercase" }}>
            Lifetime Performance Stats
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            <StatBox number={docApts.length} label="Total Bookings" />
            <StatBox number={completedCount} label="Completed Consults" color="#16a34a" />
            <StatBox number={`₹${totalRevenue}`} label="Total Earnings" color="#047857" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileField({ label, value }) {
  return (
    <div>
      <div style={labelStyle}>{label}</div>
      <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}>{value}</div>
    </div>
  );
}

function StatBox({ number, label, color = "#0f172a" }) {
  return (
    <div style={{ background: "#f8fafc", borderRadius: 12, padding: "14px 16px", textAlign: "center", border: "1px solid #e2e8f0" }}>
      <div style={{ fontSize: 20, fontWeight: 800, color }}>{number}</div>
      <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>{label}</div>
    </div>
  );
}

const cardStyle = {
  background: "#ffffff",
  borderRadius: 16,
  padding: 28,
  border: "1px solid #e2e8f0",
  boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
};

const labelStyle = {
  fontSize: 11,
  fontWeight: 700,
  color: "#64748b",
  marginBottom: 4,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
};
