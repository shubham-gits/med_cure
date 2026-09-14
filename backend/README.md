# MedBook Backend — Java (Spring Boot) Port

This is a Java/Spring Boot rewrite of the original Node.js/Express MedBook backend.
It exposes the **same REST API** (same routes, same request/response shapes, same
demo accounts), so the existing React frontend works against it with just one
change: point `VITE_API_URL` at this server's port instead.

## ⚠️ Important — this could not be compiled or run in the environment that generated it

This code was written by hand, carefully, but the sandbox that produced it has
**no access to Maven Central** (the repository Maven downloads dependencies
from) and does not have Maven installed — only a bare JDK. That means it was
**not possible to actually compile or run this project before handing it to
you**, unlike the original Node.js backend, which was fully tested end-to-end.

**Please build it locally and tell me about any compile errors** — they're
straightforward for me to fix once I can see the actual error message.

## Tech stack

- Java 17, Spring Boot 3.3
- Spring Web (REST controllers)
- Spring Security (stateless, JWT-based — no sessions/cookies)
- Spring Data JPA + H2 (file-based embedded database — no separate DB server needed)
- `jjwt` for JWT signing/verification
- `bcrypt` (via Spring Security's `BCryptPasswordEncoder`) for password hashing
- Lombok (cuts down boilerplate getters/setters)

## Project structure

```
src/main/java/com/medbook/backend/
├── MedbookBackendApplication.java   # entry point
├── config/
│   ├── SecurityConfig.java          # JWT filter wiring, CORS, route access rules
│   └── DataSeeder.java              # seeds demo accounts on first run
├── security/
│   ├── JwtUtil.java                 # sign/verify JWTs
│   ├── JwtAuthFilter.java           # per-request token verification (like Node's requireAuth)
│   └── AuthUtil.java                # read current user's id/role from context
├── model/                           # JPA entities: Doctor, Patient, Admin, Appointment
├── repository/                      # Spring Data JPA repositories
├── dto/                             # request/response shapes (never expose passwordHash)
├── exception/                       # ApiException + a global JSON error handler
└── controller/
    ├── AuthController.java          # login, register, /me
    ├── DoctorController.java        # list, admin approval, profile update
    ├── PatientController.java       # admin-only directory
    ├── AppointmentController.java   # booking, status updates, queue estimate
    └── HealthController.java        # GET /api/health
```

## Running it locally

You'll need **Java 17+** and **Maven** installed.

```bash
cd medbook-java-backend
mvn spring-boot:run
```

The first run creates `./data/medbookdb.mv.db` (the H2 database file) and seeds
it with the same demo accounts as the Node version. The API listens on
**http://localhost:4001** (the Node version used 4000, so you can run both side
by side while comparing).

To point the existing React frontend at this backend instead, set in
`client/.env`:

```
VITE_API_URL=http://localhost:4001
```

## Demo accounts (same as the Node version)

| Role | Email | Password |
|---|---|---|
| Admin | admin@medbook.in | admin123 |
| Doctor | priya@medbook.in | doc123 |
| Patient | rahul@gmail.com | patient123 |

## API routes (identical to the Node backend)

| Method | Route | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/login` | — | Log in as patient/doctor/admin |
| POST | `/api/auth/register/patient` | — | Register a new patient |
| POST | `/api/auth/register/doctor` | — | Register a new doctor (pending approval) |
| GET | `/api/auth/me` | ✓ | Restore session |
| GET | `/api/doctors` | — | List all doctors |
| PATCH | `/api/doctors/{id}/status` | ✓ admin | Approve/reject a doctor |
| PATCH | `/api/doctors/{id}` | ✓ self/admin | Update doctor profile/schedule |
| GET | `/api/patients` | ✓ admin | List all patients |
| GET | `/api/appointments` | ✓ | List appointments (scoped to caller's role) |
| POST | `/api/appointments` | ✓ patient | Book an appointment |
| PATCH | `/api/appointments/{id}` | ✓ owner/admin | Update status/prescription |
| GET | `/api/appointments/queue` | ✓ | Queue position (`?doctorId&date&time`) |

## What's different from the Node.js version

- **Database**: H2 (file-based, embedded) instead of a raw JSON file — a real
  relational database with proper concurrent-write handling, which the
  original JSON-file approach didn't have. Schema is auto-created
  (`spring.jpa.hibernate.ddl-auto=update`) — no manual migration step needed.
- **Password hashing**: Spring Security's `BCryptPasswordEncoder`, same
  algorithm as the Node version's `bcryptjs`, just a different library.
- **JWT**: `jjwt` instead of `jsonwebtoken`, same HS256 signing approach and
  the same `{id, role}` payload shape.
- **Report file uploads**: the Node version only stored a report's filename
  and size as metadata on an appointment (never the actual file). This Java
  port simplifies further and doesn't persist that metadata at all — a small,
  intentional scope reduction, not an oversight.

## Known limitations (same honesty as the Node version's README)

- No rate limiting on the API yet.
- No automated tests included in this first pass.
- The JWT secret in `application.properties` is a placeholder — change it to
  a long random string before deploying anywhere public.
