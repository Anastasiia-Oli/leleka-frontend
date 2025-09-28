"use client";

import { useEffect, useState } from "react";
import styles from "./MomTipCard.module.css";
import { useGetCurrentWeek } from "@/lib/store/getCurrentWeekStore";

const MomTipCard = () => {
  const { initialWeek: weekNumber } = useGetCurrentWeek();
  const [tip, setTip] = useState<string>("Завантаження поради...");

  useEffect(() => {
    const fetchTip = async () => {
      try {
        if (!weekNumber) {
          setTip("Тиждень не визначено");
          return;
        }

        const res = await fetch(`/api/weeks/${weekNumber}`);
        const data = await res.json();

        const tips: string[] = data?.data?.baby?.momDailyTips || [];

        if (tips.length === 0) {
          setTip("Порада відсутня");
          return;
        }

        // ---- тут рахуємо день (міняється раз на 24 години) ----
        const today = new Date();
        const daysSinceEpoch = Math.floor(today.getTime() / (24 * 60 * 60 * 1000));

        // Беремо по черзі поради з масиву
        const tipIndex = daysSinceEpoch % tips.length;

        setTip(tips[tipIndex] || "Порада відсутня");
      } catch (err) {
        console.error(err);
        setTip("Помилка при завантаженні поради");
      }
    };

    fetchTip();
  }, [weekNumber]);

  return (
  <div className={styles.card}>
    <div className={styles.title}>Порада для мами</div>
    <div className={styles.tipBlock}>{tip}</div>
  </div>
);

};

export default MomTipCard;