import React from "react";

export default function ProgressBar({ done, total }) {
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  return (
    <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded overflow-hidden">
      <div className="h-2 bg-primary" style={{ width: `${pct}%` }} />
    </div>
  );
}
