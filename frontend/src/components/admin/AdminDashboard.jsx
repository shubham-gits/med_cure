import React from "react";
import StatCard from "../common/StatCard";
import Badge from "../common/Badge";
import { AreaChart, BarChart, DonutChart } from "../common/Charts";

export default function AdminDashboard({ doctors, appointments, onGoToTab, onApproveDoctor }) {
  const pendingApprovals = doctors.filter((d) => d.status === "pending_approval");
  const approvedDoctors = doctors.filter((d) => d.status === "approved" || !d.status);

  const completedApts = appointments.filter((a) => a.status === "completed");
  const totalRevenue = completedApts.reduce((sum, a) => sum + (a.fee || 0), 0);

  // Specialization Distribution
  const specCounts = {};
  approvedDoctors.forEach((d) => {
    specCounts[d.specialty] = (specCounts[d.specialty] || 0) + 1;
  });

  const specBarData = Object.keys(specCounts).map((sp) => ({
    label: sp.slice(0, 8),
    value: specCounts[sp],
  }));

  // Monthly Growth Trend — derived from real appointment booking dates
  // instead of hardcoded placeholder numbers, so it reflects actual activity.
  const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const now = new Date();
  const growthTrendData = Array.from({ length: 4 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (3 - i), 1);
    const count = appointments.filter((a) => {
      if (!a.bookedAt) return false;
      const bookedDate = new Date(a.bookedAt);
      return bookedDate.getFullYear() === d.getFullYear() && bookedDate.getMonth() === d.getMonth();
    }).length;
    return { label: monthLabels[d.getMonth()], value: count };
  });

  // Appointment Status Donut Chart
  const statusCounts = [
    { label: "Pending", value: appointments.filter(a => a.status === "pending").length || 1, color: "#f97316" },
    { label: "Confirmed", value: appointments.filter(a => a.status === "confirmed").length || 1, color: "#22c55e" },
    { label: "Completed", value: completedApts.length || 1, color: "#3b82f6" },
    { label: "Cancelled", value: appointments.filter(a => a.status === "cancelled").length || 0, color: "#ef4444" },
  ];

  return (
    <div>
      {/* Title */}
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ margin: 0, fontWeight: 800, color: "#0f172a", fontSize: 26 }}>Platform Executive Dashboard</h2>
        <p style={{ margin: "4px 0 0", fontSize: 14, color: "#64748b" }}>
          Real-time metrics, doctor approval queue, and system analytics
        </p>
      </div>

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 16, marginBottom: 24 }}>
        <StatCard icon="🩺" label="Verified Doctors" value={approvedDoctors.length} color="#0f766e" />
        <StatCard icon="⏳" label="Doctor Approvals" value={pendingApprovals.length} color="#f97316" trend={pendingApprovals.length > 0 ? "Requires Review" : "0 Pending"} />
        <StatCard icon="📅" label="Total Bookings" value={appointments.length} color="#3b82f6" trend="+24% this month" />
        <StatCard icon="💰" label="Platform Revenue" value={`₹${totalRevenue}`} color="#16a34a" trend="+19% YoY" />
      </div>

      {/* Analytics Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20, marginBottom: 24 }}>
        {/* System Growth Area Chart */}
        <div style={cardStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h3 style={{ margin: 0, fontWeight: 700, color: "#0f172a", fontSize: 16 }}>Platform Booking Growth</h3>
            <span style={{ fontSize: 12, color: "#64748b", fontWeight: 600 }}>Monthly Volume</span>
          </div>
          <AreaChart data={growthTrendData} height={180} color="#0f172a" />
        </div>

        {/* Status Distribution Donut Chart */}
        <div style={cardStyle}>
          <h3 style={{ margin: "0 0 16px", fontWeight: 700, color: "#0f172a", fontSize: 16 }}>Appointment Statuses</h3>
          <DonutChart data={statusCounts} size={150} centerLabel="Bookings" centerValue={appointments.length} />
        </div>
      </div>

      {/* Pending Doctor Registrations & Specialization Breakdown */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Pending Approvals Widget */}
        <div style={cardStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h3 style={{ margin: 0, fontWeight: 700, color: "#0f172a", fontSize: 16 }}>Pending Doctor Applications</h3>
            <button onClick={() => onGoToTab("approvals")} style={linkBtnStyle}>
              Review All ({pendingApprovals.length})
            </button>
          </div>

          {pendingApprovals.length === 0 ? (
            <div style={{ padding: "30px 10px", textAlign: "center", color: "#64748b", fontSize: 13 }}>
              ✓ All doctor registration requests have been approved!
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {pendingApprovals.slice(0, 3).map((doc) => (
                <div key={doc.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 12, background: "#fefce8", borderRadius: 10, border: "1px solid #fef08a" }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 14, color: "#0f172a" }}>{doc.name}</div>
                    <div style={{ fontSize: 12, color: "#a16207" }}>
                      {doc.specialty} • License: {doc.license || "MCI-Pending"}
                    </div>
                  </div>
                  <button
                    onClick={() => onApproveDoctor(doc.id)}
                    style={{ background: "#16a34a", color: "#ffffff", border: "none", padding: "6px 14px", borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: "pointer" }}
                  >
                    Approve
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Doctor Specialization Distribution */}
        <div style={cardStyle}>
          <h3 style={{ margin: "0 0 16px", fontWeight: 700, color: "#0f172a", fontSize: 16 }}>Doctor Specialty Distribution</h3>
          {specBarData.length === 0 ? (
            <div style={{ padding: "24px 10px", textAlign: "center", color: "#94a3b8", fontSize: 13 }}>
              No approved doctors yet — this chart fills in as doctors are approved.
            </div>
          ) : (
            <BarChart data={specBarData} height={170} color="#0f766e" />
          )}
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
  color: "#0f766e",
  fontWeight: 700,
  fontSize: 13,
  cursor: "pointer",
};
