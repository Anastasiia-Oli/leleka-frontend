"use client";

import Link from "next/link";
import css from "./PRLayout.module.css";
import SideBar from "@/components/SideBar/SideBar";
import Header from "@/components/Header/Header";
import { usePathname } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

const PrivateRoutesLayout = ({ children }: Props) => {
  const pathname = usePathname();

  const hideHeaderSidebar = ["/profile/edit"];

  const shouldHide = hideHeaderSidebar.includes(pathname);

  return (
    <>
      {!shouldHide && <Header />}
      <section className={css.container}>
        {!shouldHide && (
          <aside className={css.sidebar}>
            <Link href="/" className={css.logo}>
              <svg className={css.logoIcon}>
                <use href="/leleka-sprite.svg#icon-logo" />
              </svg>
            </Link>
            <SideBar />
          </aside>
        )}

        <div className={css.privateRoutesWrapper}>{children}</div>
      </section>
    </>
  );
};

export default PrivateRoutesLayout;
