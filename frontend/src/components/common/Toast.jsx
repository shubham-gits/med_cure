import React, { useEffect } from "react";

export default function Toast({ msg, type = "success", onDone }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDone();
    }, 3500);
    return () => clearTimeout(timer);
  }, [onDone]);

  const isSuccess = type === "success";

  return (
    <div
      style={{
        position: "fixed",
        bottom: 28,
        right: 28,
        zIndex: 2000,
        background: isSuccess ? "#0f766e" : "#e11d48",
        color: "#ffffff",
        padding: "14px 22px",
        borderRadius: 14,
        fontWeight: 600,
        fontSize: 14,
        boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        display: "flex",
        alignItems: "center",
        gap: 10,
        animation: "slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <span style={{ fontSize: 16 }}>{isSuccess ? "✓" : "✕"}</span>
      <span>{msg}</span>
    </div>
  );
}
