import React, { useState } from "react";
import PatientRegister from "./PatientRegister";
import DoctorRegister from "./DoctorRegister";
import LoginForm from "./LoginForm";
import { login, registerPatient, registerDoctor } from "../../utils/api";

export default function AuthScreen({ onLogin, initialRole = "patient", initialMode = "login", onBackToHome }) {
  const [role, setRole] = useState(initialRole); // patient | doctor | admin
  const [mode, setMode] = useState(initialMode);   // login | register
  const [form, setForm] = useState({});
  const [error, setError] = useState("");
  const [approvalNotice, setApprovalNotice] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleAuth = async () => {
    setError("");
    setApprovalNotice(null);

    if (mode === "login") {
      if (!form.email || !form.password) {
        return setError("Please enter your email and password.");
      }
      setSubmitting(true);
      try {
        const { token, user } = await login(role, form.email, form.password);
        onLogin(token, user);
      } catch (err) {
        if (err.code === "pending_approval") {
          setApprovalNotice({ type: "pending", title: "Approval Pending", msg: err.message });
        } else {
          setError(err.message || "Invalid credentials.");
        }
      } finally {
        setSubmitting(false);
      }
      return;
    }

    // Registration
    if (role === "doctor") {
      if (!form.name || !form.email || !form.password || !form.specialty || !form.license || !form.phone || !form.fee) {
        return setError("Please fill in all required fields.");
      }
      setSubmitting(true);
      try {
        const result = await registerDoctor(form);
        setApprovalNotice({
          type: "success",
          title: "Registration Submitted!",
          msg: result.message,
        });
        setForm({});
      } catch (err) {
        setError(err.message || "Registration failed.");
      } finally {
        setSubmitting(false);
      }
      return;
    }

    if (role === "patient") {
      if (!form.name || !form.email || !form.password || !form.phone) {
        return setError("Please fill in all required fields.");
      }
      setSubmitting(true);
      try {
        const { token, user } = await registerPatient(form);
        onLogin(token, user);
      } catch (err) {
        setError(err.message || "Registration failed.");
      } finally {
        setSubmitting(false);
      }
    }
  };

  const fillDemo = (demoRole) => {
    setError("");
    setApprovalNotice(null);
    setRole(demoRole);
    setMode("login");
    if (demoRole === "admin") {
      setForm({ email: "admin@medbook.in", password: "admin123" });
    } else if (demoRole === "doctor") {
      setForm({ email: "priya@medbook.in", password: "doc123" });
    } else {
      setForm({ email: "rahul@gmail.com", password: "patient123" });
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f766e 0%, #0f172a 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        fontFamily: "'DM Sans', system-ui, sans-serif",
        position: "relative",
      }}
    >
      {/* Back to Home button */}
      {onBackToHome && (
        <button
          onClick={onBackToHome}
          style={{
            position: "absolute",
            top: 24,
            left: 28,
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.25)",
            color: "#ffffff",
            padding: "8px 16px",
            borderRadius: 20,
            fontSize: 13,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          ← Back to Homepage
        </button>
      )}

      <div style={{ width: "100%", maxWidth: 460 }}>
        {/* Brand Header */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div
            style={{
              width: 58,
              height: 58,
              borderRadius: 18,
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(10px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              margin: "0 auto 10px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
            }}
          >
            🏥
          </div>
          <h1 style={{ color: "#ffffff", margin: 0, fontSize: 30, fontWeight: 800, letterSpacing: "-1px" }}>
            MedBook Portal
          </h1>
          <p style={{ color: "rgba(255,255,255,0.75)", margin: "4px 0 0", fontSize: 13 }}>
            Sign in or register to manage your consultations
          </p>
        </div>

        {/* Auth Card */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: 24,
            padding: 30,
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          {/* Role Selector Tabs */}
          <div
            style={{
              display: "flex",
              background: "#f1f5f9",
              borderRadius: 12,
              padding: 4,
              marginBottom: 18,
            }}
          >
            {[
              { id: "patient", label: "Patient" },
              { id: "doctor", label: "Doctor" },
              { id: "admin", label: "Admin" },
            ].map((r) => (
              <button
                key={r.id}
                onClick={() => {
                  setRole(r.id);
                  setError("");
                  setApprovalNotice(null);
                  if (r.id === "admin") setMode("login");
                }}
                style={{
                  flex: 1,
                  padding: "9px 6px",
                  borderRadius: 9,
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 700,
                  fontSize: 13,
                  background: role === r.id ? "#ffffff" : "transparent",
                  color: role === r.id ? "#0f172a" : "#64748b",
                  boxShadow: role === r.id ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
                  transition: "all 0.15s",
                }}
              >
                {r.label}
              </button>
            ))}
          </div>

          {/* Login / Register Toggle (For Patient & Doctor) */}
          {role !== "admin" && (
            <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
              {[
                { id: "login", label: "Sign In" },
                { id: "register", label: role === "doctor" ? "Register as Doctor" : "Register as Patient" },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    setMode(m.id);
                    setError("");
                    setApprovalNotice(null);
                  }}
                  style={{
                    flex: 1,
                    padding: "8px",
                    border: `1.5px solid ${mode === m.id ? (role === "doctor" ? "#047857" : "#0f766e") : "#e2e8f0"}`,
                    borderRadius: 8,
                    cursor: "pointer",
                    fontWeight: 600,
                    fontSize: 13,
                    background: mode === m.id ? (role === "doctor" ? "#ecfdf5" : "#ccfbf1") : "#ffffff",
                    color: mode === m.id ? (role === "doctor" ? "#047857" : "#0f766e") : "#64748b",
                  }}
                >
                  {m.label}
                </button>
              ))}
            </div>
          )}

          {/* Pending Approval / Notice Banner */}
          {approvalNotice && (
            <div
              style={{
                background: approvalNotice.type === "success" ? "#f0fdf4" : "#fefce8",
                border: `1px solid ${approvalNotice.type === "success" ? "#bbf7d0" : "#fef08a"}`,
                borderRadius: 12,
                padding: 14,
                marginBottom: 18,
              }}
            >
              <h4 style={{ margin: "0 0 4px", color: approvalNotice.type === "success" ? "#166534" : "#854d0e", fontWeight: 700 }}>
                {approvalNotice.title}
              </h4>
              <p style={{ margin: 0, fontSize: 13, color: approvalNotice.type === "success" ? "#15803d" : "#a16207", lineHeight: 1.4 }}>
                {approvalNotice.msg}
              </p>
            </div>
          )}

          {/* Form Renderer */}
          {mode === "register" && role === "doctor" ? (
            <DoctorRegister form={form} setForm={setForm} onSubmit={handleAuth} error={error} submitting={submitting} />
          ) : mode === "register" && role === "patient" ? (
            <PatientRegister form={form} setForm={setForm} onSubmit={handleAuth} error={error} submitting={submitting} />
          ) : (
            <LoginForm form={form} setForm={setForm} onSubmit={handleAuth} error={error} role={role} submitting={submitting} />
          )}

          {/* Demo Login Shortcuts */}
          <div style={{ marginTop: 22, paddingTop: 14, borderTop: "1px solid #f1f5f9", textAlign: "center" }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Quick Demo Logins
            </span>
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <button onClick={() => fillDemo("patient")} style={demoBtnStyle}>
                👤 Patient
              </button>
              <button onClick={() => fillDemo("doctor")} style={demoBtnStyle}>
                🩺 Doctor
              </button>
              <button onClick={() => fillDemo("admin")} style={demoBtnStyle}>
                🛡️ Admin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const demoBtnStyle = {
  flex: 1,
  padding: "6px 4px",
  background: "#f8fafc",
  border: "1px solid #e2e8f0",
  borderRadius: 8,
  fontSize: 11,
  fontWeight: 600,
  color: "#475569",
  cursor: "pointer",
};
