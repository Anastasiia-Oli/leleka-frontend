import React from "react";
import css from "./Header.module.css";

const Header = () => {
  return (
    <header className={css.header}>
      <div className={css.pageHeader}>
        <div className={css.logo}>
          Leleka
        </div>
        <div className={css.userActions}>
          {/* Тут будуть дії користувача */}
        </div>
      </div>
    </header>
  );
};