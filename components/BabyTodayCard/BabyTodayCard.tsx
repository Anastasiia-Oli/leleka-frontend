"use client";
import Image from "next/image";
import css from "./BabyTodayCard.module.css";
import { useQuery } from "@tanstack/react-query";
import { getBabyClient } from "@/lib/api/clientApi";
import { useGetCurrentWeek } from "@/lib/store/getCurrentWeekStore";
import { useAuthUserStore } from "@/lib/store/authStore";

const BabyTodayCard = () => {
  const { initialWeek: weekNumber = 10 } = useGetCurrentWeek();
  const { isAuthenticated } = useAuthUserStore();

  const { data: baby, isSuccess } = useQuery({
    queryKey: ["weeks", weekNumber],
    queryFn: () => getBabyClient(Number(weekNumber)),
    enabled: isAuthenticated,
  });

  return (
    <div className={css.card}>
      {!isAuthenticated && (
        <>
          <h3 className="header-third">Малюк сьогодні</h3>
          <div className={css.wrap}>
            <div className={css.imgBox}>
              <Image
                src={
                  "https://ftp.goit.study/img/lehlehka/6895ce04a5c677999ed2af25.webp"
                }
                alt="baby"
                fill
                className={css.img}
              />
            </div>
            <div className={css.babyInfo}>
              <p className="text-bold">
                Розмір:
                <span className={`${css.span} text-primary`}>
                  Приблизно 0 см
                </span>
              </p>
              <p className="text-bold">
                Вага:
                <span className={`${css.span} text-primary`}>
                  Близько 0 грамів.
                </span>
              </p>
              <p className="text-bold">
                Активність:
                <span className={`${css.span} text-primary`}>
                  На цьому етапі вагітності ще немає. Тиждень відраховується від
                  першого дня останньої менструації, коли організм тільки
                  готується до можливого зачаття.
                </span>
              </p>
            </div>
          </div>

          <p className="text-primary">
            Близько 60% жінок не знають, що їхня вагітність відраховується ще до
            моменту фактичного зачаття.
          </p>
        </>
      )}
      {isSuccess && isAuthenticated && (
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
                <span className={`${css.span} text-primary`}>
                  {baby?.babyActivity}
                </span>
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
