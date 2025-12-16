import React from "react";
import useDarkMode from "../hooks/useDarkMode";

export default function Header({ onNew, search, setSearch, filter, setFilter }) {
  const [isDark, setIsDark] = useDarkMode();

  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold">Clever Task Board</h1>
        <p className="text-xs text-slate-500">Drag tasks, estimate time, keyboard shortcuts: N = new</p>
      </div>

      <div className="flex items-center gap-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tasks..."
          className="p-2 rounded border dark:border-slate-700 bg-white dark:bg-slate-800"
        />
        <select value={filter} onChange={(e)=>setFilter(e.target.value)} className="p-2 rounded border dark:border-slate-700 bg-white dark:bg-slate-800">
          <option value="all">All priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <button onClick={onNew} className="px-3 py-1 bg-indigo-600 text-white rounded">New (N)</button>
        <button
          onClick={() => setIsDark(!isDark)}
          className="px-3 py-1 rounded border dark:border-slate-700"
        >
          {isDark ? 'Light' : 'Dark'}
        </button>
      </div>
    </div>
  );
}
