import React, { useState, useEffect } from "react";
import { fetchPatients } from "../../utils/api";

export default function AdminPatients({ appointments }) {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPatients()
      .then(setPatients)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div style={{ textAlign: "center", padding: 40, color: "#64748b" }}>Loading patient directory…</div>;
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h2 style={{ margin: 0, fontWeight: 800, color: "#0f172a", fontSize: 24 }}>Registered Patients Directory</h2>
        <div style={{ background: "#f3e8ff", color: "#6b21a8", padding: "6px 16px", borderRadius: 20, fontWeight: 700, fontSize: 13 }}>
          {patients.length} Registered Patients
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {patients.map((pat) => {
          const patApts = appointments.filter((a) => a.patientId === pat.id);

          return (
            <div key={pat.id} style={cardStyle}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: "50%",
                      background: "#8b5cf6",
                      color: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      fontSize: 18,
                    }}
                  >
                    {pat.name ? pat.name.slice(0, 2).toUpperCase() : "PT"}
                  </div>

                  <div>
                    <div style={{ fontWeight: 800, fontSize: 16, color: "#0f172a" }}>{pat.name}</div>
                    <div style={{ fontSize: 13, color: "#64748b" }}>
                      {pat.email} • {pat.phone || "No phone"}
                    </div>
                    <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>
                      Age: {pat.age || "N/A"} | Gender: {pat.gender || "N/A"} | Joined: {pat.registeredAt || "2026-08-01"}
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 12 }}>
                  <StatBox label="Bookings" value={patApts.length} />
                  <StatBox label="Completed" value={patApts.filter((a) => a.status === "completed").length} color="#16a34a" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StatBox({ label, value, color = "#0f172a" }) {
  return (
    <div style={{ background: "#f8fafc", borderRadius: 10, padding: "8px 14px", textAlign: "center", border: "1px solid #e2e8f0" }}>
      <div style={{ fontWeight: 800, fontSize: 16, color }}>{value}</div>
      <div style={{ fontSize: 11, color: "#64748b" }}>{label}</div>
    </div>
  );
}

const cardStyle = {
  background: "#ffffff",
  borderRadius: 16,
  padding: 18,
  border: "1px solid #e2e8f0",
  boxShadow: "0 4px 16px rgba(0,0,0,0.03)",
};
