import React, { useState, useMemo, useRef, useEffect } from "react";

// Builds a list of "reminder" items from appointments, scoped to the
// viewer's role — patients see their own upcoming visits, doctors see
// today's confirmed/pending visits. This is an in-app notification, not
// a real SMS/email — that would require a paid service (Twilio/SendGrid).
function buildReminders(appointments, role) {
  const now = new Date();
  const in24h = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  if (role === "patient") {
    return appointments
      .filter((a) => a.status === "confirmed" || a.status === "pending")
      .filter((a) => {
        const aptDate = new Date(`${a.date}T${a.time || "00:00"}`);
        return aptDate >= now && aptDate <= in24h;
      })
      .map((a) => ({
        id: a.id,
        title: `Upcoming visit: ${a.doctorName}`,
        detail: `${a.date} at ${a.time} — ${a.specialty || ""}`,
      }));
  }

  if (role === "doctor") {
    const todayStr = now.toISOString().split("T")[0];
    return appointments
      .filter((a) => a.date === todayStr && (a.status === "confirmed" || a.status === "pending"))
      .map((a) => ({
        id: a.id,
        title: a.status === "pending" ? `New request: ${a.patientName}` : `Today: ${a.patientName}`,
        detail: `${a.time} — ${a.reason || "No reason given"}`,
      }));
  }

  return [];
}

export default function NotificationBell({ appointments, role }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const reminders = useMemo(() => buildReminders(appointments || [], role), [appointments, role]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        title="Reminders"
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
          position: "relative",
        }}
      >
        🔔
        {reminders.length > 0 && (
          <span
            style={{
              position: "absolute",
              top: -3,
              right: -3,
              background: "#ef4444",
              color: "#ffffff",
              borderRadius: "50%",
              width: 16,
              height: 16,
              fontSize: 10,
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1.5px solid #ffffff",
            }}
          >
            {reminders.length}
          </span>
        )}
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: 44,
            right: 0,
            width: 300,
            background: "#ffffff",
            borderRadius: 14,
            boxShadow: "0 20px 40px rgba(0,0,0,0.18)",
            border: "1px solid #e2e8f0",
            zIndex: 200,
            overflow: "hidden",
          }}
        >
          <div style={{ padding: "12px 16px", borderBottom: "1px solid #f1f5f9", fontWeight: 800, fontSize: 13, color: "#0f172a" }}>
            Reminders
          </div>
          {reminders.length === 0 ? (
            <div style={{ padding: "20px 16px", fontSize: 13, color: "#94a3b8", textAlign: "center" }}>
              Nothing new right now.
            </div>
          ) : (
            <div style={{ maxHeight: 260, overflowY: "auto" }}>
              {reminders.map((r) => (
                <div key={r.id} style={{ padding: "10px 16px", borderBottom: "1px solid #f8fafc" }}>
                  <div style={{ fontWeight: 700, fontSize: 13, color: "#0f172a" }}>{r.title}</div>
                  <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>{r.detail}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
