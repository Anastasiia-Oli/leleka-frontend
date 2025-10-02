"use client";
import Image from "next/image";
import css from "./BabyTodayCard.module.css";
import { useQuery } from "@tanstack/react-query";
import { getBabyClient } from "@/lib/api/clientApi";
import { useGetCurrentWeek } from "@/lib/store/getCurrentWeekStore";

const BabyTodayCard = () => {
  const { initialWeek: weekNumber = 10 } = useGetCurrentWeek();

  const { data: baby, isSuccess } = useQuery({
    queryKey: ["weeks", weekNumber],
    queryFn: () => getBabyClient(Number(weekNumber)),
  });

  return (
    <div className={css.card}>
      {isSuccess && (
        <>
          <h3 className="header-third">Малюк сьогодні</h3>
          <div className={css.wrap}>
            <div className={css.imgBox}>
              <Image
                src={baby?.image ?? "/placeholder.png"}
                alt="baby"
                fill
                className={css.img}
              />
            </div>
            <div className={css.babyInfo}>
              <p className="text-bold">
                Розмір:
                <span className={`${css.span} text-primary`}>
                  Приблизно {baby?.babySize} см
                </span>
              </p>
              <p className="text-bold">
                Вага:
                <span className={`${css.span} text-primary`}>
                  Близько {baby?.babyWeight} грамів.
                </span>
              </p>
              <p className="text-bold">
                Активність:
                <span className={`${css.span} text-primary`}>{baby?.babyActivity}</span>
              </p>
            </div>
          </div>

          <p className="text-primary">{baby?.interestingFact}</p>
        </>
      )}
    </div>
  );
};

export default BabyTodayCard;
