import React, { useState } from "react";
import { updateDoctorProfile } from "../../utils/api";
import { CITIES } from "../../constants/data";

const ALL_SLOTS = ["08:00", "09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"];
const ALL_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function DoctorSchedule({ doctor, onUpdateDoctor }) {
  const [fee, setFee] = useState(doctor.fee || 500);
  const [availableDays, setAvailableDays] = useState(doctor.available || ["Mon", "Wed", "Fri"]);
  const [slots, setSlots] = useState(doctor.slots || ["09:00", "10:00", "11:00", "14:00", "15:00"]);
  const [clinic, setClinic] = useState(doctor.clinic || "");
  const [city, setCity] = useState(doctor.city || CITIES[1]);
  const [savedMsg, setSavedMsg] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const toggleDay = (day) => {
    setAvailableDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const toggleSlot = (slot) => {
    setSlots((prev) =>
      prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot].sort()
    );
  };

  const handleSave = async () => {
    setError("");
    setSaving(true);
    try {
      const updated = await updateDoctorProfile(doctor.id, {
        fee: Number(fee),
        available: availableDays,
        slots,
        clinic,
        city,
      });
      onUpdateDoctor((prev) => ({ ...prev, ...updated }));
      setSavedMsg(true);
      setTimeout(() => setSavedMsg(false), 3000);
    } catch (err) {
      setError(err.message || "Could not save schedule.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ maxWidth: 800 }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ margin: 0, fontWeight: 800, color: "#0f172a", fontSize: 24 }}>Schedule & Practice Settings</h2>
        <p style={{ margin: "4px 0 0", fontSize: 13, color: "#64748b" }}>
          Configure your consultation fee, available working days, and hourly booking slots
        </p>
      </div>

      <div style={cardStyle}>
        {savedMsg && (
          <div style={{ background: "#f0fdf4", color: "#166534", border: "1px solid #bbf7d0", padding: "10px 16px", borderRadius: 10, marginBottom: 20, fontWeight: 600, fontSize: 14 }}>
            ✓ Schedule settings saved successfully!
          </div>
        )}
        {error && (
          <div style={{ background: "#fef2f2", color: "#991b1b", border: "1px solid #fecaca", padding: "10px 16px", borderRadius: 10, marginBottom: 20, fontWeight: 600, fontSize: 14 }}>
            {error}
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Consultation Fee, City & Clinic */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
            <div>
              <label style={labelStyle}>Consultation Fee (₹)</label>
              <input
                type="number"
                style={inputStyle}
                value={fee}
                onChange={(e) => setFee(e.target.value)}
              />
            </div>
            <div>
              <label style={labelStyle}>City</label>
              <select style={inputStyle} value={city} onChange={(e) => setCity(e.target.value)}>
                {CITIES.filter((c) => c !== "All Cities").map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Clinic / Hospital Name</label>
              <input
                style={inputStyle}
                placeholder="e.g. City Health Clinic"
                value={clinic}
                onChange={(e) => setClinic(e.target.value)}
              />
            </div>
          </div>

          {/* Working Days Selector */}
          <div>
            <label style={labelStyle}>Working Days</label>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 8 }}>
              {ALL_DAYS.map((day) => {
                const active = availableDays.includes(day);
                return (
                  <button
                    key={day}
                    onClick={() => toggleDay(day)}
                    style={{
                      padding: "8px 18px",
                      borderRadius: 10,
                      border: `1.5px solid ${active ? "#047857" : "#cbd5e1"}`,
                      background: active ? "#ecfdf5" : "#ffffff",
                      color: active ? "#047857" : "#64748b",
                      fontWeight: 700,
                      fontSize: 13,
                      cursor: "pointer",
                    }}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Available Slots Selector */}
          <div>
            <label style={labelStyle}>Active Hourly Booking Slots</label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))", gap: 8, marginTop: 8 }}>
              {ALL_SLOTS.map((slot) => {
                const active = slots.includes(slot);
                return (
                  <button
                    key={slot}
                    onClick={() => toggleSlot(slot)}
                    style={{
                      padding: "8px",
                      borderRadius: 8,
                      border: `1.5px solid ${active ? "#047857" : "#e2e8f0"}`,
                      background: active ? "#047857" : "#ffffff",
                      color: active ? "#ffffff" : "#475569",
                      fontWeight: 600,
                      fontSize: 13,
                      cursor: "pointer",
                      textAlign: "center",
                    }}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>

          <button onClick={handleSave} disabled={saving} style={{ ...saveBtnStyle, opacity: saving ? 0.6 : 1, cursor: saving ? "not-allowed" : "pointer" }}>
            {saving ? "Saving…" : "Save Schedule Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  background: "#ffffff",
  borderRadius: 16,
  padding: 28,
  border: "1px solid #e2e8f0",
  boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
};

const labelStyle = {
  fontSize: 12,
  fontWeight: 700,
  color: "#475569",
  marginBottom: 6,
  display: "block",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
};

const inputStyle = {
  width: "100%",
  padding: "10px 14px",
  border: "1.5px solid #cbd5e1",
  borderRadius: 10,
  fontSize: 14,
  background: "#f8fafc",
  color: "#0f172a",
  outline: "none",
  boxSizing: "border-box",
};

const saveBtnStyle = {
  background: "#047857",
  color: "#ffffff",
  padding: "12px 24px",
  borderRadius: 10,
  fontWeight: 700,
  fontSize: 15,
  border: "none",
  cursor: "pointer",
  marginTop: 10,
};
