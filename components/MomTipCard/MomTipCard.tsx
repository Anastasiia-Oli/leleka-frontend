"use client";

import { useEffect, useState } from "react";
import styles from "./MomTipCard.module.css";
import { useGetCurrentWeek } from "@/lib/store/getCurrentWeekStore";
import { useAuthUserStore } from "@/lib/store/authStore";

const DEFAULT_TIP =
  "Включіть у свій розклад помірну фізичну активність, наприклад, прогулянки або йогу.";

const MomTipCard = () => {
  const { isAuthenticated } = useAuthUserStore();
  const { initialWeek: weekNumber } = useGetCurrentWeek();
  const [tip, setTip] = useState("Завантаження поради...");

  useEffect(() => {
    const fetchTip = async () => {
      if (!weekNumber) {
        setTip("Тиждень не визначено");
        return;
      }

      if (!isAuthenticated) {
        setTip(DEFAULT_TIP);
        return;
      }

      try {
        const res = await fetch(`/api/weeks/${weekNumber}`);

        if (!res.ok) {
          setTip("Не вдалося завантажити пораду");
          return;
        }

        const data = await res.json();
        const tips: string[] = data?.data?.baby?.momDailyTips || [];

        if (tips.length === 0) {
          setTip("Порада відсутня");
          return;
        }

        const today = new Date();
        const daysSinceEpoch = Math.floor(today.getTime() / 86400000);
        const tipIndex = daysSinceEpoch % tips.length;

        setTip(tips[tipIndex]);
      } catch (err) {
        console.error(err);
        setTip("Помилка при завантаженні поради");
      }
    };

    fetchTip();
  }, [weekNumber, isAuthenticated]);

  return (
    <div className={styles.card}>
      <h3 className="header-third">Порада для мами</h3>
      <p className="text-primary">{tip}</p>
    </div>
  );
};

export default MomTipCard;
