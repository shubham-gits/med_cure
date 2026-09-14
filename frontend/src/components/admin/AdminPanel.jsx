import React, { useState, useEffect } from "react";
import Navbar from "../common/Navbar";
import AdminDashboard from "./AdminDashboard";
import AdminApprovals from "./AdminApprovals";
import AdminDoctors from "./AdminDoctors";
import AdminPatients from "./AdminPatients";
import AdminAppointments from "./AdminAppointments";
import Toast from "../common/Toast";
import { fetchDoctors, updateDoctorStatus, fetchAppointments, updateAppointment } from "../../utils/api";
import { useTheme } from "../../context/ThemeContext";

export default function AdminPanel({ onLogout }) {
  const { theme } = useTheme();
  const [tab, setTab] = useState("dashboard");
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "success") => setToast({ msg, type });

  useEffect(() => {
    Promise.all([fetchDoctors(), fetchAppointments()])
      .then(([docs, apts]) => {
        setDoctors(docs);
        setAppointments(apts);
      })
      .catch((err) => showToast(err.message, "error"))
      .finally(() => setLoading(false));
  }, []);

  const pendingCount = doctors.filter((d) => d.status === "pending_approval").length;

  const handleApproveDoctor = async (doctorId) => {
    try {
      const updated = await updateDoctorStatus(doctorId, "approved");
      setDoctors(updated);
      showToast("Doctor application APPROVED successfully! Access granted.");
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  const handleRejectDoctor = async (doctorId) => {
    try {
      const updated = await updateDoctorStatus(doctorId, "rejected");
      setDoctors(updated);
      showToast("Doctor application rejected.", "error");
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  const handleToggleDoctorStatus = async (doctorId, newStatus) => {
    try {
      const updated = await updateDoctorStatus(doctorId, newStatus);
      setDoctors(updated);
      showToast(`Doctor status changed to ${newStatus}`);
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  const handleUpdateAptStatus = async (aptId, status) => {
    try {
      const updatedApt = await updateAppointment(aptId, { status });
      setAppointments((prev) => prev.map((a) => (a.id === aptId ? updatedApt : a)));
      showToast(`Appointment status changed to ${status}`);
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  const TABS = [
    { id: "dashboard", label: "Executive Dashboard" },
    { id: "approvals", label: `Doctor Approvals ${pendingCount > 0 ? `(${pendingCount})` : ""}` },
    { id: "doctors", label: `Doctor Directory (${doctors.length})` },
    { id: "patients", label: "Patient Directory" },
    { id: "appointments", label: "System Appointments" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: theme.pageBg, color: theme.text, fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <Navbar user={{ name: "Platform Admin", role: "admin", email: "admin@medbook.in" }} activeTab={tab} onTabChange={setTab} onLogout={onLogout} />

      {/* Subnav Tabs */}
      <div style={{ background: theme.cardBg, borderBottom: `1px solid ${theme.border}`, padding: "0 28px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", gap: 4, overflowX: "auto" }}>
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                padding: "14px 18px",
                border: "none",
                background: "transparent",
                borderBottom: tab === t.id ? "3px solid #0f172a" : "3px solid transparent",
                color: tab === t.id ? "#0f172a" : "#64748b",
                fontWeight: tab === t.id ? 700 : 600,
                fontSize: 13,
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.15s",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <main style={{ padding: "32px 28px", maxWidth: 1200, margin: "0 auto" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: 60, color: "#64748b" }}>Loading platform data…</div>
        ) : (
          <>
            {tab === "dashboard" && (
              <AdminDashboard
                doctors={doctors}
                appointments={appointments}
                onGoToTab={setTab}
                onApproveDoctor={handleApproveDoctor}
              />
            )}

            {tab === "approvals" && (
              <AdminApprovals
                doctors={doctors}
                appointments={appointments}
                onApprove={handleApproveDoctor}
                onReject={handleRejectDoctor}
              />
            )}

            {tab === "doctors" && (
              <AdminDoctors
                doctors={doctors}
                appointments={appointments}
                onToggleStatus={handleToggleDoctorStatus}
              />
            )}

            {tab === "patients" && <AdminPatients appointments={appointments} />}

            {tab === "appointments" && (
              <AdminAppointments
                appointments={appointments}
                onUpdateStatus={handleUpdateAptStatus}
              />
            )}
          </>
        )}
      </main>

      {toast && <Toast msg={toast.msg} type={toast.type} onDone={() => setToast(null)} />}
    </div>
  );
}
