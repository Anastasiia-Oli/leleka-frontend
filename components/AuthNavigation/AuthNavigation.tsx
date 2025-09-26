"use client";

import css from "./AuthNavigation.module.css";
import Link from "next/link";
import { useAuthUserStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/api/clientApi";
import Image from "next/image";

export default function AuthNavigation() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthUserStore();
  const clearIsAuthenticated = useAuthUserStore(
    (state) => state.clearIsAuthenticated
  );

  const handleLogout = async () => {
    await logout();
    clearIsAuthenticated();
    router.push("/auth/login");
  };

  return (
    <div className={css.sideFooterAuth}>
      {!isAuthenticated && ( //delete "!" later
        <div className={css.sideAuth}>
          <Link
            href="/profile"
            prefetch={false}
            className={css.navigationLinkAuth}
          >
            <Image
              src={"/images/placeholder.png"} // user.photo || <- add later
              alt="User avatar"
              width={40}
              height={40}
              className="userPhoto"
            />
            <ul className={css.sideUser}>
              <li className={css.sideName}>{user.name}Example Name</li>
              <li className={css.sideEmail}>{user.email}example@gmail.com</li>
            </ul>
          </Link>

          <button onClick={handleLogout} className={css.logoutButton}>
            <svg width={40} height={40} className={css.logoutIcon}>
              <use
                width={40}
                height={40}
                href="/leleka-sprite.svg#icon-logout"
              ></use>
            </svg>
          </button>
        </div>
      )}

      {!isAuthenticated && (
        <div className={css.sideNotAuth}>
          <Link
            href="/auth/login"
            prefetch={false}
            className={css.navigationLink}
          >
            Увійти
          </Link>
          <Link
            href="/auth/register"
            prefetch={false}
            className={css.navigationLink}
          >
            Зареєструватися
          </Link>
        </div>
      )}
    </div>
  );
}
