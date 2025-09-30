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
      {isAuthenticated && ( //delete "!" later
        <div className={css.sideAuth}>
          <Link
            href="/profile"
            prefetch={false}
            className={css.navigationLinkAuth}
          >
            <Image
              src={user.photo || "/images/placeholder.png"}
              alt="User avatar"
              width={40}
              height={40}
              className="userPhoto"
            />
            <ul className={css.sideUser}>
              <li className={css.sideName}>{user.name}</li>
              <li className={css.sideEmail}>{user.email}</li>
            </ul>
          </Link>

          <Link
            href="/auth/login"
            onClick={handleLogout}
            className={css.logoutButton}
          >
            <svg width={24} height={24} className={css.logoutIcon}>
              <use href="/leleka-sprite.svg#icon-logout"></use>
            </svg>
          </Link>
        </div>
      )}

      {!isAuthenticated && (
        <div className={css.sideNotAuth}>
          <Link
            href="/auth/register"
            prefetch={false}
            className={css.navigationLink}
          >
            Зареєструватися
          </Link>
          <Link
            href="/auth/login"
            prefetch={false}
            className={css.navigationLink}
          >
            Увійти
          </Link>
        </div>
      )}
    </div>
  );
}
