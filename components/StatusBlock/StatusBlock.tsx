"use client";

import css from "./StatusBlock.module.css";
import { useAuthUserStore } from "@/lib/store/authStore";
import { useGetCurrentWeek } from "@/lib/store/getCurrentWeekStore";
import { useEffect } from "react";

const StatusBlock = () => {
  const user = useAuthUserStore((state) => state.user);
  const { getCurrWeek } = useGetCurrentWeek();

  const dueDateM = new Date(user.dueDate ? user.dueDate + "T00:00:00" : "");
  const isValidDate = dueDateM instanceof Date && !isNaN(dueDateM.getTime());

  let week = null;
  let daysLeft = null;

  const today = new Date();
  const pregancyStart = new Date(
    dueDateM.getTime() - 280 * 24 * 60 * 60 * 1000
  );
  week = Math.floor(
    (today.getTime() - pregancyStart.getTime()) / (7 * 24 * 60 * 60 * 1000)
  );
  daysLeft = Math.ceil(
    (dueDateM.getTime() - today.getTime()) / (24 * 60 * 60 * 1000)
  );

  useEffect(() => {
    if (Number.isFinite(week) && week > 0) {
      getCurrWeek(week);
    }
  }, [week, getCurrWeek]);

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

  // const today = new Date();
  // const pregancyStart = new Date(
  //   dueDateM.getTime() - 280 * 24 * 60 * 60 * 1000
  // );
  // const week = Math.floor(
  //   (today.getTime() - pregancyStart.getTime()) / (7 * 24 * 60 * 60 * 1000)
  // );

  // // useEffect(() => {
  // //   getCurrWeek(week);
  // // }, [week]);

  // const daysLeft = Math.ceil(
  //   (dueDateM.getTime() - today.getTime()) / (24 * 60 * 60 * 1000)
  // );

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
