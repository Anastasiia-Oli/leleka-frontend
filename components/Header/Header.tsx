"use client";

import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import css from "./Header.module.css";
import Menu from "../Menu/Menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header className={css.header}>
      <div className={css.headerComponents}>
        <Link href="/" className={css.logo}>
          <svg className={css.logoIcon}>
            <use href="/leleka-sprite.svg#icon-logo" />
          </svg>
        </Link>
        <button className={css.burgerBtn} onClick={() => setIsMenuOpen(true)}>
          <svg className={css.burgerIcon}>
            <use href="/leleka-sprite.svg#icon-menu-1" />
          </svg>
        </button>
      </div>
      <div>
        <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}></Menu>
      </div>
    </header>
  );
};

export default Header;
