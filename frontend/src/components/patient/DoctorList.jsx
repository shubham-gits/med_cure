import React, { useState } from "react";
import DoctorCard from "./DoctorCard";
import { SPECIALTIES, CITIES } from "../../constants/data";

export default function DoctorList({ doctors, onBook }) {
  const [filterSpecialty, setFilterSpecialty] = useState("All");
  const [filterCity, setFilterCity] = useState("All Cities");
  const [search, setSearch] = useState("");

  // Filter only approved doctors for patient booking
  const approvedDoctors = doctors.filter((d) => d.status === "approved" || !d.status);

  const filtered = approvedDoctors.filter((d) => {
    const matchesSpecialty = filterSpecialty === "All" || d.specialty === filterSpecialty;
    const matchesCity = filterCity === "All Cities" || d.city === filterCity;
    const matchesSearch =
      d.name?.toLowerCase().includes(search.toLowerCase()) ||
      d.specialty?.toLowerCase().includes(search.toLowerCase()) ||
      d.clinic?.toLowerCase().includes(search.toLowerCase()) ||
      d.city?.toLowerCase().includes(search.toLowerCase()) ||
      d.clinicAddress?.toLowerCase().includes(search.toLowerCase()) ||
      d.landmark?.toLowerCase().includes(search.toLowerCase());
    return matchesSpecialty && matchesCity && matchesSearch;
  });

  return (
    <div>
      {/* Title & Search Bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h2 style={{ margin: 0, fontWeight: 800, color: "#0f172a", fontSize: 24 }}>Find a Doctor</h2>
          <p style={{ margin: "4px 0 0", fontSize: 13, color: "#64748b" }}>
            Book instant appointments with verified medical specialists
          </p>
        </div>

        <input
          style={{
            width: 280,
            padding: "9px 14px",
            border: "1.5px solid #cbd5e1",
            borderRadius: 10,
            fontSize: 14,
            background: "#ffffff",
            outline: "none",
          }}
          placeholder="Search by doctor, clinic, or area..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* City / Area Filter */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>
          📍 Filter by City
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {CITIES.map((c) => {
            const isActive = filterCity === c;
            return (
              <button
                key={c}
                onClick={() => setFilterCity(c)}
                style={{
                  padding: "7px 16px",
                  border: `1.5px solid ${isActive ? "#3b82f6" : "#cbd5e1"}`,
                  borderRadius: 20,
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: 600,
                  background: isActive ? "#3b82f6" : "#ffffff",
                  color: isActive ? "#ffffff" : "#475569",
                  transition: "all 0.15s",
                }}
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>

      {/* Specialty Filter Badges */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>
          🩺 Filter by Specialty
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {SPECIALTIES.map((s) => {
            const isActive = filterSpecialty === s;
            return (
              <button
                key={s}
                onClick={() => setFilterSpecialty(s)}
                style={{
                  padding: "7px 16px",
                  border: `1.5px solid ${isActive ? "#0f766e" : "#cbd5e1"}`,
                  borderRadius: 20,
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: 600,
                  background: isActive ? "#0f766e" : "#ffffff",
                  color: isActive ? "#ffffff" : "#475569",
                  transition: "all 0.15s",
                }}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>

      {/* Doctor Grid */}
      {filtered.length === 0 ? (
        <div style={{ background: "#ffffff", borderRadius: 16, padding: 48, textAlign: "center", border: "1px solid #e2e8f0" }}>
          <div style={{ fontSize: 44, marginBottom: 12 }}>🩺</div>
          <div style={{ fontWeight: 700, fontSize: 16, color: "#0f172a" }}>No doctors match your search</div>
          <p style={{ color: "#64748b", fontSize: 13, margin: "4px 0 0" }}>Try clearing the search, or a different city/specialty.</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20 }}>
          {filtered.map((doc) => (
            <DoctorCard key={doc.id} doctor={doc} onBook={onBook} />
          ))}
        </div>
      )}
    </div>
  );
}
