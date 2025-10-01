"use client";

import css from "./PRLayout.module.css";
import SideBar from "@/components/SideBar/SideBar";
import Header from "@/components/Header/Header";
import { usePathname } from "next/navigation";
import { LogoComponent } from "@/components/LogoComponent/LogoComponent";

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
            <LogoComponent />
            <SideBar />
          </aside>
        )}

        <div className={css.privateRoutesWrapper}>{children}</div>
      </section>
    </>
  );
};

export default PrivateRoutesLayout;
