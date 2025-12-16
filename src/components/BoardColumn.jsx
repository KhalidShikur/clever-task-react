import React from "react";
import { useTasks } from "../context/TaskContext";
import DraggableTask from "./DraggableTask";
import ProgressBar from "./ProgressBar";

export default function BoardColumn({ title, column, search, filter }) {
  const { data, moveTask } = useTasks();
  const ids = (data && data.columns && data.columns[column]) || [];
  let tasks = ids.map(id => data.tasks[id]).filter(Boolean);

  // apply search & filter
  if (search) {
    const q = search.toLowerCase();
    tasks = tasks.filter(t => t.title.toLowerCase().includes(q) || (t.description || '').toLowerCase().includes(q));
  }
  if (filter && filter !== 'all') {
    tasks = tasks.filter(t => t.priority === filter);
  }

  const doneCount = tasks.filter(t => t.status === 'done').length;
  const totalCount = tasks.length;

  const onDrop = (e) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("task-id");
    const fromColumn = e.dataTransfer.getData("from-column");
    if (!taskId || !fromColumn) return;
    if (fromColumn === column) return;
    // add to top (index 0)
    moveTask(fromColumn, column, taskId, 0);
  };

  const allowDrop = (e) => e.preventDefault();

  return (
    <div onDragOver={allowDrop} onDrop={onDrop} className="flex-1 min-w-[260px]">
      <div className="p-3 rounded-lg border border-dashed border-slate-200 dark:border-slate-700 h-full flex flex-col">
        <div className="mb-3">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-bold">{title}</h2>
            <span className="text-xs text-slate-500 dark:text-slate-400">{totalCount}</span>
          </div>
          <ProgressBar done={doneCount} total={totalCount} />
        </div>

        <div className="flex-1 space-y-3 overflow-auto">
          {tasks.map(task => <DraggableTask key={task.id} task={task} column={column} />)}
        </div>
      </div>
    </div>
  );
}
