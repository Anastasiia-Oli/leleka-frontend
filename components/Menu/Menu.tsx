import SideBar from "../SideBar/SideBar";
import Link from "next/link";
import React from "react";
import css from "./Menu.module.css"


interface SideBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Menu = ({ isOpen = true, onClose }: SideBarProps) => {

    return (
        isOpen && (
            <div className={css.backdrop} onClick={onClose}>
                <div className={css.backgroundSideBar} onClick={(e) => e.stopPropagation()}>
                    <div className={css.menuComponents}>
                        <Link href="/" className={css.logo} >
                        <svg className={css.logoIcon}>
                            <use href="/leleka-sprite.svg#icon-logo" />
                        </svg>
                    </Link>
                    <button className={css.closeBtn} onClick={onClose}>
                        <svg className={css.closeIcon}>
                            <use href="/leleka-sprite.svg#icon-close" />
                        </svg>
                    </button>
                    </div>
                    <SideBar></SideBar>
                </div>
            </div>
        )
    );
};

export default Menu;
