import React, { useState, useEffect } from "react";
import { fetchQueueEstimate } from "../../utils/api";

export default function QueueBadge({ doctorId, date, time }) {
  const [queue, setQueue] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetchQueueEstimate(doctorId, date, time)
      .then((data) => {
        if (!cancelled) setQueue(data);
      })
      .catch(() => {
        // Non-critical — just don't show the badge if it fails.
      });
    return () => {
      cancelled = true;
    };
  }, [doctorId, date, time]);

  if (!queue) return null;

  const isFirst = queue.position <= 1;

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        background: isFirst ? "#f0fdf4" : "#fff7ed",
        color: isFirst ? "#15803d" : "#c2410c",
        border: `1px solid ${isFirst ? "#bbf7d0" : "#ffedd5"}`,
        padding: "4px 10px",
        borderRadius: 8,
        fontSize: 12,
        fontWeight: 700,
      }}
    >
      🧍 {isFirst ? "You're first in line" : `#${queue.position} in line`}
      {!isFirst && ` · ~${queue.estimatedWaitMinutes} min wait`}
    </div>
  );
}
