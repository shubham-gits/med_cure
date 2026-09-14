import React, { useState, useEffect } from "react";
import Navbar from "../common/Navbar";
import DoctorDashboard from "./DoctorDashboard";
import DoctorAppointments from "./DoctorAppointments";
import DoctorSchedule from "./DoctorSchedule";
import DoctorProfile from "./DoctorProfile";
import Toast from "../common/Toast";
import NotificationBell from "../common/NotificationBell";
import { fetchAppointments, updateAppointment, updateDoctorProfile } from "../../utils/api";
import { CLINIC_STATUS_TOKENS } from "../../constants/data";
import { useTheme } from "../../context/ThemeContext";

export default function DoctorPortal({ user, onLogout }) {
  const { theme } = useTheme();
  const [tab, setTab] = useState("dashboard");
  const [doctor, setDoctor] = useState(user);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "success") => setToast({ msg, type });

  useEffect(() => {
    fetchAppointments()
      .then(setAppointments)
      .catch((err) => showToast(err.message, "error"))
      .finally(() => setLoading(false));
  }, []);

  const handleUpdateStatus = async (aptId, status, extraFields = {}) => {
    try {
      const updated = await updateAppointment(aptId, { status, ...extraFields });
      setAppointments((prev) => prev.map((a) => (a.id === aptId ? updated : a)));
      showToast(`Appointment status updated to ${status}!`);
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  const handleClinicStatusChange = async (newStatus) => {
    try {
      const updatedDoc = await updateDoctorProfile(doctor.id, { clinicStatus: newStatus });
      setDoctor((prev) => ({ ...prev, ...updatedDoc }));
      const label = CLINIC_STATUS_TOKENS[newStatus]?.label || newStatus;
      showToast(`Clinic status set to: ${label}`);
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  const currentClinicStatus = CLINIC_STATUS_TOKENS[doctor.clinicStatus] || CLINIC_STATUS_TOKENS.in_clinic;

  const TABS = [
    { id: "dashboard", label: "Dashboard" },
    { id: "appointments", label: "Patient Requests" },
    { id: "schedule", label: "Clinic Schedule & Fees" },
    { id: "profile", label: "Doctor Profile" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: theme.pageBg, color: theme.text, fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <Navbar
        user={doctor}
        activeTab={tab}
        onTabChange={setTab}
        onLogout={onLogout}
        extraActions={
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* Clinic Status Selector Dropdown */}
            <select
              value={doctor.clinicStatus || "in_clinic"}
              onChange={(e) => handleClinicStatusChange(e.target.value)}
              style={{
                background: currentClinicStatus.bg,
                color: currentClinicStatus.text,
                border: "1px solid rgba(255,255,255,0.3)",
                padding: "6px 12px",
                borderRadius: 20,
                fontWeight: 800,
                fontSize: 12,
                cursor: "pointer",
                outline: "none",
              }}
            >
              <option value="in_clinic">🟢 In Clinic (Seeing Patients)</option>
              <option value="in_surgery">🟡 In Procedure / Surgery</option>
              <option value="emergency_call">🔴 Out on Emergency Call</option>
              <option value="clinic_closed">⚪ Clinic Closed Today</option>
            </select>
            <NotificationBell appointments={appointments} role="doctor" />
          </div>
        }
      />

      {/* Subnav Tabs */}
      <div style={{ background: theme.cardBg, borderBottom: `1px solid ${theme.border}`, padding: "0 28px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", gap: 4 }}>
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                padding: "14px 20px",
                border: "none",
                background: "transparent",
                borderBottom: tab === t.id ? "3px solid #047857" : "3px solid transparent",
                color: tab === t.id ? "#047857" : "#64748b",
                fontWeight: tab === t.id ? 700 : 600,
                fontSize: 14,
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Page Content Container */}
      <main style={{ padding: "32px 28px", maxWidth: 1200, margin: "0 auto" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: 60, color: "#64748b" }}>Loading your appointments…</div>
        ) : (
          <>
            {tab === "dashboard" && (
              <DoctorDashboard
                doctor={doctor}
                appointments={appointments}
                onUpdateStatus={handleUpdateStatus}
                onGoToTab={setTab}
              />
            )}
            {tab === "appointments" && (
              <DoctorAppointments
                doctor={doctor}
                appointments={appointments}
                onUpdateStatus={handleUpdateStatus}
              />
            )}
            {tab === "schedule" && (
              <DoctorSchedule doctor={doctor} onUpdateDoctor={setDoctor} />
            )}
            {tab === "profile" && (
              <DoctorProfile doctor={doctor} appointments={appointments} />
            )}
          </>
        )}
      </main>

      {toast && <Toast msg={toast.msg} type={toast.type} onDone={() => setToast(null)} />}
    </div>
  );
}
