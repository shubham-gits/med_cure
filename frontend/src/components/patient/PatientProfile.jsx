import React from "react";

export default function PatientProfile({ user, myAppointments }) {
  const completedCount = myAppointments.filter((a) => a.status === "completed").length;
  const totalSpent = myAppointments.filter((a) => a.status === "completed" || a.status === "confirmed").reduce((sum, a) => sum + (a.fee || 0), 0);

  return (
    <div style={{ maxWidth: 640 }}>
      <h2 style={{ margin: "0 0 24px", fontWeight: 800, color: "#0f172a", fontSize: 24 }}>My Patient Profile</h2>

      <div style={cardStyle}>
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 24, paddingBottom: 24, borderBottom: "1px solid #f1f5f9" }}>
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
            }}
          >
            {user.name ? user.name.slice(0, 2).toUpperCase() : "PT"}
          </div>

          <div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#0f172a" }}>{user.name}</div>
            <div style={{ fontSize: 13, color: "#64748b", marginTop: 2 }}>{user.email}</div>
            <div style={{ fontSize: 12, color: "#0f766e", fontWeight: 700, marginTop: 4 }}>
              Registered Patient
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 24 }}>
          <Field label="Phone Contact" value={user.phone || "Not set"} />
          <Field label="Age" value={user.age ? `${user.age} yrs` : "Not set"} />
          <Field label="Gender" value={user.gender || "Not set"} />
          <Field label="Account Email" value={user.email} />
        </div>

        <div style={{ paddingTop: 20, borderTop: "1px solid #f1f5f9" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#64748b", marginBottom: 12, textTransform: "uppercase" }}>
            Health Consultation Overview
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            <StatBox number={myAppointments.length} label="Total Bookings" />
            <StatBox number={completedCount} label="Completed Consults" color="#16a34a" />
            <StatBox number={`₹${totalSpent}`} label="Total Medical Fees" color="#0f766e" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value }) {
  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", marginBottom: 4 }}>{label}</div>
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
