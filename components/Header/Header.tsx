'use client';

import React from "react";
import Link from 'next/link';
import { useState } from 'react';
import css from './Header.module.css';
import SideBar from "../SideBar/SideBar";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
  <header className={css.header}>
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
    {/* <SideBar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}></SideBar> */}
  </header>
  );
};

export default Header;
