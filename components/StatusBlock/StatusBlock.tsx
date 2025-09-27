"use client";

import css from "./StatusBlock.module.css";
import { useAuthUserStore } from "@/lib/store/authStore";
import { useGetCurrentWeek } from "@/lib/store/getCurrentWeekStore";

const StatusBlock = () => {
  const user = useAuthUserStore((state) => state.user);
  const getCurrWeek = useGetCurrentWeek((state) => state.getCurrWeek);
  const dueDate = new Date(user.dueDate ? user.dueDate + "T00:00:00" : "");
  console.log(dueDate);
  const isValidDate = dueDate instanceof Date && !isNaN(dueDate.getTime());
  if (!isValidDate) {
    return (
      <div className={css.wrapper}>
        <div className={css.box}>
          <p className={css.boxTitle}>Дата не задана</p>
          <p className={css.boxTextNan}>Вкажіть дату пологів</p>
        </div>
      </div>
    );
  }

  const today = new Date();
  const pregancyStart = new Date(dueDate.getTime() - 280 * 24 * 60 * 60 * 1000);
  const week = Math.floor(
    (today.getTime() - pregancyStart.getTime()) / (7 * 24 * 60 * 60 * 1000)
  );
  getCurrWeek(week);
  const daysLeft = Math.ceil(
    (dueDate.getTime() - today.getTime()) / (24 * 60 * 60 * 1000)
  );

  return (
    <div className={css.wrapper}>
      <div className={css.box}>
        <p className={css.boxTitle}>Тиждень</p>
        <p className={css.boxText}>{week}</p>
      </div>
      <div className={css.box}>
        <p className={css.boxTitle}>Днів до зустрічі</p>
        <p className={css.boxText}>~{daysLeft}</p>
      </div>
    </div>
  );
};

export default StatusBlock;
