import css from "./Home.module.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page was not found",
  description: "Sorry, the page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <div className={css.notFoundBack}>
      <div className={css.notFoundWrapper}>
        <h1 className={css.notFoundTitle}>404 - Сторінку не знайдено🤷‍♀️</h1>
        <p className={css.notFoundDescription}>
          Ой! Схоже, ця сторінка теж пішла в декрет 🤰
        </p>
        <Link href={"/"} className={css.notFoundLink}>
          Натисни сюди, поки сторінка не пішла в пологовий 🍼
        </Link>
      </div>
    </div>
  );
}
