"use client";

import { useState } from "react";
import AddTaskModal, { Task } from "@/components/AddTaskModal/AddTaskModal";

export default function TestPage() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleTaskSaved = (task: Task) => {
    // Додаємо нове завдання або оновлюємо існуюче
    setTasks((prev) => {
      const exists = prev.find((t) => t._id === task._id);
      if (exists) {
        return prev.map((t) => (t._id === task._id ? task : t));
      }
      return [...prev, task];
    });
    console.log("Збережено завдання:", task);
  };

  return (
    <section style={{ padding: "2rem" }}>
      <h1>Тест модалки</h1>
      <button onClick={() => setModalOpen(true)}>+ Додати завдання</button>

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onTaskSaved={handleTaskSaved}
      />

      <h2>Список завдань:</h2>
      <ul>
        {tasks
          .sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          )
          .map((task) => (
            <li key={task._id}>
              {task.title} — {task.date}
            </li>
          ))}
      </ul>
    </section>
  );
}
