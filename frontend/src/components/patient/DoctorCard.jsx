import React from "react";

export default function DoctorCard({ doctor, onBook }) {
  const isOnline = doctor.onlineStatus === "online";

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: 18,
        padding: 22,
        border: "1px solid #e2e8f0",
        boxShadow: "0 4px 16px rgba(0,0,0,0.03)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
    >
      <div>
        {/* Avatar & Header */}
        <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 16 }}>
          <div style={{ position: "relative" }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: "#0f766e",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: 18,
              }}
            >
              {doctor.avatar || (doctor.name ? doctor.name.slice(0, 2).toUpperCase() : "DR")}
            </div>
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: isOnline ? "#22c55e" : "#94a3b8",
                border: "2px solid #ffffff",
                position: "absolute",
                bottom: 2,
                right: 2,
              }}
            />
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 800, fontSize: 17, color: "#0f172a" }}>{doctor.name}</div>
            <div style={{ fontSize: 13, color: "#0f766e", fontWeight: 700 }}>{doctor.specialty}</div>
            <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>{doctor.experience} experience</div>
            {doctor.city && (
              <div style={{ fontSize: 12, color: "#3b82f6", fontWeight: 700, marginTop: 3, display: "flex", alignItems: "center", gap: 3 }}>
                📍 {doctor.city}
              </div>
            )}
          </div>

          <div
            style={{
              background: "#fef9c3",
              color: "#a16207",
              padding: "4px 8px",
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            ★ {doctor.rating || "4.8"}
          </div>
        </div>

        {/* Bio excerpt */}
        {doctor.bio && (
          <p style={{ fontSize: 13, color: "#475569", margin: "0 0 16px", lineHeight: 1.4, height: 36, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
            {doctor.bio}
          </p>
        )}

        {/* Fee & Availability Info */}
        <div style={{ display: "flex", gap: 10, marginBottom: 18 }}>
          <div style={{ flex: 1, background: "#f8fafc", borderRadius: 10, padding: "8px 12px", border: "1px solid #f1f5f9" }}>
            <div style={{ fontSize: 11, color: "#64748b", fontWeight: 700, textTransform: "uppercase" }}>FEE</div>
            <div style={{ fontWeight: 800, color: "#0f766e", fontSize: 15 }}>₹{doctor.fee}</div>
          </div>
          <div style={{ flex: 1.5, background: "#f8fafc", borderRadius: 10, padding: "8px 12px", border: "1px solid #f1f5f9" }}>
            <div style={{ fontSize: 11, color: "#64748b", fontWeight: 700, textTransform: "uppercase" }}>DAYS</div>
            <div style={{ fontWeight: 700, color: "#0f172a", fontSize: 12, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {doctor.available ? doctor.available.join(", ") : "Mon, Wed, Fri"}
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => onBook(doctor)}
        style={{
          width: "100%",
          background: "#0f766e",
          color: "#ffffff",
          border: "none",
          padding: "11px",
          borderRadius: 10,
          fontWeight: 700,
          fontSize: 14,
          cursor: "pointer",
          transition: "background 0.15s",
        }}
      >
        Book Appointment
      </button>
    </div>
  );
}
