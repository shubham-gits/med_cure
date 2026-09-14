import React, { useState } from "react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import LandingPage from "./components/public/LandingPage";
import AuthScreen from "./components/auth/AuthScreen";
import PatientPortal from "./components/patient/PatientPortal";
import DoctorPortal from "./components/doctor/DoctorPortal";
import AdminPanel from "./components/admin/AdminPanel";
import { getSession, setSession, clearSession } from "./utils/api";

export default function App() {
  // Trust the locally stored session optimistically (standard practice) —
  // if the token has actually expired, the first API call will get a 401
  // and api.js will clear the session and reload automatically.
  const [session, setSessionState] = useState(() => getSession());
  const [view, setView] = useState("home"); // home | auth
  const [authConfig, setAuthConfig] = useState({ role: "patient", mode: "login" });

  const user = session?.user ? { ...session.user, role: session.user.role } : null;

  const handleOpenAuth = (role = "patient", mode = "login") => {
    setAuthConfig({ role, mode });
    setView("auth");
  };

  const handleLogin = (token, loggedInUser) => {
    setSession(token, loggedInUser);
    setSessionState({ token, user: loggedInUser });
    setView("home");
  };

  const handleLogout = () => {
    clearSession();
    setSessionState(null);
    setView("home");
  };

  // 1. Authenticated User Views
  let content;
  if (user) {
    if (user.role === "admin") {
      content = <AdminPanel onLogout={handleLogout} />;
    } else if (user.role === "doctor") {
      content = <DoctorPortal user={user} onLogout={handleLogout} />;
    } else {
      content = <PatientPortal user={user} onLogout={handleLogout} />;
    }
  } else if (view === "auth") {
    // 2. Unauthenticated Public Views: Landing Page or Auth Screen
    content = (
      <AuthScreen
        onLogin={handleLogin}
        initialRole={authConfig.role}
        initialMode={authConfig.mode}
        onBackToHome={() => setView("home")}
      />
    );
  } else {
    content = <LandingPage onOpenAuth={handleOpenAuth} />;
  }

  return (
    <>
      {content}
      <SpeedInsights />
    </>
  );
}
