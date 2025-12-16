import React from "react";
import { useTasks } from "../context/TaskContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Toast() {
  const { toast } = useTasks();

  return (
    <div className="fixed top-4 right-4 z-50">
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }} className="px-4 py-2 rounded shadow text-white bg-primary">
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
