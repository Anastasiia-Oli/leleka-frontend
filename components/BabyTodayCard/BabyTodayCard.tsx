"use client";
import Image from "next/image";
import css from "./BabyTodayCard.module.css";
import { useQuery } from "@tanstack/react-query";
import { getBabyClient } from "@/lib/api/clientApi";

interface BabyTodayCardProps {
  week: number;
}

const BabyTodayCard = ({ week }: BabyTodayCardProps) => {
  const { data: baby, isSuccess } = useQuery({
    queryKey: ["weeks", week],
    queryFn: () => getBabyClient(Number(week)),
  });

  return (
    <div className={css.card}>
      {/* //isSuccess && ( */}
      <>
        <h2 className={css.title}>Малюк сьогодні</h2>
        <Image
          src={baby?.image ?? "/placeholder.png"}
          alt="baby"
          width={257}
          height={194}
          className={css.img}
        />
        <div className={css.babyInfo}>
          <div>
            <h3 className={css.infoTitle}>Розмір:</h3>
            <span className={css.infoText}>Приблизно {baby?.babySize} см</span>
          </div>
          <div>
            <h3 className={css.infoTitle}>Вага:</h3>
            <span className={css.infoText}>
              Близько {baby?.babyWeight} грамів.
            </span>
          </div>
          <div>
            <h3 className={css.infoTitle}>Активність:</h3>
            <span className={css.infoText}>{baby?.babyActivity}</span>
          </div>
        </div>
        <p className={css.babyFact}>{baby?.interestingFact}</p>
      </>
    </div>
  );
};

export default BabyTodayCard;
