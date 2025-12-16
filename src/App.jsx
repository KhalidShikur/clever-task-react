import React, { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import BoardColumn from "./components/BoardColumn";
import TaskModal from "./components/TaskModal";
import Toast from "./components/Toast";
import { TaskProvider } from "./context/TaskContext";
import "./index.css";

function AppInner() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalInitial, setModalInitial] = useState(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  // shortcuts
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'n' || e.key === 'N') {
        setModalInitial({ status: 'todo' });
        setModalOpen(true);
      }
      if (e.key === 'Escape') {
        setModalOpen(false);
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        // just flash toast via DOM custom event or rely on TaskContext addToast - simpler: dispatch event
        window.dispatchEvent(new CustomEvent('clever-save'));
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-[1200px] mx-auto">
        <Header onNew={() => { setModalInitial({ status: 'todo' }); setModalOpen(true); }} search={search} setSearch={setSearch} filter={filter} setFilter={setFilter} />
        <div className="flex gap-4">
          <BoardColumn title="To Do" column="todo" search={search} filter={filter} />
          <BoardColumn title="On Progress" column="progress" search={search} filter={filter} />
          <BoardColumn title="Done" column="done" search={search} filter={filter} />
        </div>
      </div>

      <TaskModal open={modalOpen} onClose={() => setModalOpen(false)} initial={modalInitial || {}} />
      <Toast />
    </div>
  );
}

export default function App() {
  // wrap with provider here to ensure useTasks works
  return (
    <TaskProvider>
      <AppInner />
    </TaskProvider>
  );
}
