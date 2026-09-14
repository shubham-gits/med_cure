import React, { useState, useEffect } from "react";
import Navbar from "../common/Navbar";
import PatientDashboard from "./PatientDashboard";
import DoctorList from "./DoctorList";
import PatientAppointments from "./PatientAppointments";
import PatientProfile from "./PatientProfile";
import BookingModal from "./BookingModal";
import Toast from "../common/Toast";
import NotificationBell from "../common/NotificationBell";
import { fetchAppointments, fetchDoctors, createAppointment, updateAppointment } from "../../utils/api";
import { useTheme } from "../../context/ThemeContext";

export default function PatientPortal({ user, onLogout }) {
  const { theme } = useTheme();
  const [tab, setTab] = useState("home");
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBookingModal, setShowBookingModal] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "success") => setToast({ msg, type });

  useEffect(() => {
    Promise.all([fetchAppointments(), fetchDoctors()])
      .then(([apts, docs]) => {
        setAppointments(apts);
        setDoctors(docs);
      })
      .catch((err) => showToast(err.message, "error"))
      .finally(() => setLoading(false));
  }, []);

  const myAppointments = appointments; // API already scopes to this patient

  const handleBookConfirm = async (bookingData) => {
    try {
      const newApt = await createAppointment(bookingData);
      setAppointments((prev) => [newApt, ...prev]);
      setShowBookingModal(null);
      showToast("Appointment booked! Sent to doctor for confirmation.");
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  const handleCancelApt = async (aptId) => {
    try {
      const updated = await updateAppointment(aptId, { status: "cancelled" });
      setAppointments((prev) => prev.map((a) => (a.id === aptId ? updated : a)));
      showToast("Appointment cancelled successfully.");
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  const TABS = [
    { id: "home", label: "Home" },
    { id: "doctors", label: "Find Doctors" },
    { id: "appointments", label: `My Consultations (${myAppointments.length})` },
    { id: "profile", label: "Profile" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: theme.pageBg, color: theme.text, fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <Navbar
        user={user}
        onLogout={onLogout}
        extraActions={<NotificationBell appointments={appointments} role="patient" />}
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
                borderBottom: tab === t.id ? "3px solid #0f766e" : "3px solid transparent",
                color: tab === t.id ? "#0f766e" : "#64748b",
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

      {/* Main Page Container */}
      <main style={{ padding: "32px 28px", maxWidth: 1200, margin: "0 auto" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: 60, color: "#64748b" }}>Loading your consultations…</div>
        ) : (
          <>
            {tab === "home" && (
              <PatientDashboard
                user={user}
                myAppointments={myAppointments}
                onGoToTab={setTab}
              />
            )}

            {tab === "doctors" && <DoctorList doctors={doctors} onBook={setShowBookingModal} />}

            {tab === "appointments" && (
              <PatientAppointments
                myAppointments={myAppointments}
                doctors={doctors}
                onCancel={handleCancelApt}
              />
            )}

            {tab === "profile" && (
              <PatientProfile user={user} myAppointments={myAppointments} />
            )}
          </>
        )}
      </main>

      {/* Booking Modal */}
      {showBookingModal && (
        <BookingModal
          doctor={showBookingModal}
          patient={user}
          appointments={appointments}
          onConfirm={handleBookConfirm}
          onClose={() => setShowBookingModal(null)}
        />
      )}

      {toast && <Toast msg={toast.msg} type={toast.type} onDone={() => setToast(null)} />}
    </div>
  );
}
