# 📋 MedBook3 — Project Logbook

> **Project**: MedBook3 — In-Person Clinic OPD Booking Platform
> **Tech Stack**: React 19 + Vite 8 + Vanilla CSS
> **Location**: `c:\Users\shubh\OneDrive\ドキュメント\medbook3\medbook`
> **Dev Server**: `http://localhost:5173/`

---

## 📁 Final Project Structure

```
medbook/src/
├── App.jsx                          ← Main entry point & route controller
├── constants/
│   └── data.js                      ← All seed data, clinic info, OPD status tokens
├── utils/
│   └── storage.js                   ← LocalStorage CRUD helpers & auto-seed loader
└── components/
    ├── auth/
    │   ├── AuthScreen.jsx            ← Tabbed auth container
    │   ├── LoginForm.jsx             ← Login form (patient / doctor / admin)
    │   ├── PatientRegister.jsx       ← Patient signup form
    │   └── DoctorRegister.jsx        ← Doctor self-registration form
    ├── common/
    │   ├── Navbar.jsx                ← Header nav bar (shared across portals)
    │   ├── StatCard.jsx              ← Dashboard KPI card component
    │   ├── Badge.jsx                 ← Status indicator badge (color-coded)
    │   ├── Modal.jsx                 ← Reusable modal dialog wrapper
    │   ├── Toast.jsx                 ← Toast notification alerts
    │   ├── Charts.jsx                ← SVG BarChart, DonutChart, AreaChart
    │   ├── OPDPassModal.jsx          ← Digital OPD Entry Pass with QR code
    │   └── TokenTracker.jsx          ← Real-time OPD wait time tracker widget
    ├── public/
    │   └── LandingPage.jsx           ← Public homepage before auth
    ├── doctor/
    │   ├── DoctorPortal.jsx          ← Doctor portal layout + Clinic Status dropdown
    │   ├── DoctorDashboard.jsx       ← Doctor dashboard + Live OPD Queue Controls
    │   ├── DoctorAppointments.jsx    ← Patient slot requests + reports + prescribe
    │   ├── DoctorSchedule.jsx        ← Clinic schedule & fee editor
    │   ├── DoctorProfile.jsx         ← Doctor profile viewer
    │   └── PrescribeModal.jsx        ← Prescription & diagnosis modal
    ├── patient/
    │   ├── PatientPortal.jsx         ← Patient portal layout
    │   ├── PatientDashboard.jsx      ← Patient dashboard + health stats
    │   ├── DoctorList.jsx            ← Doctor search directory
    │   ├── DoctorCard.jsx            ← Doctor listing card with booking trigger
    │   ├── BookingModal.jsx          ← OPD booking: directions, reports, payment
    │   ├── PatientAppointments.jsx   ← Appointments: tokens, OPD pass, prescriptions
    │   └── PatientProfile.jsx        ← Patient profile
    └── admin/
        ├── AdminPanel.jsx            ← Admin portal layout
        ├── AdminDashboard.jsx        ← System analytics & charts
        ├── AdminApprovals.jsx        ← Doctor approval/rejection queue
        ├── AdminDoctors.jsx          ← Doctor directory management
        ├── AdminPatients.jsx         ← Patient directory management
        ├── AdminAppointments.jsx     ← System-wide appointment audit
        └── DoctorDetailModal.jsx     ← Admin click-to-view doctor profile modal
```

---

## 🗓️ Change Log

---

### 📌 Session 1 — Core Architecture Refactor

**Summary**: Transformed a single-file monolith into a full multi-role, modular React application.

#### Changes Made

| File | Action | Description |
|------|--------|-------------|
| `src/App.jsx` | MODIFY | Added multi-role routing: Patient / Doctor / Admin portals, LandingPage, AuthScreen |
| `src/constants/data.js` | CREATE | Seed data: doctors, patients, appointments, admin credentials, specialties |
| `src/utils/storage.js` | CREATE | LocalStorage CRUD: getPatients, getDoctors, getAppointments, saveDoctors, updateAppointmentStatus, auto-seed on first load |
| `src/components/auth/AuthScreen.jsx` | CREATE | Tabbed auth container with role selection |
| `src/components/auth/LoginForm.jsx` | CREATE | Unified login for patient / doctor / admin |
| `src/components/auth/PatientRegister.jsx` | CREATE | Patient registration form |
| `src/components/auth/DoctorRegister.jsx` | CREATE | Doctor self-registration with license number, specialty, clinic info |
| `src/components/common/Navbar.jsx` | CREATE | Shared header bar across all portals |
| `src/components/common/StatCard.jsx` | CREATE | Reusable KPI stat card with icon and trend indicator |
| `src/components/common/Badge.jsx` | CREATE | Color-coded status badge (pending / confirmed / completed / cancelled) |
| `src/components/common/Modal.jsx` | CREATE | Reusable accessible modal dialog |
| `src/components/common/Toast.jsx` | CREATE | Auto-dismiss toast notification system |
| `src/components/common/Charts.jsx` | CREATE | Custom SVG chart library: BarChart, DonutChart, AreaChart |

---

### 📌 Session 2 — Multi-Role Portal Implementation

**Summary**: Built full Patient, Doctor, and Admin portals with dashboards, appointment management, and CRUD operations.

#### Patient Portal

| File | Action | Description |
|------|--------|-------------|
| `src/components/patient/PatientPortal.jsx` | CREATE | Portal shell with nav tabs: Dashboard, Find Doctors, Appointments, Profile |
| `src/components/patient/PatientDashboard.jsx` | CREATE | KPI stats + AreaChart for appointment trends + upcoming visits |
| `src/components/patient/DoctorList.jsx` | CREATE | Searchable/filterable doctor directory with specialty chips |
| `src/components/patient/DoctorCard.jsx` | CREATE | Doctor listing card: name, specialty, rating, fee, availability, Book button |
| `src/components/patient/BookingModal.jsx` | CREATE | Date/slot/reason picker, fee display, confirms booking request |
| `src/components/patient/PatientAppointments.jsx` | CREATE | Patient appointment history with status filters |
| `src/components/patient/PatientProfile.jsx` | CREATE | Patient personal info viewer/editor |

#### Doctor Portal

| File | Action | Description |
|------|--------|-------------|
| `src/components/doctor/DoctorPortal.jsx` | CREATE | Portal shell with tab nav; verifies approved status before allowing access |
| `src/components/doctor/DoctorDashboard.jsx` | CREATE | DonutChart patient breakdown + BarChart weekly activity + stats |
| `src/components/doctor/DoctorAppointments.jsx` | CREATE | Pending slot requests with Confirm / Decline actions (Doctor not Admin) |
| `src/components/doctor/DoctorSchedule.jsx` | CREATE | Day/time slot toggler + consultation fee editor |
| `src/components/doctor/DoctorProfile.jsx` | CREATE | Doctor profile: license, education, clinic info, specialties |
| `src/components/doctor/PrescribeModal.jsx` | CREATE | Prescription & diagnosis form: mark appointment completed, write Rx |

#### Admin Portal

| File | Action | Description |
|------|--------|-------------|
| `src/components/admin/AdminPanel.jsx` | CREATE | Admin shell with role-protected access |
| `src/components/admin/AdminDashboard.jsx` | CREATE | System KPIs + multi-chart analytics overview |
| `src/components/admin/AdminApprovals.jsx` | CREATE | Doctor approval queue: Approve / Reject pending registrations |
| `src/components/admin/AdminDoctors.jsx` | CREATE | Full doctor directory with status management |
| `src/components/admin/AdminPatients.jsx` | CREATE | Patient directory with search |
| `src/components/admin/AdminAppointments.jsx` | CREATE | System-wide appointment audit log |

---

### 📌 Session 3 — Public Homepage & Admin Doctor Inspector

**Summary**: Added a polished public landing page and admin ability to inspect doctor profiles.

#### Changes Made

| File | Action | Description |
|------|--------|-------------|
| `src/components/public/LandingPage.jsx` | CREATE | Public marketing page: Hero, About Healthcare, Features, Specialties, How-It-Works, Footer |
| `src/components/admin/DoctorDetailModal.jsx` | CREATE | Admin click-to-view doctor modal: license, credentials, clinic address, analytics |
| `src/components/admin/AdminDoctors.jsx` | MODIFY | Each doctor card is now clickable — opens DoctorDetailModal |
| `src/App.jsx` | MODIFY | Route: show LandingPage before AuthScreen |

---

### 📌 Session 4 — In-Person OPD Clinic Features (5 Major Features)

**Summary**: Implemented all 5 features for real-world in-person clinic visit experience.

---

#### Feature 1: Live OPD Token Counter & Real-Time Wait Time Tracker

| File | Action | Description |
|------|--------|-------------|
| `src/constants/data.js` | MODIFY | Added nowServingToken, tokenNumber to appointment seed data |
| `src/constants/data.js` | MODIFY | Added CLINIC_STATUS_TOKENS map with color codes for each clinic state |
| `src/components/common/TokenTracker.jsx` | CREATE | Live wait widget: Token #, Now Serving, Patients Ahead, Est. Wait |
| `src/components/doctor/DoctorDashboard.jsx` | MODIFY | Added Live OPD Queue Control banner with Call Next Patient button |
| `src/components/doctor/DoctorPortal.jsx` | MODIFY | Added handleUpdateServingToken() to save token advancement to LocalStorage |
| `src/components/patient/PatientAppointments.jsx` | MODIFY | Renders TokenTracker widget for all confirmed appointments |

---

#### Feature 2: Digital OPD Entry Pass with QR Code & Payment Mode

| File | Action | Description |
|------|--------|-------------|
| `src/constants/data.js` | MODIFY | Added paymentMode field (pay_at_clinic / paid_online) to appointment seed data |
| `src/components/common/OPDPassModal.jsx` | CREATE | Digital OPD pass: Token #, Doctor info, Date/Time, Payment mode, mock QR code SVG, Print button |
| `src/components/patient/BookingModal.jsx` | MODIFY | Added Payment Mode Selector: Pay at Clinic Reception vs Paid Online |
| `src/components/patient/PatientAppointments.jsx` | MODIFY | View OPD Entry Pass button on confirmed and completed appointments |
| `src/components/doctor/DoctorAppointments.jsx` | MODIFY | Payment mode badge displayed on each appointment card |

---

#### Feature 3: Clinic Directions & Interactive Map Preview

| File | Action | Description |
|------|--------|-------------|
| `src/constants/data.js` | MODIFY | Added clinicAddress, landmark, mapsUrl fields to each seed doctor |
| `src/components/patient/BookingModal.jsx` | MODIFY | Added clinic directions card: address, landmark, Get Directions link |
| `src/components/patient/PatientAppointments.jsx` | MODIFY | Shows clinic address + Get Directions link on each appointment card |

---

#### Feature 4: Patient Medical Report File Uploader

| File | Action | Description |
|------|--------|-------------|
| `src/constants/data.js` | MODIFY | Added reports[] sample array to appointment seed data |
| `src/components/patient/BookingModal.jsx` | MODIFY | File upload input for lab reports/X-rays (stores name + size in appointment) |
| `src/components/doctor/DoctorAppointments.jsx` | MODIFY | Displays attached report chips per appointment; click-to-preview report info modal |

---

#### Feature 5: Doctor Clinic Status Toggle

| File | Action | Description |
|------|--------|-------------|
| `src/constants/data.js` | MODIFY | Added CLINIC_STATUS_TOKENS with 4 states: in_clinic, in_surgery, emergency_call, clinic_closed |
| `src/constants/data.js` | MODIFY | Added clinicStatus field to each seed doctor |
| `src/components/doctor/DoctorPortal.jsx` | MODIFY | Clinic Status dropdown in Navbar with color-coded background |
| `src/components/doctor/DoctorPortal.jsx` | MODIFY | handleClinicStatusChange() saves status to LocalStorage + shows toast |

---

## 🔑 Key Technical Decisions

| Decision | Rationale |
|----------|-----------|
| **LocalStorage for persistence** | Zero backend setup; data survives page refresh; simulates real API |
| **Auto-seed on first load** | storage.js checks keys and seeds initial doctors/patients/appointments |
| **Doctor approval flow** | New doctors get status: "pending_approval"; Admin must approve before login works |
| **Doctor confirms slots (not Admin)** | Clinically accurate; Doctor has medical authority over their own OPD schedule |
| **Custom SVG charts** | Avoids heavy chart library dependency; full visual control |
| **OPD Token system** | Mimics real government/private hospital OPD queue management systems |
| **Payment mode at booking** | Allows clinic to prepare for cash or online-verified patients separately |
| **Report upload (file name + size only)** | No backend file storage needed; metadata stored in LocalStorage for demo |

---

## 🔐 Default Login Credentials

| Role | Email | Password |
|------|-------|----------|
| **Admin** | admin@medbook.com | admin123 |
| **Doctor 1** | dr.sharma@medbook.com | doctor123 |
| **Doctor 2** | dr.patel@medbook.com | doctor123 |
| **Patient 1** | rahul@patient.com | patient123 |
| **Patient 2** | priya@patient.com | patient123 |

---

## 🏗️ Build History

| Date | Build Result | Modules | Notes |
|------|-------------|---------|-------|
| Session 2 | 0 errors | 49 modules | Initial multi-role build |
| Session 4 | 0 errors | 51 modules | OPD features + 2 new components |

---

## 🚀 Running the Project

```bash
# Navigate to the project folder
cd "c:\Users\shubh\OneDrive\ドキュメント\medbook3\medbook"

# Install dependencies (first time only)
npm install

# Start the development server
npm run dev
# Runs on http://localhost:5173/

# Build for production
npm run build
```

---


### 📌 Session 5 — Removed OPD Token & OPD Pass Features

**Date**: 2026-08-12
**Summary**: Removed the "Live OPD Token Counter / Wait Tracker" (Feature 1) and "Digital OPD Entry Pass with QR Code" (Feature 2) that were introduced in Session 4. All related UI components, data fields, and props have been cleaned up.

---

#### Files Deleted

| File | Action | Description |
|------|--------|-------------|
| `src/components/common/OPDPassModal.jsx` | DELETE | Entire Digital OPD Clinic Entry Pass modal (QR code, token badge, print button) removed |
| `src/components/common/TokenTracker.jsx` | DELETE | Entire live OPD token queue tracker widget removed |

---

#### Files Modified

| File | Action | Description |
|------|--------|-------------|
| `src/constants/data.js` | MODIFY | Removed `nowServingToken` field from all 6 seed doctors; removed `tokenNumber` and `paymentMode` fields from all 3 seed appointments; updated file comment |
| `src/components/patient/PatientAppointments.jsx` | MODIFY | Removed `import TokenTracker`, `import OPDPassModal`; removed `activePass` state; removed `TokenTracker` widget rendered on confirmed appointments; removed "🎫 View OPD Entry Pass" action button; removed OPDPassModal render block; removed OPD token pending note; updated page title from "My Clinic OPD Appointments" → "My Clinic Appointments"; updated subtitle text |
| `src/components/patient/BookingModal.jsx` | MODIFY | Removed `tokenNumber` computation (sameDayBookings count); removed "Assigned OPD Token" display field; removed `tokenNumber` from the `onConfirm` payload; changed two-column date/token grid to single date field; updated submit button label from "Confirm Slot & Generate OPD Pass (₹X)" → "Confirm Booking (₹X)" |
| `src/components/doctor/DoctorPortal.jsx` | MODIFY | Removed `handleUpdateServingToken()` function; removed `onUpdateServingToken` prop from `<DoctorDashboard>`; renamed tab "OPD Dashboard" → "Dashboard"; added comment to imports clarifying getDoctors/saveDoctors are still used for clinic status |
| `src/components/doctor/DoctorDashboard.jsx` | MODIFY | Removed `onUpdateServingToken` prop from component signature; removed `nowServingToken` local variable; replaced the "Welcome & Live OPD Queue Banner" (with Call Next Patient button) with a simple welcome banner; updated heading from "OPD Room" → "Clinic"; updated stat card label from "Confirmed OPD Visits" → "Confirmed Visits" |
| `src/components/doctor/DoctorAppointments.jsx` | MODIFY | Removed "TOKEN" green avatar badge from each appointment card; replaced with patient initials avatar (matching patient-side style); updated subtitle: removed "patient OPD tokens" from description; updated report preview text: removed "OPD file" reference |

---

#### What Was Preserved

The following OPD-adjacent features were **not** removed (they are independent and still functional):

| Feature | Status |
|---------|--------|
| Clinic Directions & Map Links | ✅ Kept |
| Doctor Clinic Status Toggle (in_clinic / in_surgery / emergency / closed) | ✅ Kept |
| Patient Medical Report File Uploader | ✅ Kept |
| Payment Mode selector in BookingModal | ✅ Kept (paymentMode field still submitted and displayed) |

---

#### Project Structure After Session 5

```
src/components/common/
  ├── Navbar.jsx
  ├── StatCard.jsx
  ├── Badge.jsx
  ├── Modal.jsx
  ├── Toast.jsx
  └── Charts.jsx
  [OPDPassModal.jsx — DELETED]
  [TokenTracker.jsx — DELETED]
```


---

### 📌 Session 6 — Bug Fixes & Code Quality Cleanup

**Date**: 2026-08-12
**Summary**: Code review pass across the whole app. Fixed real functional bugs (missing form field, uncalculated-but-unused dashboard stat, a React render-purity violation), replaced fabricated placeholder chart data with data derived from real appointments, and cleaned up dead code (unused dependencies, unused props, collision-prone ID generation).

---

#### Real Bugs Fixed

| File | Bug | Fix |
|------|-----|-----|
| `src/components/patient/BookingModal.jsx` | `notes` state existed and was submitted with every booking, but no textarea existed for the patient to actually type into it — always sent empty | Added a "Additional Notes for the Doctor" textarea wired to `setNotes` |
| `src/components/doctor/DoctorDashboard.jsx` | `todayApts` (today's appointment count) was computed but never rendered anywhere on the dashboard | Added a "Today's Appointments" `StatCard` |
| `src/components/common/Charts.jsx` | `DonutChart` mutated a `cumulativeAngle` variable inside the render `.map()` loop — violates React's render-purity rules (flagged by ESLint's `react-hooks/immutability` rule); risky under React 19 Strict Mode/Compiler | Replaced with an immutable `.reduce()` precomputing each slice's cumulative offset before render |
| `src/App.jsx` | Called `setUser()` synchronously inside a `useEffect` on mount, causing an unnecessary extra render on every app load (flagged by ESLint's `react-hooks/set-state-in-effect` rule) | Switched to a `useState` lazy initializer to read the session synchronously (later superseded by Session 7's async session handling) |

---

#### Misleading / Fabricated Data Fixed

| File | Issue | Fix |
|------|-------|-----|
| `src/components/admin/AdminDashboard.jsx` | "Doctor Specialty Distribution" chart pushed hardcoded fake values (`Cardio: 2, Neuro: 1, Derma: 1`) when there were no approved doctors; "Platform Booking Growth" chart used hardcoded `May/Jun/Jul` numbers mixed with one real data point | Replaced fake fallback with an honest empty-state message; growth trend now derived from real `appointments[].bookedAt` grouped by month |
| `src/components/doctor/DoctorDashboard.jsx` | "Weekly Patient Flow" used hardcoded date-suffix matching (`.endsWith("-01")`) plus arbitrary `+2/+4/+5` filler numbers; "Revenue Trend" used hardcoded `₹12,400 / ₹18,500 / ₹24,200` placeholder revenue | Both now derived from real appointment `date`/`completedAt` fields |
| `src/components/patient/PatientDashboard.jsx` | "Consultations by Specialty" pushed fake specialties (`Cardiologist: 2, Dermatologist: 1...`) when the patient had no appointments; "Booking Activity Trend" used hardcoded `May: 1, Jun: 2, Jul: 3` | Replaced fake fallback with an honest empty-state message; trend now derived from the patient's real `bookedAt` dates |

---

#### Dead Code / Cleanup

| File | Change |
|------|--------|
| `package.json` | Removed unused `lucide-react` dependency (app uses emoji icons, never imported the icon library) |
| `src/App.jsx` | Actually wired up `@vercel/speed-insights` (was installed but never imported — now renders `<SpeedInsights />`, since the app is deployed on Vercel) |
| `src/components/common/Navbar.jsx` | Removed unused `activeTab` / `onTabChange` props (every portal has its own separate subnav, Navbar never used these) |
| `src/components/patient/PatientDashboard.jsx` | Removed unused `onBookDoctor` prop (the "Book Consultation" button actually uses `onGoToTab("doctors")`) |
| `src/components/patient/PatientPortal.jsx` | Removed the now-unused `onBookDoctor` prop being passed down |
| `src/utils/storage.js` | Replaced `Math.random().toString(36)`-based IDs (collision-prone) with `crypto.randomUUID()` for doctors, patients, and appointments *(this file was fully replaced in Session 7 below)* |

**Result**: ESLint went from 7 errors to 0 errors, with no new issues introduced.

---

---

### 📌 Session 7 — Full-Stack Backend Migration

**Date**: 2026-08-12
**Summary**: Migrated the app from a frontend-only `localStorage` prototype to a real full-stack application — a Node.js/Express REST API backend with file-based persistence, bcrypt password hashing, and JWT authentication, replacing every direct `localStorage` read/write in the client with authenticated network calls.

---

#### New Backend (`server/`)

| File | Description |
|------|-------------|
| `server/package.json` | Express, `bcryptjs`, `jsonwebtoken`, `cors`, `dotenv` |
| `server/index.js` | Express app entry point; wires up all routes, CORS, JSON body parsing, error handler |
| `server/db.js` | JSON-file persistence layer (`data/db.json`); hashes every password with bcrypt before it's ever written to disk; seeds the database on first run |
| `server/data/seed.js` | Initial demo data (6 doctors, 2 patients, 3 appointments, 1 admin) — mirrors the original `constants/data.js` mock data |
| `server/middleware/auth.js` | `requireAuth` (JWT verification) and `requireRole(...)` (role-based access guard) middleware |
| `server/routes/auth.js` | `POST /login`, `POST /register/patient`, `POST /register/doctor`, `GET /me` |
| `server/routes/doctors.js` | `GET /`, `PATCH /:id/status` (admin approve/reject), `PATCH /:id` (self/admin profile update) |
| `server/routes/patients.js` | `GET /` (admin-only patient directory) |
| `server/routes/appointments.js` | `GET /` (role-scoped), `POST /` (patient books, server rejects double-booked slots), `PATCH /:id` (doctor/admin updates, patient can only cancel) |
| `server/.env.example` | `PORT`, `JWT_SECRET` |
| `server/.gitignore` | Excludes `node_modules/`, `.env`, and critically `data/db.json` (now contains real password hashes) |

Chose JSON-file storage over SQLite/Postgres specifically to avoid native-binding compile issues on `npm install` (kept setup identical to a plain Node project — no compiled dependencies).

---

#### Frontend Changes (`client/src/`)

| File | Action | Description |
|------|--------|-------------|
| `src/utils/storage.js` | **DELETE** | Entire localStorage-based data layer removed |
| `src/utils/api.js` | **CREATE** | Replaces `storage.js` — fetch-based client for every backend endpoint; manages the session (token + user) in `sessionStorage`; auto-clears session and reloads on a `401` response |
| `src/App.jsx` | MODIFY | Session restore now reads `{token, user}` via `api.js`; `handleLogin` now takes `(token, user)` from the login API response |
| `src/components/auth/AuthScreen.jsx` | MODIFY | `handleAuth` rewritten as `async`, calling `login()` / `registerPatient()` / `registerDoctor()` against the real API instead of comparing against `localStorage` arrays; added `submitting` state |
| `src/components/auth/LoginForm.jsx` | MODIFY | Accepts `submitting` prop; disables submit button and shows "Signing in…" while a request is in flight |
| `src/components/auth/DoctorRegister.jsx` | MODIFY | Same `submitting` prop pattern; "Submitting…" state |
| `src/components/auth/PatientRegister.jsx` | MODIFY | Same `submitting` prop pattern; "Creating Account…" state |
| `src/components/patient/PatientPortal.jsx` | MODIFY | Appointments and doctors now fetched via `useEffect` + `fetchAppointments()`/`fetchDoctors()` instead of synchronous `getAppointments()`; added `loading` state; booking/cancel now call `createAppointment()`/`updateAppointment()` |
| `src/components/patient/DoctorList.jsx` | MODIFY | Now receives `doctors` as a prop (fetched once at the portal level) instead of calling `getDoctors()` directly |
| `src/components/patient/PatientAppointments.jsx` | MODIFY | Now receives `doctors` as a prop instead of calling `getDoctors()` directly |
| `src/components/doctor/DoctorPortal.jsx` | MODIFY | Appointments fetched via `fetchAppointments()`; status updates via `updateAppointment()`; clinic status change now calls `updateDoctorProfile()` against the backend instead of `getDoctors()`/`saveDoctors()` |
| `src/components/doctor/DoctorSchedule.jsx` | MODIFY | "Save Schedule" now calls `updateDoctorProfile()` (async, with `saving`/`error` states) instead of directly mutating `localStorage` |
| `src/components/admin/AdminPanel.jsx` | MODIFY | Doctors and appointments fetched via `Promise.all([fetchDoctors(), fetchAppointments()])` in a `useEffect`; all approve/reject/status-change handlers now `async`, calling the backend |
| `src/components/admin/AdminPatients.jsx` | MODIFY | Patient directory now fetched via `fetchPatients()` in a `useEffect` instead of a direct `getPatients()` call |
| `client/.env.example` | **CREATE** | `VITE_API_URL=http://localhost:4000` |

**Result**: ESLint passes with 0 errors after the full migration. Every write endpoint (approve doctor, update appointment, edit schedule, etc.) is authorized server-side against the caller's JWT — a patient's token cannot approve doctors, a doctor's token cannot edit another doctor's profile, etc.

---

#### Demo Accounts (post-migration, seeded by `server/data/seed.js`)

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@medbook.in | admin123 |
| Doctor | priya@medbook.in | doc123 |
| Patient | rahul@gmail.com | patient123 |

*(6 doctors and 2 patients are seeded in total — see `server/data/seed.js` for the complete list.)*

---

#### Running the Full-Stack Project (post-Session 7)

```bash
# Terminal 1 — backend
cd server
npm install
npm run dev              # http://localhost:4000

# Terminal 2 — frontend
cd client
npm install
cp .env.example .env
npm run dev              # http://localhost:5173
```

---


### 📌 Session 8 — Location Search, Notifications, Dark Mode, Queue Estimate & Availability Calendar

**Date**: 2026-08-12
**Summary**: Added five patient-facing/UX features on top of the full-stack backend from Session 7: city-based doctor search, in-app appointment reminders, a dark mode toggle, a live queue position estimate, and a visual availability calendar for booking.

---

#### 1. Location / City Search

| File | Action | Description |
|------|--------|-------------|
| `server/data/seed.js` | MODIFY | Added a `city` field to all 6 seeded doctors (New Delhi, Mumbai, Bangalore, Ahmedabad, Pune, Hyderabad) |
| `server/routes/auth.js` | MODIFY | `register/doctor` now accepts and stores `city`, `clinic`, `clinicAddress` from the registration form |
| `server/routes/doctors.js` | MODIFY | Added `city` to the list of fields a doctor can self-edit via `PATCH /doctors/:id` |
| `client/src/constants/data.js` | MODIFY | Added a `CITIES` array |
| `client/src/components/patient/DoctorList.jsx` | MODIFY | Added a city filter chip row (same pattern as the existing specialty filter); search box now also matches city, clinic address, and landmark |
| `client/src/components/patient/DoctorCard.jsx` | MODIFY | Shows the doctor's city on the card |
| `client/src/components/auth/DoctorRegister.jsx` | MODIFY | Added a City dropdown next to the clinic name field |
| `client/src/components/doctor/DoctorSchedule.jsx` | MODIFY | Added a City dropdown so an existing doctor can set/change their city |

---

#### 2. In-App Reminder Notifications

Real SMS/email would need a paid service (Twilio, SendGrid) that isn't wired up — this is an **in-app** notification bell instead, computed entirely from data already being fetched (no new backend calls).

| File | Action | Description |
|------|--------|-------------|
| `client/src/components/common/NotificationBell.jsx` | **CREATE** | Bell icon with unread-count badge; click opens a dropdown. For patients: appointments in the next 24h. For doctors: today's pending/confirmed appointments |
| `client/src/components/patient/PatientPortal.jsx` | MODIFY | Wired `NotificationBell` into `Navbar`'s `extraActions` |
| `client/src/components/doctor/DoctorPortal.jsx` | MODIFY | Wired `NotificationBell` in alongside the existing clinic-status dropdown |

---

#### 3. Dark Mode

| File | Action | Description |
|------|--------|-------------|
| `client/src/context/ThemeContext.jsx` | **CREATE** | `ThemeProvider` + `useTheme()` hook; theme choice persisted to `localStorage` (a UI preference, not sensitive) |
| `client/src/main.jsx` | MODIFY | Wrapped `<App />` in `<ThemeProvider>` |
| `client/src/components/common/Navbar.jsx` | MODIFY | Added a sun/moon toggle button |
| `client/src/components/patient/PatientPortal.jsx`, `doctor/DoctorPortal.jsx`, `admin/AdminPanel.jsx` | MODIFY | Page background, text color, and subnav bar now read from `theme` |

**Known limitation**: the app was built entirely with inline styles rather than CSS classes, so this only covers the top-level page chrome (backgrounds, Navbar, subnav). Individual cards, buttons, and badges throughout each portal still use their original hardcoded light colors — full dark mode coverage would mean touching every component individually.

---

#### 4. Patient Queue Position Estimate

Computing "how many people are ahead of me" requires knowing about *other* patients' bookings for the same doctor/day — but the API already scopes `GET /appointments` to the caller's own appointments only (by design, for privacy). So this needed a dedicated endpoint that returns a count only, never other patients' details.

| File | Action | Description |
|------|--------|-------------|
| `server/routes/appointments.js` | MODIFY | Added `GET /appointments/queue?doctorId&date&time` — returns `{ position, totalConfirmedToday, estimatedWaitMinutes }` only, no patient-identifying data |
| `client/src/utils/api.js` | MODIFY | Added `fetchQueueEstimate()` |
| `client/src/components/patient/QueueBadge.jsx` | **CREATE** | Small badge showing "#N in line · ~X min wait", fetches its own data on mount |
| `client/src/components/patient/PatientAppointments.jsx` | MODIFY | Shows `QueueBadge` on today's confirmed appointments |

---

#### 5. Doctor Availability Calendar

| File | Action | Description |
|------|--------|-------------|
| `client/src/components/patient/AvailabilityCalendar.jsx` | **CREATE** | 14-day horizontal calendar strip; highlights days matching the doctor's usual working days (`doctor.available`), other days remain clickable but visually de-emphasized |
| `client/src/components/patient/BookingModal.jsx` | MODIFY | Replaced the plain `<input type="date">` with `AvailabilityCalendar` |

---

#### Result

ESLint: 0 errors after all five features (verified with a full re-lint pass, including a one-line `eslint-disable` for the standard `useTheme()` hook-in-context-file pattern).

---

### 📌 Session 9 — Java (Spring Boot) Backend Port & Combined Project

**Date**: 2026-08-23
**Summary**: Ported the Node.js/Express backend to Java 17 + Spring Boot, keeping the identical REST API contract (same routes, same request/response shapes, same demo accounts), then combined it with the existing React frontend into a single top-level project.

---

#### New Backend (`backend/`, Java/Spring Boot)

| Component | Description |
|------|-------------|
| `pom.xml` | Spring Boot 3.3, Spring Security, Spring Data JPA, H2 (file-based embedded database), `jjwt`, Lombok |
| `model/` | JPA entities — `Doctor`, `Patient`, `Admin`, `Appointment` — mirroring the Node backend's data shape |
| `repository/` | Spring Data JPA repositories, including derived queries for the double-booking check and queue-position lookup |
| `security/JwtUtil.java`, `JwtAuthFilter.java` | JWT signing/verification and a per-request auth filter, equivalent to the Node backend's `requireAuth` middleware |
| `security/AuthUtil.java` | Reads the authenticated caller's id/role from the Spring Security context |
| `config/SecurityConfig.java` | Stateless JWT auth, CORS, and route access rules |
| `config/DataSeeder.java` | Seeds the same 6 doctors / 2 patients / 1 admin as the Node backend's `seed.js`, via `BCryptPasswordEncoder` |
| `controller/` | `AuthController`, `DoctorController`, `PatientController`, `AppointmentController`, `HealthController` — same routes as the Node version, including the privacy-preserving `/api/appointments/queue` endpoint |
| `exception/` | `ApiException` + a global handler for consistent JSON error responses |

**What changed vs. the Node.js version:**
- **Database**: H2 (embedded, file-based, real relational DB with proper concurrent-write handling) instead of a flat JSON file.
- **Password hashing**: Spring Security's `BCryptPasswordEncoder` instead of `bcryptjs` — same algorithm.
- **JWT**: `jjwt` instead of `jsonwebtoken` — same HS256 approach, same `{id, role}` payload.
- **Report file metadata**: not persisted in this Java port (small, intentional scope reduction — the Node version only stored a filename/size anyway, never the file content).

**⚠️ Important caveat**: this backend was written in an environment with no access to Maven Central and no Java compiler available, so it could not be compiled or run before being handed off — unlike the Node.js backend, which was fully tested end-to-end. It needs to be built and verified locally (`mvn spring-boot:run`), with any compile errors reported back for a fix.

---

#### Combined Project Structure

| Change | Description |
|------|-------------|
| `medbook-complete/backend/` | The new Java backend, as above |
| `medbook-complete/frontend/` | The existing React client, copied in unchanged (all Session 1–8 features intact: dark mode, notifications, queue badge, availability calendar, city/specialty search) |
| `frontend/src/utils/api.js` | Default API URL fallback updated from `localhost:4000` (Node) to `localhost:4001` (Java) |
| `frontend/.env.example` | Updated to `VITE_API_URL=http://localhost:4001` |
| `medbook-complete/README.md` | **CREATE** — top-level quickstart covering both halves, demo accounts, and an honest "backend untested" notice |
| `medbook-complete/.gitignore` | **CREATE** — covers both Maven (`target/`, H2 `data/`) and Node (`node_modules/`, `.env`) build artifacts |

The Node.js backend (`server/` in the earlier full-stack project) is preserved separately and still works standalone — this session adds a Java alternative alongside it rather than deleting the original.

