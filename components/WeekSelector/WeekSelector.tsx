"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import css from "./WeekSelector.module.css";

type WeekSelectorProps = {
  weeks: number[];
  onButtonClick: (week: number) => void;
};

const WeekSelector = ({ weeks, onButtonClick }: WeekSelectorProps) => {
  const pathname = usePathname();

  return (
    <div className={css.weekSelectorContainer}>
      <ul className={css.weeksList}>
        {weeks.map((week) => {
          const isActive = pathname === `/journey/${week}`;
          return (
            <li className={css.weekItem} key={week}>
              <Link
                href={`/journey/${week}`}
                className={`${css.weekButton} ${isActive ? css.activatedButton : ""}`}
                onClick={() => onButtonClick(week)}
              >
                <p className={css.weekNumbers}>{week}</p>
                <p className={css.weekText}>тиждень</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default WeekSelector;
