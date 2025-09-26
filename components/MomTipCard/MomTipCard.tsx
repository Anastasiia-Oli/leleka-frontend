"use client";
import { useQuery } from "@tanstack/react-query";
import css from "./MomTipCard.module.css";
import { getWeekDetails } from "@/lib/api/clientApi";

export default function MomTipCard({ weekNumber }: { weekNumber: number }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["momTip", weekNumber],
    queryFn: () => getWeekDetails(weekNumber),
  });

  if (isLoading) return <p>Завантаження...</p>;
  if (error) return <p>Помилка при завантаженні поради</p>;

  const todayIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;
  const tip = data?.momDailyTips?.[todayIndex];

  return (
    <section className={css.tipSection}>
      <div className={css.tipHeader}>
        <svg width={24} height={24} className={css.icon}>
          <use href="/leleka-sprite.svg#icon-heart"></use>
        </svg>
        <h3 className={css.tipTitle}>Порада для мами</h3>
      </div>
      <p className={css.tipText}>{tip}</p>
    </section>
  );
}
