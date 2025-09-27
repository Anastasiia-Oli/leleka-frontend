"use client";
//delate later
import { useState } from "react";
import AddTaskModal, { Task } from "../../components/AddTaskModal/AddTaskModal";
export default function TestModalPage() {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleTaskSaved = (task: Task) => {
    console.log("Тестово збережено завдання:", task);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Тест модалки завдань</h1>
      <button onClick={() => setModalOpen(true)}>+ Додати завдання</button>

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onTaskSaved={handleTaskSaved}
      />
    </div>
  );
}
