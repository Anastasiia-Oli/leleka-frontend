"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import css from "./WeekSelector.module.css";
import { useGetCurrentWeek } from "@/lib/store/currentWeekState";

type WeekSelectorProps = {
  weeks: number[];
  onButtonClick: (week: number) => void;
};

const WeekSelector = ({ weeks, onButtonClick }: WeekSelectorProps) => {
  const pathname = usePathname();
  const { initialWeek } = useGetCurrentWeek();

  return (
    <div className={css.weekSelectorContainer}>
      <ul className={css.weeksList}>
        {weeks.map((week) => {
          const isActive = pathname === `/journey/${week}`;
          const isDisabled = week > initialWeek;

          return (
            <li className={css.weekItem} key={week}>
              <Link
                href={isDisabled ? "#" : `/journey/${week}`}
                className={`${isActive ? css.activatedButton : ""} ${isDisabled ? css.disabledBtn : css.weekButton}`}
                onClick={(e) => {
                  if (isDisabled) {
                    e.preventDefault();
                    return;
                  }
                  onButtonClick(week);
                }}
              >
                <p className={css.weekNumbers}>{week}</p>
                <p className={css.weekText}>Тиждень</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default WeekSelector;
