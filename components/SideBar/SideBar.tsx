import Link from "next/link";
import React from "react";
import css from "./SideBar.module.css";

const SideBar = () => {
  return (
    <section className={css.container}>
      <aside className={css.SideBar}>
        <div>Sidebar</div>
        <ul>
          <li>
            <Link href={"#"}>Мій день</Link>
          </li>
          <li>
            <Link href={"#"}>Подорож</Link>
          </li>
          <li>
            <Link href={"#"}>Щоденник</Link>
          </li>
          <li>
            <Link href={"#"}>Профіль</Link>
          </li>
        </ul>
      </aside>
    </section>
  );
};

export default SideBar;
