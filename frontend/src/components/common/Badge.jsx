import React from "react";
import { STATUS_COLORS } from "../../constants/data";

export default function Badge({ status, text }) {
  const style = STATUS_COLORS[status] || {
    bg: "#f5f5f4",
    text: "#78716c",
    border: "#e7e5e4",
    dot: "#a8a29e",
    label: status,
  };

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "4px 12px",
        borderRadius: 20,
        fontSize: 12,
        fontWeight: 600,
        background: style.bg,
        color: style.text,
        border: `1px solid ${style.border || "transparent"}`,
        boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
        textTransform: "capitalize",
        whiteSpace: "nowrap",
      }}
    >
      <span
        style={{
          width: 7,
          height: 7,
          borderRadius: "50%",
          background: style.dot,
          display: "inline-block",
        }}
      />
      {text || style.label || status}
    </span>
  );
}
