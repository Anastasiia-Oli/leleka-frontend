"use client";
import { getTasks } from "@/lib/api/clientApi";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { useState } from "react";

const TasksReminderCard = () => {
  const [isDone, setIsDone] = useState<boolean>(false);

  const { data, isSuccess } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => getTasks(),
  });

  return (
    <>
      <div>
        <h2>Важливі завдання</h2>
        <button>+</button>
      </div>
      {isSuccess && data.data.length === 0 && (
        <div>
          <h3>Наразі немає жодних завдань</h3>
          <p>Створіть мершій нове завдання!</p>
        </div>
      )}
      {isSuccess &&
        data.data.map((task) => {
          const date = new Date().toISOString().slice(0, 10);
          task.date === date ? <p></p> : null;
        })}

      <Link href={`/tasks`}>Створити завдання</Link>
    </>
  );
};

export default TasksReminderCard;
