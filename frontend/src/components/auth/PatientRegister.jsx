import React from "react";

export default function PatientRegister({ form, setForm, onSubmit, error, submitting }) {
  const setField = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div>
        <label style={labelStyle}>Full Name *</label>
        <input
          style={inputStyle}
          placeholder="e.g. Rahul Verma"
          value={form.name || ""}
          onChange={setField("name")}
          required
        />
      </div>

      <div style={{ display: "flex", gap: 12 }}>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Age</label>
          <input
            type="number"
            style={inputStyle}
            placeholder="Age"
            value={form.age || ""}
            onChange={setField("age")}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Gender</label>
          <select style={inputStyle} value={form.gender || "Male"} onChange={setField("gender")}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
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

      <div>
        <label style={labelStyle}>Email Address *</label>
        <input
          type="email"
          style={inputStyle}
          placeholder="you@email.com"
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
        {submitting ? "Creating Account…" : "Create Patient Account"}
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
  background: "#0f766e",
  color: "#ffffff",
  border: "none",
  padding: "12px",
  borderRadius: 10,
  fontWeight: 700,
  fontSize: 15,
  cursor: "pointer",
  marginTop: 6,
};
