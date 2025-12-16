import React, { useEffect, useState } from "react";
import { useTasks } from "../context/TaskContext";
import { estimateTimeFromTitle } from "../utils/smartSuggestion";

export default function TaskModal({ open, onClose, initial = {} }) {
  const { createTask, updateTask, removeTask } = useTasks();
  const [title, setTitle] = useState(initial.title || "");
  const [description, setDescription] = useState(initial.description || "");
  const [priority, setPriority] = useState(initial.priority || "Medium");
  const [estimate, setEstimate] = useState(initial.estimate || "");

  useEffect(() => {
    setEstimate(estimateTimeFromTitle(title));
  }, [title]);

  useEffect(() => {
    if (open && initial) {
      setTitle(initial.title || "");
      setDescription(initial.description || "");
      setPriority(initial.priority || "Medium");
      setEstimate(initial.estimate || "");
    }
  }, [open, initial]);

  if (!open) return null;

  const submit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    if (initial && initial.id) {
      updateTask(initial.id, { title, description, priority, estimate });
    } else {
      createTask({ title, description, priority, estimate, status: initial.status || 'todo' });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <form onSubmit={submit} className="relative z-10 w-full max-w-md card p-5">
        <h3 className="font-bold mb-3">{initial.id ? 'Edit Task' : 'New Task'}</h3>
        <input value={title} onChange={(e) => setTitle(e.target.value)} autoFocus placeholder="Title" className="w-full mb-2 p-2 rounded border dark:border-slate-700 bg-slate-50 dark:bg-slate-900" />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" rows={3} className="w-full mb-2 p-2 rounded border dark:border-slate-700 bg-slate-50 dark:bg-slate-900" />
        <div className="flex gap-2 items-center mb-3">
          <select value={priority} onChange={(e) => setPriority(e.target.value)} className="p-2 rounded border dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
          <div className="text-sm text-slate-500 dark:text-slate-400">Est: {estimate || '-'}</div>
        </div>
        <div className="flex justify-between mt-4">
          {initial.id ? (
            <button
              type="button"
              onClick={() => {
                removeTask(initial.id);
                onClose();
              }}
              className="px-3 py-1 rounded bg-red-600 text-white"
            >
              Delete
            </button>
          ) : <div />}

          <div className="flex gap-2">
            <button type="button" onClick={onClose} className="px-3 py-1 rounded">
              Cancel
            </button>
            <button type="submit" className="px-3 py-1 rounded bg-indigo-600 text-white">
              {initial.id ? 'Save' : 'Create'}
            </button>
          </div>
        </div>

      </form>
    </div>
  );
}
