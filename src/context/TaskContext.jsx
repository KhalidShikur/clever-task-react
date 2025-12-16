import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { estimateTimeFromTitle } from "../utils/smartSuggestion";

const TaskContext = createContext(null);

export const useTasks = () => {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("useTasks must be used inside TaskProvider");
  return ctx;
};

export function TaskProvider({ children }) {
  const [data, setData] = useState(() => {
    try {
      const raw = localStorage.getItem("clever_tasks_v2");
      return raw ? JSON.parse(raw) : {
        tasks: {}, // id -> task
        columns: { todo: [], progress: [], done: [] }
      };
    } catch (e) {
      console.error(e);
      return { tasks: {}, columns: { todo: [], progress: [], done: [] } };
    }
  });

  const [toast, setToast] = useState(null);

  // persist
  useEffect(() => {
    try {
      localStorage.setItem("clever_tasks_v2", JSON.stringify(data));
    } catch (e) {
      console.error(e);
    }
  }, [data]);

  // toast helper
  const addToast = useCallback((message, type='info', duration=3000) => {
    const id = Date.now() + Math.random().toString(36).slice(2,6);
    setToast({ id, message, type });
    setTimeout(() => setToast(null), duration);
  }, []);

  // create task
  const createTask = useCallback((payload) => {
    const id = payload.id || 'task-' + Math.random().toString(36).slice(2,9);
    const task = {
      id,
      title: payload.title || 'Untitled',
      description: payload.description || '',
      priority: payload.priority || 'Medium',
      estimate: payload.estimate || estimateTimeFromTitle(payload.title),
      status: payload.status || 'todo',
      createdAt: Date.now()
    };
    setData(prev => {
      const tasks = { ...prev.tasks, [id]: task };
      const columns = { ...prev.columns, [task.status]: [id, ...(prev.columns[task.status] || [])] };
      return { tasks, columns };
    });
    addToast('Task created', 'success');
  }, [addToast]);

  // remove
  const removeTask = useCallback((taskId) => {
    setData(prev => {
      if (!prev.tasks[taskId]) return prev;
      const status = prev.tasks[taskId].status;
      const tasks = { ...prev.tasks };
      delete tasks[taskId];
      const columns = { ...prev.columns, [status]: prev.columns[status].filter(id => id !== taskId) };
      return { tasks, columns };
    });
    addToast('Task deleted', 'info');
  }, [addToast]);

  // move (fromCol, toCol, taskId, index)
  const moveTask = useCallback((fromCol, toCol, taskId, index = 0) => {
    setData(prev => {
      if (!prev.tasks[taskId]) return prev;
      const source = prev.columns[fromCol].filter(id => id !== taskId);
      const dest = [...prev.columns[toCol]];
      dest.splice(index, 0, taskId);
      const tasks = { ...prev.tasks, [taskId]: { ...prev.tasks[taskId], status: toCol } };
      const columns = { ...prev.columns, [fromCol]: source, [toCol]: dest };
      return { tasks, columns };
    });
    addToast('Task moved', 'info');
  }, [addToast]);

  // update
  const updateTask = useCallback((taskId, patch) => {
    setData(prev => {
      if (!prev.tasks[taskId]) return prev;
      const task = { ...prev.tasks[taskId], ...patch };
      const tasks = { ...prev.tasks, [taskId]: task };
      return { ...prev, tasks };
    });
    addToast('Task updated', 'success');
  }, [addToast]);

  const value = { data, createTask, removeTask, moveTask, updateTask, toast, addToast, setData };
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}
