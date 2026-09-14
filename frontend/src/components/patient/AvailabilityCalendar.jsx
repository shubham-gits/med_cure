import React from "react";

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Shows the next 14 days as a mini calendar strip, highlighting days that
// match the doctor's usual working days (doctor.available, e.g. ["Mon","Wed","Fri"]).
// Days outside that list are still clickable (a doctor might take a walk-in),
// just visually de-emphasized so the patient can see the doctor's normal pattern.
export default function AvailabilityCalendar({ doctor, selectedDate, onSelectDate }) {
  const availableDays = doctor.available || [];

  const days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const iso = d.toISOString().split("T")[0];
    const dayName = DAY_NAMES[d.getDay()];
    return {
      iso,
      dayName,
      dateNum: d.getDate(),
      isUsualDay: availableDays.includes(dayName),
      isSelected: iso === selectedDate,
    };
  });

  return (
    <div>
      <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 4 }}>
        {days.map((d) => (
          <button
            key={d.iso}
            type="button"
            onClick={() => onSelectDate(d.iso)}
            style={{
              flexShrink: 0,
              width: 52,
              padding: "8px 4px",
              borderRadius: 10,
              border: `1.5px solid ${d.isSelected ? "#0f766e" : d.isUsualDay ? "#99f6e4" : "#e2e8f0"}`,
              background: d.isSelected ? "#0f766e" : d.isUsualDay ? "#f0fdfa" : "#ffffff",
              color: d.isSelected ? "#ffffff" : d.isUsualDay ? "#0f766e" : "#94a3b8",
              cursor: "pointer",
              textAlign: "center",
              transition: "all 0.15s",
            }}
          >
            <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase" }}>{d.dayName}</div>
            <div style={{ fontSize: 15, fontWeight: 800, marginTop: 2 }}>{d.dateNum}</div>
          </button>
        ))}
      </div>
      <div style={{ display: "flex", gap: 14, marginTop: 8, fontSize: 11, color: "#64748b" }}>
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ width: 9, height: 9, borderRadius: 3, background: "#f0fdfa", border: "1.5px solid #99f6e4", display: "inline-block" }} />
          Usually available
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ width: 9, height: 9, borderRadius: 3, background: "#ffffff", border: "1.5px solid #e2e8f0", display: "inline-block" }} />
          Not a usual day (ask clinic first)
        </span>
      </div>
    </div>
  );
}
