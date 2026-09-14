import React from "react";
import StatCard from "../common/StatCard";
import Badge from "../common/Badge";
import { DonutChart, BarChart } from "../common/Charts";

export default function PatientDashboard({ user, myAppointments, onGoToTab }) {
  const upcoming = myAppointments.filter((a) => a.status === "confirmed" || a.status === "pending");
  const completed = myAppointments.filter((a) => a.status === "completed");
  const totalSpent = completed.reduce((sum, a) => sum + (a.fee || 0), 0);

  // Specialty Breakdown for Donut Chart
  const specialtyCounts = {};
  myAppointments.forEach((a) => {
    const sp = a.specialty || "General";
    specialtyCounts[sp] = (specialtyCounts[sp] || 0) + 1;
  });

  const colors = ["#0f766e", "#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"];
  const specialtyChartData = Object.keys(specialtyCounts).map((sp, i) => ({
    label: sp,
    value: specialtyCounts[sp],
    color: colors[i % colors.length],
  }));

  // Booking History — derived from this patient's real appointment
  // booking dates instead of hardcoded placeholder numbers.
  const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const now = new Date();
  const monthlyHistory = Array.from({ length: 4 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (3 - i), 1);
    const count = myAppointments.filter((a) => {
      if (!a.bookedAt) return false;
      const bookedDate = new Date(a.bookedAt);
      return bookedDate.getFullYear() === d.getFullYear() && bookedDate.getMonth() === d.getMonth();
    }).length;
    return { label: monthLabels[d.getMonth()], value: count };
  });

  return (
    <div>
      {/* Hero Welcome Box */}
      <div
        style={{
          background: "linear-gradient(135deg, #0f766e 0%, #134e4a 100%)",
          borderRadius: 20,
          padding: "36px 40px",
          marginBottom: 24,
          color: "#ffffff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 10px 30px rgba(15,118,110,0.2)",
        }}
      >
        <div>
          <h2 style={{ margin: "0 0 8px", fontSize: 28, fontWeight: 800, letterSpacing: "-0.5px" }}>
            Good day, {user.name ? user.name.split(" ")[0] : "Patient"}!
          </h2>
          <p style={{ margin: 0, opacity: 0.85, fontSize: 15 }}>
            Book appointments with verified specialists and manage your consultations.
          </p>
        </div>
        <button
          onClick={() => onGoToTab("doctors")}
          style={{
            background: "#ffffff",
            color: "#0f766e",
            border: "none",
            padding: "13px 26px",
            borderRadius: 12,
            fontWeight: 800,
            cursor: "pointer",
            fontSize: 15,
            boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
          }}
        >
          Book Consultation →
        </button>
      </div>

      {/* KPI Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: 24 }}>
        <StatCard icon="📅" label="Total Consultations" value={myAppointments.length} color="#0f766e" />
        <StatCard icon="✅" label="Confirmed Visits" value={myAppointments.filter((a) => a.status === "confirmed").length} color="#22c55e" />
        <StatCard icon="⏳" label="Pending Confirmation" value={myAppointments.filter((a) => a.status === "pending").length} color="#f97316" />
        <StatCard icon="💰" label="Total Spent" value={`₹${totalSpent}`} color="#3b82f6" />
      </div>

      {/* Analytics Charts Row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
        <div style={cardStyle}>
          <h3 style={{ margin: "0 0 16px", fontWeight: 700, color: "#0f172a", fontSize: 16 }}>Consultations by Specialty</h3>
          {specialtyChartData.length === 0 ? (
            <div style={{ padding: "24px 10px", textAlign: "center", color: "#94a3b8", fontSize: 13 }}>
              Book your first consultation to see a breakdown here.
            </div>
          ) : (
            <DonutChart data={specialtyChartData} size={150} centerLabel="Visits" centerValue={myAppointments.length} />
          )}
        </div>

        <div style={cardStyle}>
          <h3 style={{ margin: "0 0 16px", fontWeight: 700, color: "#0f172a", fontSize: 16 }}>Booking Activity Trend</h3>
          <BarChart data={monthlyHistory} height={170} color="#0f766e" />
        </div>
      </div>

      {/* Upcoming Appointments Widget */}
      {upcoming.length > 0 && (
        <div style={{ ...cardStyle, marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h3 style={{ margin: 0, fontWeight: 700, color: "#0f172a", fontSize: 16 }}>Upcoming & Pending Visits</h3>
            <button onClick={() => onGoToTab("appointments")} style={{ background: "none", border: "none", color: "#0f766e", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
              View All
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {upcoming.slice(0, 3).map((apt) => (
              <div key={apt.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 14, background: "#f8fafc", borderRadius: 12, border: "1px solid #e2e8f0" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#0f766e", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 15 }}>
                    {apt.doctorName ? apt.doctorName.replace("Dr. ", "").slice(0, 2).toUpperCase() : "DR"}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: "#0f172a" }}>{apt.doctorName}</div>
                    <div style={{ fontSize: 13, color: "#64748b" }}>
                      {apt.specialty} • 📅 {apt.date} at {apt.time}
                    </div>
                  </div>
                </div>
                <Badge status={apt.status} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Specialty Categories */}
      <div style={cardStyle}>
        <h3 style={{ margin: "0 0 16px", fontWeight: 700, color: "#0f172a", fontSize: 16 }}>Browse Specialties</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12 }}>
          {["Cardiologist", "Neurologist", "Dermatologist", "Orthopedic", "Pediatrician", "General Physician"].map((sp) => (
            <button
              key={sp}
              onClick={() => onGoToTab("doctors")}
              style={{
                background: "#ccfbf1",
                border: "1px solid #99f6e4",
                padding: "16px 12px",
                borderRadius: 12,
                cursor: "pointer",
                textAlign: "center",
                color: "#0f766e",
                fontWeight: 700,
                fontSize: 13,
                transition: "all 0.15s",
              }}
            >
              {sp}
            </button>
          ))}
        </div>
      </div>
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
