import React from "react";

export default function StatCard({ icon, label, value, trend, color = "#0f766e", bg = "#ffffff" }) {
  return (
    <div
      style={{
        background: bg,
        borderRadius: 16,
        padding: 22,
        border: "1px solid #e2e8f0",
        boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transition: "transform 0.2s, box-shadow 0.2s",
        cursor: "default",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 14,
            background: `${color}15`,
            color: color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
        <div>
          <div style={{ fontSize: 26, fontWeight: 800, color: "#0f172a", letterSpacing: "-0.5px" }}>
            {value}
          </div>
          <div style={{ fontSize: 13, color: "#64748b", fontWeight: 500, marginTop: 2 }}>
            {label}
          </div>
        </div>
      </div>
      {trend && (
        <div
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: trend.startsWith("+") || trend.includes("up") ? "#16a34a" : "#dc2626",
            background: trend.startsWith("+") || trend.includes("up") ? "#f0fdf4" : "#fef2f2",
            padding: "4px 10px",
            borderRadius: 20,
            border: `1px solid ${trend.startsWith("+") || trend.includes("up") ? "#bbf7d0" : "#fecaca"}`,
          }}
        >
          {trend}
        </div>
      )}
    </div>
  );
}
