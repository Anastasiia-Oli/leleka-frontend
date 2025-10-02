"use client";

import css from "./AuthNavigation.module.css";
import Link from "next/link";
import { useAuthUserStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/api/clientApi";
import Image from "next/image";
import { useModalStore } from "@/lib/store/modalStore";

export default function AuthNavigation() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthUserStore();
  const clearIsAuthenticated = useAuthUserStore(
    (state) => state.clearIsAuthenticated
  );
  const openLogoutModal = useModalStore((set) => set.openLogoutModal);

  const handleLogoutClick = () => {
    openLogoutModal(async () => {
      await logout();
      clearIsAuthenticated();
      router.push("/auth/login");
    });
  };

  return (
    <div className={css.sideFooterAuth}>
      {isAuthenticated && (
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
              className={css.userPhoto}
            />
            <ul className={css.sideUser}>
              <li className={css.sideName}>{user.name}</li>
              <li className={css.sideEmail}>{user.email}</li>
            </ul>
          </Link>

          <button onClick={handleLogoutClick} className={css.logoutButton}>
            <svg width={24} height={24} className={css.logoutIcon}>
              <use href="/leleka-sprite.svg#icon-logout"></use>
            </svg>
          </button>
          {/* <ConfirmationModal
            title="Ви точно хочете вийти?"
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onConfirm={handleLogout}
          /> */}
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
