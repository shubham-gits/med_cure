import React, { useState } from "react";
import Badge from "../common/Badge";

export default function AdminAppointments({ appointments, onUpdateStatus }) {
  const [filterStatus, setFilterStatus] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = appointments
    .filter((a) => filterStatus === "all" || a.status === filterStatus)
    .filter(
      (a) =>
        a.patientName?.toLowerCase().includes(search.toLowerCase()) ||
        a.doctorName?.toLowerCase().includes(search.toLowerCase()) ||
        a.specialty?.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => new Date(b.bookedAt) - new Date(a.bookedAt));

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h2 style={{ margin: 0, fontWeight: 800, color: "#0f172a", fontSize: 24 }}>System Appointments Log</h2>
          <p style={{ margin: "4px 0 0", fontSize: 13, color: "#64748b" }}>
            Monitor patient bookings, doctor confirmation statuses, and fee transactions
          </p>
        </div>

        <input
          style={{
            width: 280,
            padding: "9px 14px",
            border: "1.5px solid #cbd5e1",
            borderRadius: 10,
            fontSize: 14,
            background: "#ffffff",
            outline: "none",
          }}
          placeholder="Search patient, doctor, or specialty..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {["all", "pending", "confirmed", "completed", "cancelled"].map((st) => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            style={{
              padding: "6px 14px",
              borderRadius: 20,
              border: `1.5px solid ${filterStatus === st ? "#0f172a" : "#cbd5e1"}`,
              cursor: "pointer",
              fontSize: 12,
              fontWeight: 600,
              background: filterStatus === st ? "#0f172a" : "#ffffff",
              color: filterStatus === st ? "#ffffff" : "#475569",
            }}
          >
            {st.charAt(0).toUpperCase() + st.slice(1)} ({appointments.filter((a) => st === "all" || a.status === st).length})
          </button>
        ))}
      </div>

      <div style={cardStyle}>
        {filtered.length === 0 ? (
          <div style={{ padding: 40, textAlign: "center", color: "#64748b" }}>No appointments found</div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                  <th style={thStyle}>Patient</th>
                  <th style={thStyle}>Assigned Doctor</th>
                  <th style={thStyle}>Date & Slot</th>
                  <th style={thStyle}>Fee</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((apt) => (
                  <tr key={apt.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ ...tdStyle, fontWeight: 700 }}>
                      <div>{apt.patientName}</div>
                      <div style={{ fontSize: 11, color: "#64748b", fontWeight: 400 }}>{apt.patientPhone}</div>
                    </td>
                    <td style={tdStyle}>
                      <div style={{ fontWeight: 700, color: "#0f766e" }}>{apt.doctorName}</div>
                      <div style={{ fontSize: 12, color: "#64748b" }}>{apt.specialty}</div>
                    </td>
                    <td style={{ ...tdStyle, fontSize: 13 }}>
                      {apt.date} at {apt.time}
                    </td>
                    <td style={{ ...tdStyle, fontWeight: 800, color: "#0f172a" }}>₹{apt.fee}</td>
                    <td style={tdStyle}>
                      <Badge status={apt.status} />
                    </td>
                    <td style={tdStyle}>
                      <div style={{ display: "flex", gap: 6 }}>
                        {apt.status === "pending" && (
                          <button
                            onClick={() => onUpdateStatus(apt.id, "confirmed")}
                            style={{ ...actionBtn, background: "#f0fdf4", color: "#15803d", border: "1px solid #bbf7d0" }}
                          >
                            Force Confirm
                          </button>
                        )}
                        {(apt.status === "pending" || apt.status === "confirmed") && (
                          <button
                            onClick={() => onUpdateStatus(apt.id, "cancelled")}
                            style={{ ...actionBtn, background: "#fef2f2", color: "#b91c1c", border: "1px solid #fecaca" }}
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
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

const thStyle = {
  padding: "12px 14px",
  textAlign: "left",
  fontSize: 12,
  fontWeight: 700,
  color: "#64748b",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
};

const tdStyle = {
  padding: "14px",
  fontSize: 14,
  color: "#0f172a",
};

const actionBtn = {
  padding: "4px 10px",
  borderRadius: 6,
  cursor: "pointer",
  fontSize: 12,
  fontWeight: 700,
};
