// "use client";

// import css from "./AuthNavigation.module.css";
// import Link from "next/link";
// import { useAuthUserStore } from "@/lib/store/authStore";
// import { useRouter } from "next/navigation";
// import { logout } from "@/lib/api/clientApi";
// import Image from "next/image";

// export default function AuthNavigation() {
//   const router = useRouter();
//   const { user, isAuthenticated } = useAuthUserStore();
//   const clearIsAuthenticated = useAuthUserStore(
//     (state) => state.clearIsAuthenticated
//   );

//   const handleLogout = async () => {
//     await logout();
//     clearIsAuthenticated();
//     router.push("/login");
//   };

//   return (
//     <>
//       {!isAuthenticated && (
//         <>
//           <Link href="/profile" prefetch={false} className={css.navigationLink}>
//             <Image
//               src={user.photo || "/images/plaseholder.png"} // запасной вариант, если фото нет
//               alt="User avatar"
//               width={40}
//               height={40}
//               className="userPhoto"
//             />
//             <ul>
//               <li>{user.name}</li>
//               <li>{user.email}</li>
//             </ul>
//             Profile
//           </Link>

//           <button onClick={handleLogout} className={css.logoutButton}>
//             <svg width={24} height={24} className={css.logoutIcon}>
//               <use href="/leleka-sprite.svg#icon-logout"></use>
//             </svg>
//           </button>
//         </>
//       )}

//       {!isAuthenticated && (
//         <>
//           <Link href="/login" prefetch={false} className={css.navigationLink}>
//             Увійти
//           </Link>
//           <Link
//             href="/register"
//             prefetch={false}
//             className={css.navigationLink}
//           >
//             Зареєструватися
//           </Link>
//         </>
//       )}
//     </>
//   );
// }
