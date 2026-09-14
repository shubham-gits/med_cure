import React from "react";
import { SPECIALTIES } from "../../constants/data";

export default function LandingPage({ onOpenAuth }) {
  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "'DM Sans', system-ui, sans-serif", color: "#0f172a" }}>
      {/* ─── PUBLIC NAVBAR ──────────────────────────────────────────────────────── */}
      <header
        style={{
          background: "#ffffff",
          height: 72,
          padding: "0 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          position: "sticky",
          top: 0,
          zIndex: 100,
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: "#0f766e", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 800 }}>
            🏥
          </div>
          <div>
            <span style={{ fontSize: 22, fontWeight: 800, color: "#0f766e", letterSpacing: "-0.5px" }}>MedBook</span>
            <span style={{ display: "block", fontSize: 10, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em" }}>Healthcare Platform</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <a href="#about" style={navLinkStyle}>About Healthcare</a>
          <a href="#features" style={navLinkStyle}>Platform Features</a>
          <a href="#specialties" style={navLinkStyle}>Specialties</a>
          <a href="#how-it-works" style={navLinkStyle}>How It Works</a>
        </nav>

        {/* CTA Buttons */}
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={() => onOpenAuth("doctor", "register")} style={{ ...navBtnStyle, background: "#ecfdf5", color: "#047857", border: "1px solid #a7f3d0" }}>
            🩺 Doctor Join Us
          </button>
          <button onClick={() => onOpenAuth("patient", "login")} style={{ ...navBtnStyle, background: "#0f766e", color: "#ffffff", border: "none" }}>
            Sign In / Register
          </button>
        </div>
      </header>

      {/* ─── HERO SECTION ───────────────────────────────────────────────────────── */}
      <section
        style={{
          background: "linear-gradient(135deg, #0f766e 0%, #134e4a 60%, #0f172a 100%)",
          color: "#ffffff",
          padding: "80px 32px 100px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ maxWidth: 860, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <div style={{ display: "inline-block", background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)", padding: "6px 18px", borderRadius: 20, fontSize: 13, fontWeight: 700, marginBottom: 20, border: "1px solid rgba(255,255,255,0.2)" }}>
            ✨ Next-Generation Healthcare & Tele-Consultation
          </div>
          <h1 style={{ fontSize: 48, fontWeight: 800, margin: "0 0 18px", letterSpacing: "-1px", lineHeight: 1.15 }}>
            Your Health Deserves Instant, Certified Medical Care
          </h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.85)", margin: "0 auto 36px", maxWidth: 680, lineHeight: 1.6 }}>
            MedBook connects patients with verified specialists. Experience seamless slot bookings, direct doctor confirmation, e-prescriptions, and real-time health analytics.
          </p>

          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => onOpenAuth("patient", "register")} style={{ ...heroBtnStyle, background: "#ffffff", color: "#0f766e" }}>
              Book an Appointment Now →
            </button>
            <button onClick={() => onOpenAuth("doctor", "register")} style={{ ...heroBtnStyle, background: "rgba(255,255,255,0.15)", color: "#ffffff", border: "1px solid rgba(255,255,255,0.3)" }}>
              Register as Doctor
            </button>
          </div>
        </div>
      </section>

      {/* ─── STATS HIGHLIGHT BAR ────────────────────────────────────────────────── */}
      <div style={{ maxWidth: 1100, margin: "-40px auto 60px", position: "relative", zIndex: 10, padding: "0 20px" }}>
        <div style={{ background: "#ffffff", borderRadius: 20, padding: "28px 36px", boxShadow: "0 20px 40px rgba(0,0,0,0.08)", border: "1px solid #e2e8f0", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24, textAlign: "center" }}>
          <div>
            <div style={{ fontSize: 32, fontWeight: 800, color: "#0f766e" }}>500+</div>
            <div style={{ fontSize: 13, color: "#64748b", fontWeight: 600, marginTop: 4 }}>Verified Specialist Doctors</div>
          </div>
          <div>
            <div style={{ fontSize: 32, fontWeight: 800, color: "#047857" }}>50,000+</div>
            <div style={{ fontSize: 13, color: "#64748b", fontWeight: 600, marginTop: 4 }}>Patient Consultations</div>
          </div>
          <div>
            <div style={{ fontSize: 32, fontWeight: 800, color: "#3b82f6" }}>100%</div>
            <div style={{ fontSize: 13, color: "#64748b", fontWeight: 600, marginTop: 4 }}>Doctor Slot Confirmation</div>
          </div>
          <div>
            <div style={{ fontSize: 32, fontWeight: 800, color: "#8b5cf6" }}>4.9 ★</div>
            <div style={{ fontSize: 13, color: "#64748b", fontWeight: 600, marginTop: 4 }}>Patient Satisfaction Rating</div>
          </div>
        </div>
      </div>

      {/* ─── ABOUT HEALTHCARE & MISSION ─────────────────────────────────────────── */}
      <section id="about" style={{ padding: "40px 32px 60px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <span style={sectionSubTitle}>ABOUT OUR HEALTHCARE PLATFORM</span>
          <h2 style={sectionTitle}>Reimagining Healthcare Accessibility</h2>
          <p style={sectionDesc}>
            At MedBook, we believe quality healthcare should be transparent, instant, and hassle-free. We eliminate middle-man administrative friction by empowering doctors to manage their own slots and confirm appointments directly.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          <AboutCard
            icon="🩺"
            title="Verified Practitioners"
            desc="Every doctor on MedBook undergoes thorough medical license verification by our Admin team before being approved for consultations."
          />
          <AboutCard
            icon="⚡"
            title="Direct Doctor Confirmation"
            desc="No administrative delays. When you book a slot, your chosen doctor receives instant notification and confirms your appointment."
          />
          <AboutCard
            icon="📊"
            title="Digital Health Dashboard"
            desc="Track your medical history, prescription notes, upcoming visits, and health analytics with interactive visual charts."
          />
        </div>
      </section>

      {/* ─── PLATFORM FEATURES ──────────────────────────────────────────────────── */}
      <section id="features" style={{ background: "#ffffff", padding: "70px 32px", borderTop: "1px solid #e2e8f0", borderBottom: "1px solid #e2e8f0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <span style={sectionSubTitle}>PLATFORM CAPABILITIES</span>
            <h2 style={sectionTitle}>Tailored Solutions for Patients, Doctors & Admins</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
            <FeatureBox
              role="FOR PATIENTS"
              color="#0f766e"
              bg="#ccfbf1"
              title="Patient Care Portal"
              features={[
                "Browse doctors by specialty, fee, experience, and ratings",
                "Choose exact available hourly slots on preferred dates",
                "Real-time appointment status notifications",
                "Access digital doctor prescriptions and medical notes",
              ]}
              actionText="Patient Sign Up"
              onAction={() => onOpenAuth("patient", "register")}
            />

            <FeatureBox
              role="FOR DOCTORS"
              color="#047857"
              bg="#ecfdf5"
              title="Doctor Practice Portal"
              features={[
                "Self-register practice details & medical license credentials",
                "Directly confirm or decline patient appointment requests",
                "Customize daily slot availability and consultation fees",
                "Issue e-prescriptions and view revenue analytics charts",
              ]}
              actionText="Doctor Registration"
              onAction={() => onOpenAuth("doctor", "register")}
            />

            <FeatureBox
              role="FOR ADMINS"
              color="#0f172a"
              bg="#f1f5f9"
              title="Admin Executive Suite"
              features={[
                "Review and verify new doctor registration applications",
                "Inspect full doctor profiles, license numbers, and clinics",
                "Platform-wide booking analytics and revenue growth charts",
                "Comprehensive patient and doctor directory audit logs",
              ]}
              actionText="Admin Sign In"
              onAction={() => onOpenAuth("admin", "login")}
            />
          </div>
        </div>
      </section>

      {/* ─── SPECIALTIES SHOWCASE ───────────────────────────────────────────────── */}
      <section id="specialties" style={{ padding: "70px 32px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <span style={sectionSubTitle}>MEDICAL SPECIALTIES</span>
          <h2 style={sectionTitle}>Find Experts Across All Medical Disciplines</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
          {[
            { name: "Cardiologist", icon: "❤️", desc: "Heart health, ECG, cardiovascular care" },
            { name: "Neurologist", icon: "🧠", desc: "Brain, nervous system, migraine specialists" },
            { name: "Dermatologist", icon: "✨", desc: "Skin care, acne, cosmetic consultations" },
            { name: "Orthopedic", icon: "🦴", desc: "Bone, joint replacement & sports medicine" },
            { name: "Pediatrician", icon: "👶", desc: "Child healthcare & vaccination experts" },
            { name: "General Physician", icon: "🩺", desc: "Family medicine & preventative care" },
          ].map((item) => (
            <div key={item.name} style={{ background: "#ffffff", padding: 20, borderRadius: 16, border: "1px solid #e2e8f0", boxShadow: "0 4px 16px rgba(0,0,0,0.02)" }}>
              <div style={{ fontSize: 32, marginBottom: 10 }}>{item.icon}</div>
              <h3 style={{ fontSize: 17, fontWeight: 800, margin: "0 0 6px", color: "#0f172a" }}>{item.name}</h3>
              <p style={{ fontSize: 13, color: "#64748b", margin: 0, lineHeight: 1.4 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── HOW IT WORKS ────────────────────────────────────────────────────────── */}
      <section id="how-it-works" style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", color: "#ffffff", padding: "70px 32px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
          <span style={{ fontSize: 12, fontWeight: 800, color: "#ccfbf1", textTransform: "uppercase", letterSpacing: "0.1em" }}>SIMPLE 3-STEP PROCESS</span>
          <h2 style={{ fontSize: 32, fontWeight: 800, margin: "8px 0 44px" }}>How MedBook Works</h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            <StepCard number="1" title="Find Doctor" desc="Search verified specialists by category, experience, fee, and patient ratings." />
            <StepCard number="2" title="Select Slot" desc="Pick an available date and hourly time slot that fits your schedule." />
            <StepCard number="3" title="Get Consultation" desc="Receive direct doctor confirmation, attend consultation, and get digital prescription." />
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─────────────────────────────────────────────────────────────── */}
      <footer style={{ background: "#0f172a", borderTop: "1px solid #334155", padding: "40px 32px", color: "#94a3b8" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 24 }}>🏥</span>
            <span style={{ color: "#ffffff", fontWeight: 800, fontSize: 18 }}>MedBook Healthcare</span>
          </div>

          <div style={{ fontSize: 13 }}>
            © {new Date().getFullYear()} MedBook Platform. All rights reserved. Trusted Healthcare.
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            <button onClick={() => onOpenAuth("patient", "login")} style={{ ...footerBtnStyle }}>Patient Login</button>
            <button onClick={() => onOpenAuth("doctor", "login")} style={{ ...footerBtnStyle }}>Doctor Login</button>
            <button onClick={() => onOpenAuth("admin", "login")} style={{ ...footerBtnStyle }}>Admin Sign In</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

function AboutCard({ icon, title, desc }) {
  return (
    <div style={{ background: "#ffffff", padding: 28, borderRadius: 18, border: "1px solid #e2e8f0", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
      <div style={{ fontSize: 36, marginBottom: 14 }}>{icon}</div>
      <h3 style={{ fontSize: 18, fontWeight: 800, margin: "0 0 10px", color: "#0f172a" }}>{title}</h3>
      <p style={{ fontSize: 14, color: "#475569", margin: 0, lineHeight: 1.5 }}>{desc}</p>
    </div>
  );
}

function FeatureBox({ role, color, bg, title, features, actionText, onAction }) {
  return (
    <div style={{ background: "#ffffff", padding: 28, borderRadius: 18, border: "1px solid #e2e8f0", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <div>
        <span style={{ background: bg, color: color, padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 800 }}>{role}</span>
        <h3 style={{ fontSize: 20, fontWeight: 800, margin: "14px 0 16px", color: "#0f172a" }}>{title}</h3>
        <ul style={{ paddingLeft: 18, margin: "0 0 24px", color: "#475569", fontSize: 13, lineHeight: 1.8 }}>
          {features.map((f, i) => <li key={i}>{f}</li>)}
        </ul>
      </div>
      <button onClick={onAction} style={{ width: "100%", background: color, color: "#ffffff", border: "none", padding: "11px", borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
        {actionText} →
      </button>
    </div>
  );
}

function StepCard({ number, title, desc }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.06)", padding: 24, borderRadius: 16, border: "1px solid rgba(255,255,255,0.1)", textAlign: "center" }}>
      <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#0f766e", color: "#ffffff", fontWeight: 800, fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>{number}</div>
      <h3 style={{ fontSize: 18, fontWeight: 800, margin: "0 0 8px" }}>{title}</h3>
      <p style={{ fontSize: 13, color: "#94a3b8", margin: 0, lineHeight: 1.5 }}>{desc}</p>
    </div>
  );
}

const navLinkStyle = {
  color: "#475569",
  textDecoration: "none",
  fontWeight: 600,
  fontSize: 14,
};

const navBtnStyle = {
  padding: "9px 18px",
  borderRadius: 10,
  fontWeight: 700,
  fontSize: 13,
  cursor: "pointer",
};

const heroBtnStyle = {
  padding: "14px 28px",
  borderRadius: 12,
  fontWeight: 800,
  fontSize: 15,
  border: "none",
  cursor: "pointer",
};

const sectionSubTitle = {
  fontSize: 12,
  fontWeight: 800,
  color: "#0f766e",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  display: "block",
  marginBottom: 6,
};

const sectionTitle = {
  fontSize: 32,
  fontWeight: 800,
  color: "#0f172a",
  margin: "0 0 12px",
};

const sectionDesc = {
  fontSize: 15,
  color: "#64748b",
  maxWidth: 680,
  margin: "0 auto",
  lineHeight: 1.6,
};

const footerBtnStyle = {
  background: "#1e293b",
  color: "#ffffff",
  border: "1px solid #334155",
  padding: "6px 14px",
  borderRadius: 8,
  fontSize: 12,
  fontWeight: 600,
  cursor: "pointer",
};
