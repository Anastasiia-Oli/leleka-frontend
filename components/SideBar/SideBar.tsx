"use client";
import Link from "next/link";
import css from "./SideBar.module.css";
import { useGetCurrentWeek } from "@/lib/store/getCurrentWeekStore";
import AuthNavigation from "../AuthNavigation/AuthNavigation";

const SideBar = () => {
  const { initialWeek } = useGetCurrentWeek();
  return (
    <section className={css.container}>
      <aside className={css.sidebar} onClick={(e) => e.stopPropagation()}>
        <ul>
          <li className={css.li}>
            <svg width={24} height={24} className={css.factsIcon}>
              <use href="/leleka-sprite.svg#icon-today"></use>
            </svg>
            <Link href={"/"}>Мій день</Link>
          </li>
          <li className={css.li}>
            <svg width={24} height={24} className={css.factsIcon}>
              <use href="/leleka-sprite.svg#icon-conversion_path"></use>
            </svg>
            <Link href={`/journey/${initialWeek}`}>Подорож</Link>
          </li>
          <li className={css.li}>
            <svg width={24} height={24} className={css.factsIcon}>
              <use href="/leleka-sprite.svg#icon-book_2"></use>
            </svg>
            <Link href={"/diary"}>Щоденник</Link>
          </li>
          <li className={css.li}>
            <svg width={24} height={24} className={css.factsIcon}>
              <use href="/leleka-sprite.svg#icon-account_circle"></use>
            </svg>
            <Link href={"/profile"}>Профіль</Link>
          </li>
        </ul>
        <div className={css.authWrapper}>
          <AuthNavigation />
        </div>
      </aside>
    </section>
  );
};

export default SideBar;
