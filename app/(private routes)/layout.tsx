"use client";

import css from "./PRLayout.module.css";
import SideBar from "@/components/SideBar/SideBar";
import Header from "@/components/Header/Header";
import { usePathname } from "next/navigation";
import { LogoComponent } from "@/components/LogoComponent/LogoComponent";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";

type Props = {
  children: React.ReactNode;
};

const PrivateRoutesLayout = ({ children }: Props) => {
  const pathname = usePathname();

  const hideHeaderSidebarBreadcrumbs = ["/profile/edit"];

  const shouldHide = hideHeaderSidebarBreadcrumbs.includes(pathname);

  return (
    <>
      {!shouldHide && <Header />}
      <section className={css.container}>
        {!shouldHide && (
          <aside className={css.sidebar}>
            <LogoComponent />
            <SideBar /> <Breadcrumbs />
          </aside>
        )}

        <div className={css.privateRoutesWrapper}>{children}</div>
      </section>
    </>
  );
};

export default PrivateRoutesLayout;
