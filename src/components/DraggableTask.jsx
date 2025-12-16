import React from "react";
import { useTasks } from "../context/TaskContext";

export default function DraggableTask({ task, column }) {
  const { removeTask } = useTasks();
  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("task-id", task.id);
        e.dataTransfer.setData("from-column", column);
        e.dataTransfer.effectAllowed = "move";
      }}
      className="card p-3 select-none cursor-grab active:cursor-grabbing"
    >
      <div className="flex justify-between items-start gap-2">
        <div>
          <h4 className="font-semibold text-sm">{task.title}</h4>
          {task.estimate && <div className="text-xs text-slate-500 mt-1">{task.estimate}</div>}
          {task.description && <div className="text-sm text-slate-600 dark:text-slate-300 mt-1">{task.description}</div>}
        </div>
        <div className="flex flex-col items-end gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation(); // prevent drag start
              removeTask(task.id);
            }}
            className="text-red-500 text-xs hover:opacity-70"
          >
            ✕
          </button>
          <span className={`px-2 py-1 rounded text-xs ${task.priority === 'High' ? 'text-red-700 bg-red-100' : task.priority === 'Low' ? 'text-green-700 bg-green-100' : 'text-amber-700 bg-amber-100'}`}>
            {task.priority}
          </span>
        </div>
      </div>
    </div>
  );
}
