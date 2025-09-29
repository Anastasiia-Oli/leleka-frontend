"use client";
import { changeStateTask, getTasks } from "@/lib/api/clientApi";
import { Task } from "@/types/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import css from "./TasksReminderCard.module.css";

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
  const queryClient = useQueryClient();

  const {
    data: tasks = [],
    isSuccess,
    isPending,
  } = useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: getTasks,
    refetchOnMount: false,
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

  return (
    <div className={css.card}>
      <div className={css.listHeader}>
        <h2 className={css.title}>Важливі завдання</h2>
        <Link href={`/tasks`} className={css.newTask} id="openTaskModal">
          +
        </Link>
      </div>

      {isSuccess && tasks.length === 0 && (
        <>
          <div>
            <h3 className={css.sectionTitle}>Наразі немає жодних завдань</h3>
            <p className={css.empty}>Створіть мершій нове завдання!</p>
          </div>
          <Link href={`/tasks`} className={css.btn} id="openTaskModal">
            Створити завдання
          </Link>
        </>
      )}

      {isSuccess && tasks.length > 0 && (
        <>
          <h3 className={css.sectionTitle}>Сьогодні:</h3>
          <ul className={css.list}>
            {todayTasks.length === 0 && (
              <p className={css.empty}>Немає завдань</p>
            )}
            {todayTasks.length > 0 &&
              todayTasks.map((task) => (
                <li key={task._id} className={css.listItem}>
                  <span className={css.date}>{formateDate(task.date)}</span>
                  <input
                    type="checkbox"
                    checked={task.isDone}
                    onChange={() => mutate(task)}
                    className={css.checkbox}
                    disabled={isPending}
                  ></input>
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
            {futureTasks.length > 0 &&
              futureTasks.map((task) => (
                <li key={task._id} className={css.listItem}>
                  <span className={css.date}>{formateDate(task.date)}</span>
                  <input
                    type="checkbox"
                    checked={task.isDone}
                    onChange={() => mutate(task)}
                    className={css.checkbox}
                    disabled={isPending}
                  ></input>
                  <span
                    className={`${css.text} ${task.isDone ? css.done : ""}`}
                  >
                    {task.text}
                  </span>
                </li>
              ))}
          </ul>

          <h3 className={css.sectionTitle}>Виконані завдання за тиждень:</h3>
          <ul className={css.list}>
            {execTasks.length === 0 && (
              <p className={css.empty}>Немає завдань</p>
            )}
            {execTasks.length > 0 &&
              execTasks.map((task) => (
                <li key={task._id} className={css.listItem}>
                  <span className={css.date}>{formateDate(task.date)}</span>
                  <input
                    type="checkbox"
                    checked={task.isDone}
                    onChange={() => mutate(task)}
                    className={css.checkbox}
                    disabled={isPending}
                  ></input>
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
    </div>
  );
};

export default TasksReminderCard;
