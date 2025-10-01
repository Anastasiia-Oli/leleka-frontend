import Link from "next/link";
import css from "./LogoComponent.module.css";


export function LogoComponent() {
  return (
    <div className={css.logoContainer}>
      <Link href="/" className={css.logo}>
          <svg className={css.logoIcon}>
            <use href="/leleka-sprite.svg#icon-logo" />
          </svg>
      </Link>
    </div>
  );
}