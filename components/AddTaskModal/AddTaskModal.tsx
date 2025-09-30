"use client";

import { useEffect } from "react";
import css from "./AddTaskModal.module.css";
import AddTaskForm from "../AddTaskForm/AddTaskForm";
import { toast } from "react-toastify";
import { Task, TaskFormValues, tasksApi } from "@/lib/api/clientApi";

interface AddTaskModalProps {
  isOpen: boolean;
  initialData?: Task;
  onTaskSaved: (task: Task) => void;
  onClose: () => void;
}

export default function AddTaskModal({
  isOpen,
  initialData,
  onTaskSaved,
  onClose,
}: AddTaskModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (values: TaskFormValues) => {
    try {
      const response = await tasksApi.createTask({
        text: values.text,
        date: values.date,
        isDone: false,
      });

      onTaskSaved(response.data);
    } catch (error: unknown) {
      if (error instanceof Error) toast.error(error.message);
      else toast.error("Сталася невідома помилка");
    } finally {
      onClose();
    }
  };

  return (
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={css.title}>Нове завдання</h2>
        <button
          className={css.closeBtn}
          onClick={onClose}
          aria-label="Close modal"
        >
          <svg width="24" height="24" fill="currentColor">
            <use href="/leleka-sprite.svg#icon-close" />
          </svg>
        </button>

        <AddTaskForm initialData={initialData} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
