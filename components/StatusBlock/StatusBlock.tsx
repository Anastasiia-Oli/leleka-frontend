"use client";

import css from "./StatusBlock.module.css";
import { useAuthUserStore } from "@/lib/store/authStore";
import { useGetCurrentWeek } from "@/lib/store/getCurrentWeekStore";
import { useEffect } from "react";

const StatusBlock = () => {
  const user = useAuthUserStore((state) => state.user);
  const { isAuthenticated } = useAuthUserStore();
  const { getCurrWeek } = useGetCurrentWeek();

  const dueDateM = new Date(user.dueDate ? user.dueDate + "T00:00:00" : "");
  const isValidDate = dueDateM instanceof Date && !isNaN(dueDateM.getTime());

  let week = 0;
  let daysLeft;

  if (isValidDate) {
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
  }

  useEffect(() => {
    if (Number.isFinite(week) && week > 0) {
      getCurrWeek(week);
    }
  }, [week, getCurrWeek]);

  if (!isValidDate && isAuthenticated) {
    return (
      <div className={css.wrapper}>
        <div className={css.box}>
          <p className="header-fourth">Вкажіть дату пологів</p>
        </div>
      </div>
    );
  }

  return (
    <div className={css.wrapper}>
      {!isAuthenticated ? (
        <>
          <div className={css.box}>
            <p className={css.boxTitle}>Тиждень</p>
            <p className={css.boxText}>1</p>
          </div>
          <div className={css.box}>
            <p className={css.boxTitle}>Днів до зустрічі</p>
            <p className={css.boxText}>~280</p>
          </div>
        </>
      ) : (
        <>
          <div className={css.box}>
            <p className={css.boxTitle}>Тиждень</p>
            <p className={css.boxText}>{week}</p>
          </div>
          <div className={css.box}>
            <p className={css.boxTitle}>Днів до зустрічі</p>
            <p className={css.boxText}>~{daysLeft}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default StatusBlock;
