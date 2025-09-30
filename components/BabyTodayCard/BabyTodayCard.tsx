"use client";
import Image from "next/image";
import css from "./BabyTodayCard.module.css";
import { useQuery } from "@tanstack/react-query";
import { getBabyClient } from "@/lib/api/clientApi";
import { useGetCurrentWeek } from "@/lib/store/getCurrentWeekStore";

const BabyTodayCard = () => {
  const { initialWeek: weekNumber = 1 } = useGetCurrentWeek();

  const { data: baby, isSuccess } = useQuery({
    queryKey: ["weeks", weekNumber],
    queryFn: () => getBabyClient(Number(weekNumber)),
  });

  return (
    <div className={css.card}>
      {isSuccess && (
        <>
          <h2 className={css.title}>Малюк сьогодні</h2>
          <div className={css.wrap}>
            <Image
              src={baby?.image ?? "/placeholder.png"}
              alt="baby"
              width={257}
              height={194}
              className={css.img}
            />
            <div className={css.babyInfo}>
              <p className={css.infoTitle}>
                Розмір:
                <span className={css.infoText}>
                  Приблизно {baby?.babySize} см
                </span>
              </p>
              <p className={css.infoTitle}>
                Вага:
                <span className={css.infoText}>
                  Близько {baby?.babyWeight} грамів.
                </span>
              </p>
              <p className={css.infoTitle}>
                Активність:
                <span className={css.infoText}>{baby?.babyActivity}</span>
              </p>
            </div>
          </div>

          <p className={css.babyFact}>{baby?.interestingFact}</p>
        </>
      )}
    </div>
  );
};

export default BabyTodayCard;
