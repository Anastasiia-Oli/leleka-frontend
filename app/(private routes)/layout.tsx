import Link from "next/link";
import css from "./PRLayout.module.css";
import SideBar from "@/components/SideBar/SideBar";

type Props = {
  children: React.ReactNode;
};

const PrivateRoutesLayout = ({ children }: Props) => {
  return (
    <section className={css.container}>
      <aside className={css.sidebar}>
        <Link href="/" className={css.logo}>
          <svg className={css.logoIcon}>
            <use href="/leleka-sprite.svg#icon-logo" />
          </svg>
        </Link>
        <SideBar />
      </aside>
      <div className={css.privateRoutesWrapper}>{children}</div>
    </section>
  );
};

export default PrivateRoutesLayout;
