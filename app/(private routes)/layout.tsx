"use client";
import { useAuthUserStore } from "@/lib/store/authStore";
import css from "./PRLayout.module.css";
import SideBar from "@/components/SideBar/SideBar";

type Props = {
  children: React.ReactNode;
};

const PrivateRoutesLayout = ({ children }: Props) => {
  const isAuthenticated = useAuthUserStore((s) => s.isAuthenticated);
console.log(isAuthenticated);
  return (
    <section className={css.container}>
      {isAuthenticated && (
        <aside className={css.sidebar}>
          <SideBar />
        </aside>
      )}
      <div className={css.privateRoutesWrapper}>{children}</div>
    </section>
  );
};

export default PrivateRoutesLayout;
