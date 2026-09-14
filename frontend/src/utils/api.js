const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4001";

const SESSION_KEY = "mb_session_v3"; // { token, user }

// ---------------- Session (kept in sessionStorage, same as before) ----------------

export function getSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setSession(token, user) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify({ token, user }));
}

export function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
}

// ---------------- Core fetch wrapper ----------------

async function apiFetch(path, options = {}) {
  const session = getSession();
  const headers = {
    "Content-Type": "application/json",
    ...(session?.token ? { Authorization: `Bearer ${session.token}` } : {}),
    ...(options.headers || {}),
  };

  const res = await fetch(`${API_URL}${path}`, { ...options, headers });

  // If the token is invalid/expired, force back to a logged-out state
  // rather than leaving the app stuck showing stale authenticated data.
  if (res.status === 401 && session) {
    clearSession();
    window.location.reload();
    return new Promise(() => {}); // reload is in flight; stop further handling
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.message || data.error || "Request failed.");
    err.code = data.error;
    throw err;
  }
  return data;
}

// ---------------- Auth ----------------

export async function login(role, email, password) {
  return apiFetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ role, email, password }),
  });
}

export async function registerPatient(formData) {
  return apiFetch("/api/auth/register/patient", {
    method: "POST",
    body: JSON.stringify(formData),
  });
}

export async function registerDoctor(formData) {
  return apiFetch("/api/auth/register/doctor", {
    method: "POST",
    body: JSON.stringify(formData),
  });
}

// ---------------- Doctors ----------------

export async function fetchDoctors() {
  return apiFetch("/api/doctors");
}

export async function updateDoctorStatus(doctorId, status) {
  return apiFetch(`/api/doctors/${doctorId}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

export async function updateDoctorProfile(doctorId, updateData) {
  return apiFetch(`/api/doctors/${doctorId}`, {
    method: "PATCH",
    body: JSON.stringify(updateData),
  });
}

// ---------------- Patients ----------------

export async function fetchPatients() {
  return apiFetch("/api/patients");
}

// ---------------- Appointments ----------------

export async function fetchAppointments() {
  return apiFetch("/api/appointments");
}

export async function createAppointment(aptData) {
  return apiFetch("/api/appointments", {
    method: "POST",
    body: JSON.stringify(aptData),
  });
}

export async function updateAppointment(aptId, updateData) {
  return apiFetch(`/api/appointments/${aptId}`, {
    method: "PATCH",
    body: JSON.stringify(updateData),
  });
}

export async function fetchQueueEstimate(doctorId, date, time) {
  const params = new URLSearchParams({ doctorId, date, time });
  return apiFetch(`/api/appointments/queue?${params.toString()}`);
}
