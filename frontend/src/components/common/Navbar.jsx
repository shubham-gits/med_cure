import React from "react";
import { useTheme } from "../../context/ThemeContext";

export default function Navbar({ user, onLogout, extraActions }) {
  const { theme, toggleTheme } = useTheme();

  const getBrandColor = () => {
    if (user?.role === "admin") return "#0f172a";
    if (user?.role === "doctor") return "#047857";
    return "#0f766e";
  };

  const getRoleBadge = () => {
    if (user?.role === "admin") return { label: "ADMIN PORTAL", bg: "#334155", color: "#f8fafc" };
    if (user?.role === "doctor") return { label: "DOCTOR PORTAL", bg: "#065f46", color: "#ecfdf5" };
    return { label: "PATIENT PORTAL", bg: "#115e59", color: "#ccfbf1" };
  };

  const badge = getRoleBadge();

  return (
    <header
      style={{
        background: getBrandColor(),
        padding: "0 28px",
        height: 68,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Brand & Role */}
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ color: "#ffffff", fontWeight: 800, fontSize: 22, letterSpacing: "-0.5px", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 26 }}>🏥</span>
          <span>MedBook</span>
        </div>
        <span
          style={{
            fontSize: 10,
            fontWeight: 800,
            letterSpacing: "0.08em",
            padding: "4px 10px",
            borderRadius: 20,
            background: badge.bg,
            color: badge.color,
          }}
        >
          {badge.label}
        </span>
      </div>

      {/* Nav Actions / Extra Controls */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {extraActions}

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          title={theme.mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          style={{
            background: "rgba(255,255,255,0.12)",
            border: "1px solid rgba(255,255,255,0.25)",
            color: "#ffffff",
            width: 34,
            height: 34,
            borderRadius: "50%",
            cursor: "pointer",
            fontSize: 15,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {theme.mode === "dark" ? "☀️" : "🌙"}
        </button>

        {/* User Info & Logout */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, paddingLeft: 12, borderLeft: "1px solid rgba(255,255,255,0.2)" }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.2)",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: 14,
            }}
          >
            {user?.name ? user.name.slice(0, 2).toUpperCase() : "US"}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: "#ffffff", fontWeight: 600, fontSize: 13 }}>
              {user?.name || "User"}
            </span>
            <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 11 }}>
              {user?.specialty || user?.email}
            </span>
          </div>
          <button
            onClick={onLogout}
            style={{
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.25)",
              color: "#ffffff",
              padding: "6px 14px",
              borderRadius: 8,
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 600,
              marginLeft: 8,
              transition: "all 0.15s",
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
