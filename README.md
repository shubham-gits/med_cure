# MedBook — Complete Project (React + Java/Spring Boot)

A full-stack clinic OPD appointment booking platform. Three roles — Patient,
Doctor, Admin — each with their own portal, talking to a Java/Spring Boot REST
API over HTTP.

This folder combines two things that were built separately and are now meant
to run together:

- **`frontend/`** — the React (Vite) client. Unchanged in behavior from the
  version that was originally paired with a Node.js backend.
- **`backend/`** — a Java/Spring Boot REST API that was written as a port of
  that original Node.js backend, exposing the identical routes and response
  shapes so the frontend didn't need any logic changes — just a different
  port to point at.

## ⚠️ Before you start — read this

The **frontend** has been run and tested end-to-end (originally against the
Node backend, which had the same API contract this Java backend implements).

The **backend** was written by hand in an environment with no access to
Maven Central and no Java compiler available, so **it has never actually
been compiled or run**. It's carefully written and should work, but treat the
first `mvn spring-boot:run` as the real first test. If you hit a compile
error, that's expected-possible, not a sign something is fundamentally wrong
— send me the exact error message and I'll fix it.

## Project structure

```
medbook-complete/
├── backend/                  # Java 17 + Spring Boot REST API (port 4001)
│   ├── src/main/java/com/medbook/backend/
│   │   ├── config/            # security config, CORS, demo-data seeder
│   │   ├── security/           # JWT signing/verification, auth filter
│   │   ├── model/               # JPA entities (Doctor, Patient, Admin, Appointment)
│   │   ├── repository/          # Spring Data JPA repositories
│   │   ├── dto/                 # request/response shapes
│   │   ├── exception/            # centralized error handling
│   │   └── controller/           # REST endpoints
│   ├── pom.xml
│   └── README.md              # backend-specific details
│
└── frontend/                 # React 19 + Vite client (port 5173)
    ├── src/
    │   ├── utils/api.js        # all fetch calls to the backend live here
    │   ├── context/             # dark mode state
    │   └── components/
    │       ├── auth/             # login + registration
    │       ├── patient/          # patient portal (booking, queue badge, calendar)
    │       ├── doctor/           # doctor portal
    │       ├── admin/            # admin portal
    │       └── common/           # navbar, charts, notification bell, etc.
    └── package.json
```

## Running the whole thing

You'll need **Java 17+**, **Maven**, and **Node.js 18+** installed.

**1. Start the backend**

```bash
cd backend
mvn spring-boot:run
```

This creates a local H2 database file on first run and seeds it with demo
accounts (see below). The API listens on **http://localhost:4001**.

**2. Start the frontend, in a second terminal**

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Open **http://localhost:5173**.

## Demo accounts

| Role | Email | Password |
|---|---|---|
| Admin | admin@medbook.in | admin123 |
| Doctor | priya@medbook.in | doc123 |
| Patient | rahul@gmail.com | patient123 |

Six doctors and two patients are seeded in total — see
`backend/src/main/java/com/medbook/backend/config/DataSeeder.java` for the
full list.

## What the app actually does

**Patients** search doctors by specialty or city, see a doctor's usual
working days on a booking calendar, book an appointment, and — for a
same-day confirmed visit — see a live queue-position estimate that never
exposes any other patient's details.

**Doctors** confirm or decline requests, record a diagnosis and prescription
to close out a visit, and manage their own fee/schedule/clinic info.

**Admins** approve or reject newly registered doctors and browse system-wide
doctor, patient, and appointment directories.

Every write request is authorized independently on the server against a
signed JWT — the client is never trusted for a role/ownership decision, no
matter what it displays.

## Why the backend was ported to Java

The original backend was Node.js/Express with a JSON-file data store. This
Java version keeps the same API contract and security model (JWT + hashed
passwords, server-side authorization on every write) but swaps in:

- **Spring Boot** instead of Express for the web layer
- **Spring Data JPA + H2** (a real embedded relational database) instead of
  a flat JSON file — proper concurrent-write handling included
- **Spring Security's BCryptPasswordEncoder** instead of `bcryptjs` — same
  algorithm, different library
- **`jjwt`** instead of `jsonwebtoken` — same JWT approach, different library

See `backend/README.md` for the full endpoint list and further detail.

## Known limitations

- No rate limiting on the API.
- No automated test suite yet, on either side.
- The JWT secret in `backend/src/main/resources/application.properties` is a
  placeholder — change it before deploying anywhere public.
- The backend hasn't been load-tested; H2 in embedded file mode is fine for
  demo/development traffic but isn't a production-scale database setup.
