import React from "react";

export default function LoginForm({ form, setForm, onSubmit, error, role, submitting }) {
  const setField = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div>
        <label style={labelStyle}>Email Address</label>
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
        <label style={labelStyle}>Password</label>
        <input
          type="password"
          style={inputStyle}
          placeholder="Enter password"
          value={form.password || ""}
          onChange={setField("password")}
          required
        />
      </div>

      {error && <div style={errorStyle}>{error}</div>}

      <button type="submit" disabled={submitting} style={{ ...btnStyle(role), opacity: submitting ? 0.6 : 1, cursor: submitting ? "not-allowed" : "pointer" }}>
        {submitting ? "Signing in…" : `Sign In as ${role.charAt(0).toUpperCase() + role.slice(1)}`}
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
  padding: "11px 14px",
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

const btnStyle = (role) => ({
  background: role === "admin" ? "#0f172a" : role === "doctor" ? "#047857" : "#0f766e",
  color: "#ffffff",
  border: "none",
  padding: "12px",
  borderRadius: 10,
  fontWeight: 700,
  fontSize: 15,
  cursor: "pointer",
  marginTop: 6,
});
