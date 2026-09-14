import React from "react";
import { SPECIALTIES, CITIES } from "../../constants/data";

export default function DoctorRegister({ form, setForm, onSubmit, error, submitting }) {
  const setField = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const specialties = SPECIALTIES.filter((s) => s !== "All");

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ background: "#fefce8", border: "1px solid #fef08a", padding: "10px 14px", borderRadius: 10, fontSize: 12, color: "#854d0e" }}>
        ℹ️ <strong>Doctor Registration:</strong> Your account will be submitted for <strong>Admin Approval</strong> before you can log in.
      </div>

      <div>
        <label style={labelStyle}>Doctor Full Name *</label>
        <input
          style={inputStyle}
          placeholder="e.g. Dr. Priya Sharma"
          value={form.name || ""}
          onChange={setField("name")}
          required
        />
      </div>

      <div style={{ display: "flex", gap: 12 }}>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Specialty *</label>
          <select style={inputStyle} value={form.specialty || specialties[0]} onChange={setField("specialty")} required>
            {specialties.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Experience *</label>
          <input
            style={inputStyle}
            placeholder="e.g. 8 yrs"
            value={form.experience || ""}
            onChange={setField("experience")}
            required
          />
        </div>
      </div>

      <div style={{ display: "flex", gap: 12 }}>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Consultation Fee (₹) *</label>
          <input
            type="number"
            style={inputStyle}
            placeholder="e.g. 700"
            value={form.fee || ""}
            onChange={setField("fee")}
            required
          />
        </div>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Medical License No. *</label>
          <input
            style={inputStyle}
            placeholder="e.g. MCI-987654"
            value={form.license || ""}
            onChange={setField("license")}
            required
          />
        </div>
      </div>

      <div>
        <label style={labelStyle}>Phone Number *</label>
        <input
          style={inputStyle}
          placeholder="+91 98765 43210"
          value={form.phone || ""}
          onChange={setField("phone")}
          required
        />
      </div>

      <div style={{ display: "flex", gap: 12 }}>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>City *</label>
          <select style={inputStyle} value={form.city || CITIES[1]} onChange={setField("city")} required>
            {CITIES.filter((c) => c !== "All Cities").map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div style={{ flex: 2 }}>
          <label style={labelStyle}>Clinic / Hospital Name</label>
          <input
            style={inputStyle}
            placeholder="e.g. City Health Hospital"
            value={form.clinic || ""}
            onChange={setField("clinic")}
          />
        </div>
      </div>

      <div>
        <label style={labelStyle}>Email Address *</label>
        <input
          type="email"
          style={inputStyle}
          placeholder="doctor@medbook.in"
          value={form.email || ""}
          onChange={setField("email")}
          required
        />
      </div>

      <div>
        <label style={labelStyle}>Password *</label>
        <input
          type="password"
          style={inputStyle}
          placeholder="Create password"
          value={form.password || ""}
          onChange={setField("password")}
          required
        />
      </div>

      {error && <div style={errorStyle}>{error}</div>}

      <button type="submit" disabled={submitting} style={{ ...btnStyle, opacity: submitting ? 0.6 : 1, cursor: submitting ? "not-allowed" : "pointer" }}>
        {submitting ? "Submitting…" : "Submit Registration for Approval"}
      </button>
    </form>
  );
}

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

const errorStyle = {
  background: "#fef2f2",
  color: "#991b1b",
  padding: "10px 14px",
  borderRadius: 8,
  fontSize: 13,
  fontWeight: 600,
};

const btnStyle = {
  background: "#047857",
  color: "#ffffff",
  border: "none",
  padding: "12px",
  borderRadius: 10,
  fontWeight: 700,
  fontSize: 15,
  cursor: "pointer",
  marginTop: 6,
};
