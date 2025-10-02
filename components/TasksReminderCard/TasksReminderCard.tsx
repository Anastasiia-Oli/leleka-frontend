"use client";
import { changeStateTask, getTasks } from "@/lib/api/clientApi";
import { Task } from "@/types/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import css from "./TasksReminderCard.module.css";
import AddTaskModal from "../AddTaskModal/AddTaskModal";
import { useAuthUserStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";

function formateDate(date?: string) {
  if (date) {
    const d = new Date(date);
    return d.toLocaleDateString("uk-UA", {
      day: "2-digit",
      month: "2-digit",
    });
  }
  return new Date().toDateString();
}

const TasksReminderCard = () => {
  const { isAuthenticated } = useAuthUserStore();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isModalOpen]);

  const {
    data: tasks = [],
    isSuccess,
    isPending,
  } = useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: getTasks,
    refetchOnMount: false,
    enabled: isAuthenticated,
  });

  const { mutate } = useMutation({
    mutationFn: (task: Task) => changeStateTask(task, !task.isDone),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  const today = new Date().toISOString().slice(0, 10);

  const todayTasks = tasks.filter((t) => t.date === today && t.isDone !== true);
  const futureTasks = tasks.filter(
    (t) => t.date && t.date > today && t.isDone !== true
  );
  const execTasks = tasks.filter((t) => t.isDone === true);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleTaskSaved = () => {
    queryClient.invalidateQueries({ queryKey: ["tasks"] });
    handleCloseModal();
  };

  return (
    <>
      {!isAuthenticated ? (
        <div className={css.card}>
          <div className={css.listHeader}>
            <h3 className="header-third">Важливі завдання</h3>
            <button
              className={css.newTask}
              onClick={() => {
                router.push("/auth/login");
              }}
            >
              <svg viewBox="0 0 32 32" width="20" height="20">
                <path
                  d="M16 03v26M03 16h26"
                  stroke="currentColor"
                  strokeWidth="3"
                />
              </svg>
            </button>
          </div>
          <h3 className={css.unAuthTitle}>Наразі немає жодних завдань</h3>
          <p className={css.unAuthEmpty}>Створіть мершій нове завдання!</p>
          <button
            type="button"
            className={`${css.btn} text-medium`}
            id="openTaskModal"
            onClick={() => {
              router.push("/auth/login");
            }}
          >
            Створити завдання
          </button>
        </div>
      ) : (
        <div className={css.card}>
          <div className={css.listHeader}>
            <h3 className="header-third">Важливі завдання</h3>
            <button className={css.newTask} onClick={handleOpenModal}>
              <svg viewBox="0 0 32 32" width="20" height="20">
                <path
                  d="M16 03v26M03 16h26"
                  stroke="currentColor"
                  strokeWidth="3"
                />
              </svg>
            </button>
          </div>

          {isSuccess && tasks.length === 0 && (
            <>
              <div>
                <p className="text-bold">Наразі немає жодних завдань</p>
                <p className="text-primary">Створіть мершій нове завдання!</p>
              </div>
              <button
                type="button"
                className={`${css.btn} text-medium`}
                id="openTaskModal"
                onClick={handleOpenModal}
              >
                Створити завдання
              </button>
            </>
          )}

          {isSuccess && tasks.length > 0 && (
            <>
              <h3 className={css.sectionTitle}>Сьогодні:</h3>
              <ul className={css.list}>
                {todayTasks.length === 0 && (
                  <p className={css.empty}>Немає завдань</p>
                )}
                {todayTasks.map((task) => (
                  <li key={task._id} className={css.listItem}>
                    <span className={css.date}>{formateDate(task.date)}</span>
                    <input
                      type="checkbox"
                      checked={task.isDone}
                      onChange={() => mutate(task)}
                      className={css.checkbox}
                      disabled={isPending}
                    />
                    <span
                      className={`${css.text} ${task.isDone ? css.done : ""}`}
                    >
                      {task.text}
                    </span>
                  </li>
                ))}
              </ul>

              <h3 className={css.sectionTitle}>Найближчий тиждень:</h3>
              <ul className={css.list}>
                {futureTasks.length === 0 && (
                  <p className={css.empty}>Немає завдань</p>
                )}
                {futureTasks.map((task) => (
                  <li key={task._id} className={css.listItem}>
                    <span className={css.date}>{formateDate(task.date)}</span>
                    <input
                      type="checkbox"
                      checked={task.isDone}
                      onChange={() => mutate(task)}
                      className={css.checkbox}
                      disabled={isPending}
                    />
                    <span
                      className={`${css.text} ${task.isDone ? css.done : ""}`}
                    >
                      {task.text}
                    </span>
                  </li>
                ))}
              </ul>

              <h3 className={css.sectionTitle}>
                Виконані завдання за тиждень:
              </h3>
              <ul className={css.list}>
                {execTasks.length === 0 && (
                  <p className={css.empty}>Немає завдань</p>
                )}
                {execTasks.map((task) => (
                  <li key={task._id} className={css.listItem}>
                    <span className={css.date}>{formateDate(task.date)}</span>
                    <input
                      type="checkbox"
                      checked={task.isDone}
                      onChange={() => mutate(task)}
                      className={css.checkbox}
                      disabled={isPending}
                    />
                    <span
                      className={`${css.text} ${task.isDone ? css.done : ""}`}
                    >
                      {task.text}
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}

          <AddTaskModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onTaskSaved={handleTaskSaved}
          />
        </div>
      )}
    </>
  );
};

export default TasksReminderCard;
// hhh
