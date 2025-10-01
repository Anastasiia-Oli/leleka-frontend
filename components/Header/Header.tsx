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
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.position = "";
      document.body.style.width = "";
    }

    return () => {
      document.body.style.position = "";
      document.body.style.width = "";
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
