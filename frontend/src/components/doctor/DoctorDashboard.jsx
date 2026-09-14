import React from "react";
import StatCard from "../common/StatCard";
import Badge from "../common/Badge";
import { AreaChart, BarChart, DonutChart } from "../common/Charts";

export default function DoctorDashboard({ doctor, appointments, onUpdateStatus, onGoToTab }) {
  const docApts = appointments.filter((a) => a.doctorId === doctor.id);
  const todayStr = new Date().toISOString().split("T")[0];
  const todayApts = docApts.filter((a) => a.date === todayStr);

  const pendingRequests = docApts.filter((a) => a.status === "pending");
  const confirmedApts = docApts.filter((a) => a.status === "confirmed");
  const completedApts = docApts.filter((a) => a.status === "completed");

  const totalRevenue = completedApts.reduce((sum, a) => sum + (a.fee || 0), 0);


  // Weekly Patient Traffic Data — derived from real appointment dates
  // instead of hardcoded filler numbers, so it reflects actual bookings.
  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const weeklyData = dayLabels.map((label, i) => ({
    label,
    value: docApts.filter((a) => a.date && new Date(a.date).getDay() === i).length,
  }));

  // Status Distribution Data for Donut Chart
  const statusData = [
    { label: "Pending", value: pendingRequests.length || 1, color: "#f97316" },
    { label: "Confirmed", value: confirmedApts.length || 1, color: "#22c55e" },
    { label: "Completed", value: completedApts.length || 1, color: "#3b82f6" },
    { label: "Cancelled", value: docApts.filter(a => a.status === "cancelled").length || 0, color: "#ef4444" },
  ];

  // Revenue Trend — derived from real completed appointments' months,
  // instead of hardcoded placeholder revenue figures.
  const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const now = new Date();
  const revenueTrend = Array.from({ length: 4 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (3 - i), 1);
    const monthRevenue = completedApts
      .filter((a) => {
        if (!a.completedAt) return false;
        const completedDate = new Date(a.completedAt);
        return completedDate.getFullYear() === d.getFullYear() && completedDate.getMonth() === d.getMonth();
      })
      .reduce((sum, a) => sum + (a.fee || 0), 0);
    return { label: monthLabels[d.getMonth()], value: monthRevenue, formattedValue: `₹${monthRevenue}` };
  });

  return (
    <div>
      {/* Welcome Banner */}
      <div
        style={{
          background: "linear-gradient(135deg, #047857 0%, #064e3b 100%)",
          borderRadius: 20,
          padding: "28px 32px",
          marginBottom: 24,
          color: "#ffffff",
          boxShadow: "0 10px 30px rgba(4, 120, 87, 0.2)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          <h2 style={{ margin: 0, fontSize: 26, fontWeight: 800 }}>Dr. {doctor.name.replace(/^Dr\.\s*/, '')}'s Clinic</h2>
          <span style={{ background: "rgba(255,255,255,0.2)", padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 700 }}>
            {doctor.clinic || "Clinic"}
          </span>
        </div>
        <p style={{ margin: 0, opacity: 0.85, fontSize: 14 }}>
          📍 {doctor.clinicAddress || "Clinic Address"} ({doctor.landmark || "Near Landmark"})
        </p>
      </div>

      {/* KPI Stat Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: 24 }}>
        <StatCard icon="📆" label="Today's Appointments" value={todayApts.length} color="#7c3aed" trend={todayApts.length > 0 ? "Scheduled today" : "None scheduled"} />
        <StatCard icon="📋" label="Pending Confirmations" value={pendingRequests.length} color="#f97316" trend={pendingRequests.length > 0 ? "Requires Action" : "All Clear"} />
        <StatCard icon="🩺" label="Confirmed Visits" value={confirmedApts.length} color="#22c55e" trend="+12% this week" />
        <StatCard icon="✅" label="Completed Consults" value={completedApts.length} color="#3b82f6" />
        <StatCard icon="💰" label="Total Revenue" value={`₹${totalRevenue}`} color="#047857" trend="+18% vs last month" />
      </div>

      {/* Analytics Charts Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20, marginBottom: 24 }}>
        {/* Patient Volume Area Chart */}
        <div style={cardStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h3 style={{ margin: 0, fontWeight: 700, color: "#0f172a", fontSize: 16 }}>Weekly Patient Flow</h3>
            <span style={{ fontSize: 12, color: "#64748b", fontWeight: 600 }}>Consultations / Day</span>
          </div>
          <AreaChart data={weeklyData} height={180} color="#047857" />
        </div>

        {/* Status Distribution Donut Chart */}
        <div style={cardStyle}>
          <h3 style={{ margin: "0 0 16px", fontWeight: 700, color: "#0f172a", fontSize: 16 }}>Booking Status Breakdown</h3>
          <DonutChart data={statusData} size={150} centerLabel="Bookings" centerValue={docApts.length} />
        </div>
      </div>

      {/* Pending Confirmations & Monthly Revenue Trend Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Urgent Action Queue */}
        <div style={cardStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h3 style={{ margin: 0, fontWeight: 700, color: "#0f172a", fontSize: 16 }}>Pending Booking Requests</h3>
            <button onClick={() => onGoToTab("appointments")} style={linkBtnStyle}>
              View All
            </button>
          </div>

          {pendingRequests.length === 0 ? (
            <div style={{ padding: "30px 10px", textAlign: "center", color: "#64748b", fontSize: 13 }}>
              ✓ No pending requests. All slots confirmed!
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {pendingRequests.slice(0, 3).map((apt) => (
                <div key={apt.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 12, background: "#fff7ed", borderRadius: 10, border: "1px solid #ffedd5" }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: "#0f172a" }}>
                      Token #{apt.tokenNumber || "1"} - {apt.patientName}
                    </div>
                    <div style={{ fontSize: 12, color: "#9a3412" }}>
                      📅 {apt.date} at {apt.time} ({apt.reason || "Consultation"})
                    </div>
                  </div>
                  <button
                    onClick={() => onUpdateStatus(apt.id, "confirmed")}
                    style={{ background: "#22c55e", color: "#ffffff", border: "none", padding: "6px 14px", borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: "pointer" }}
                  >
                    Confirm Slot
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Revenue Trend Bar Chart */}
        <div style={cardStyle}>
          <h3 style={{ margin: "0 0 16px", fontWeight: 700, color: "#0f172a", fontSize: 16 }}>Monthly Consultation Revenue (₹)</h3>
          <BarChart data={revenueTrend} height={170} color="#047857" />
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

const linkBtnStyle = {
  background: "none",
  border: "none",
  color: "#047857",
  fontWeight: 700,
  fontSize: 13,
  cursor: "pointer",
};
