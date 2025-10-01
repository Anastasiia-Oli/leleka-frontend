import SideBar from "../SideBar/SideBar";
import React from "react";
import css from "./Menu.module.css";
import { LogoComponent } from "../LogoComponent/LogoComponent";

interface SideBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Menu = ({ isOpen = true, onClose }: SideBarProps) => {
  return (
    isOpen && (
      <div className={css.backdrop} onClick={onClose}>
        <div
          className={css.backgroundSideBar}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={css.menuComponents}>
            <LogoComponent />
            <button className={css.closeBtn} onClick={onClose}>
              <svg className={css.closeIcon}>
                <use href="/leleka-sprite.svg#icon-close" />
              </svg>
            </button>
          </div>
          <SideBar />
        </div>
      </div>
    )
  );
};

export default Menu;
