import css from "./PRLayout.module.css";
import SideBar from "@/components/SideBar/SideBar";

type Props = {
  children: React.ReactNode;
};

const PrivateRoutesLayout = ({ children }: Props) => {
  return (
    <section className={css.container}>
      <aside className={css.sidebar}>
        <SideBar/>
      </aside>
      <div className={css.privateRoutesWrapper}>{children}</div>
    </section>
  );
};

export default PrivateRoutesLayout;
