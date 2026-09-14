import React, { useState } from "react";

// ─── 1. BAR CHART ─────────────────────────────────────────────────────────────
export function BarChart({ data = [], height = 180, color = "#0f766e" }) {
  const [hoverIdx, setHoverIdx] = useState(null);
  const maxVal = Math.max(...data.map(d => d.value), 1);
  const chartHeight = height - 40;

  return (
    <div style={{ width: "100%", position: "relative" }}>
      <svg width="100%" height={height} style={{ overflow: "visible" }}>
        {/* Horizontal gridlines */}
        {[0, 0.5, 1].map((pct, i) => (
          <line
            key={i}
            x1="0"
            y1={chartHeight * (1 - pct) + 10}
            x2="100%"
            y2={chartHeight * (1 - pct) + 10}
            stroke="#e2e8f0"
            strokeDasharray="4 4"
          />
        ))}

        {data.map((item, index) => {
          const barWidthPct = 100 / data.length;
          const barHeight = (item.value / maxVal) * chartHeight;
          const xPos = `${index * barWidthPct + barWidthPct * 0.2}%`;
          const yPos = chartHeight - barHeight + 10;
          const actualBarWidth = `${barWidthPct * 0.6}%`;
          const isHovered = hoverIdx === index;

          return (
            <g
              key={index}
              onMouseEnter={() => setHoverIdx(index)}
              onMouseLeave={() => setHoverIdx(null)}
              style={{ cursor: "pointer" }}
            >
              {/* Bar Rect */}
              <rect
                x={xPos}
                y={yPos}
                width={actualBarWidth}
                height={Math.max(barHeight, 4)}
                rx={6}
                fill={isHovered ? "#0d6b63" : color}
                style={{ transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)" }}
              />

              {/* X Axis Label */}
              <text
                x={`${index * barWidthPct + barWidthPct / 2}%`}
                y={height - 6}
                textAnchor="middle"
                fontSize={11}
                fontWeight={600}
                fill={isHovered ? "#0f172a" : "#64748b"}
              >
                {item.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Hover Tooltip */}
      {hoverIdx !== null && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: `${(hoverIdx + 0.5) * (100 / data.length)}%`,
            transform: "translateX(-50%)",
            background: "#0f172a",
            color: "#ffffff",
            padding: "4px 10px",
            borderRadius: 6,
            fontSize: 12,
            fontWeight: 700,
            pointerEvents: "none",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            zIndex: 10,
          }}
        >
          {data[hoverIdx].label}: {data[hoverIdx].formattedValue || data[hoverIdx].value}
        </div>
      )}
    </div>
  );
}

// ─── 2. DONUT CHART ───────────────────────────────────────────────────────────
export function DonutChart({ data = [], size = 160, centerLabel, centerValue }) {
  const [hoverIdx, setHoverIdx] = useState(null);
  const total = data.reduce((sum, d) => sum + d.value, 0) || 1;

  const radius = size / 2 - 16;
  const circumference = 2 * Math.PI * radius;

  // Precompute each slice's starting offset immutably (instead of mutating
  // a variable inside the render loop, which violates React's render-purity
  // rules and can misbehave under Strict Mode / concurrent rendering).
  const slices = data.reduce((acc, item) => {
    const prevCumulative = acc.length > 0 ? acc[acc.length - 1].cumulativeAfter : 0;
    acc.push({
      ...item,
      cumulativeBefore: prevCumulative,
      cumulativeAfter: prevCumulative + item.value / total,
    });
    return acc;
  }, []);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
      <div style={{ position: "relative", width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {slices.map((item, i) => {
            const strokeDasharray = `${(item.value / total) * circumference} ${circumference}`;
            const strokeDashoffset = -item.cumulativeBefore * circumference;
            const isHovered = hoverIdx === i;

            return (
              <circle
                key={i}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="transparent"
                stroke={item.color}
                strokeWidth={isHovered ? 20 : 16}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
                onMouseEnter={() => setHoverIdx(i)}
                onMouseLeave={() => setHoverIdx(null)}
                style={{
                  transition: "stroke-width 0.2s cubic-bezier(0.4,0,0.2,1)",
                  cursor: "pointer",
                }}
              />
            );
          })}
        </svg>

        {/* Center Text */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <span style={{ fontSize: 20, fontWeight: 800, color: "#0f172a" }}>
            {hoverIdx !== null ? data[hoverIdx].value : centerValue || total}
          </span>
          <span style={{ fontSize: 11, color: "#64748b", fontWeight: 600 }}>
            {hoverIdx !== null ? data[hoverIdx].label : centerLabel || "Total"}
          </span>
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1, minWidth: 140 }}>
        {data.map((item, i) => (
          <div
            key={i}
            onMouseEnter={() => setHoverIdx(i)}
            onMouseLeave={() => setHoverIdx(null)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: 13,
              cursor: "pointer",
              opacity: hoverIdx === null || hoverIdx === i ? 1 : 0.4,
              transition: "opacity 0.15s",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: item.color }} />
              <span style={{ fontWeight: 600, color: "#334155" }}>{item.label}</span>
            </div>
            <span style={{ fontWeight: 700, color: "#0f172a" }}>
              {Math.round((item.value / total) * 100)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── 3. LINE / AREA CHART ──────────────────────────────────────────────────────
export function AreaChart({ data = [], height = 180, color = "#0f766e" }) {
  const [hoverIdx, setHoverIdx] = useState(null);
  if (!data || data.length === 0) return null;

  const maxVal = Math.max(...data.map(d => d.value), 1);
  const chartHeight = height - 40;
  const paddingX = 20;

  // Compute SVG Points
  const points = data.map((d, i) => {
    const x = paddingX + (i / (data.length - 1 || 1)) * (300 - 2 * paddingX);
    const y = chartHeight - (d.value / maxVal) * chartHeight + 10;
    return { x, y, value: d.value, label: d.label };
  });

  const pathD = points.reduce(
    (acc, p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`),
    ""
  );

  const areaD = `${pathD} L ${points[points.length - 1].x} ${chartHeight + 10} L ${points[0].x} ${chartHeight + 10} Z`;

  return (
    <div style={{ width: "100%", position: "relative" }}>
      <svg width="100%" height={height} viewBox="0 0 300 180" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`gradient-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.35} />
            <stop offset="100%" stopColor={color} stopOpacity={0.0} />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[0.2, 0.5, 0.8].map((pct, i) => (
          <line
            key={i}
            x1="0"
            y1={chartHeight * pct + 10}
            x2="300"
            y2={chartHeight * pct + 10}
            stroke="#e2e8f0"
            strokeDasharray="4 4"
          />
        ))}

        {/* Gradient Fill under Line */}
        <path d={areaD} fill={`url(#gradient-${color.replace("#", "")})`} />

        {/* Curve Path */}
        <path d={pathD} fill="none" stroke={color} strokeWidth={3} strokeLinecap="round" />

        {/* Data points */}
        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={hoverIdx === i ? 6 : 4}
            fill={hoverIdx === i ? "#0f172a" : color}
            stroke="#ffffff"
            strokeWidth={2}
            onMouseEnter={() => setHoverIdx(i)}
            onMouseLeave={() => setHoverIdx(null)}
            style={{ cursor: "pointer", transition: "r 0.15s" }}
          />
        ))}
      </svg>

      {/* X Axis Labels */}
      <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 10px 0", marginTop: 2 }}>
        {data.map((d, i) => (
          <span
            key={i}
            style={{
              fontSize: 11,
              fontWeight: hoverIdx === i ? 700 : 500,
              color: hoverIdx === i ? "#0f172a" : "#64748b",
            }}
          >
            {d.label}
          </span>
        ))}
      </div>

      {/* Tooltip */}
      {hoverIdx !== null && (
        <div
          style={{
            position: "absolute",
            top: 10,
            left: `${(hoverIdx / (data.length - 1 || 1)) * 90 + 5}%`,
            background: "#0f172a",
            color: "#ffffff",
            padding: "4px 8px",
            borderRadius: 6,
            fontSize: 11,
            fontWeight: 700,
            pointerEvents: "none",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
        >
          {data[hoverIdx].label}: {data[hoverIdx].value}
        </div>
      )}
    </div>
  );
}
