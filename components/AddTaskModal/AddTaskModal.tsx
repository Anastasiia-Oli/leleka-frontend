"use client";

import { useEffect } from "react";
import css from "./AddTaskModal.module.css";
import AddTaskForm from "../AddTaskForm/AddTaskForm";
import { toast } from "react-toastify";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface Task {
  _id?: string;
  title: string;
  date: string;
}

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Task;
  onTaskSaved: (task: Task) => void;
}

export default function AddTaskModal({
  isOpen,
  onClose,
  initialData,
  onTaskSaved,
}: AddTaskModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;
  const handleSubmit = async (values: Task) => {
    try {
      const url = values._id
        ? `${API_URL}/tasks/${values._id}`
        : `${API_URL}/tasks`;

      const response = await fetch(url, {
        method: values._id ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Помилка сервера");
      }

      const savedTask: Task = await response.json();
      onTaskSaved(savedTask);
      toast.success(values._id ? "Завдання оновлено!" : "Завдання створено!");
      onClose();
    } catch (error: unknown) {
      if (error instanceof Error) toast.error(error.message);
      else toast.error("Сталася невідома помилка");
    }
  };

  return (
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={css.title}>
          {initialData ? "Редагувати завдання" : "Нове завдання"}
        </h2>
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
