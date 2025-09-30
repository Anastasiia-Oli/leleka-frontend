import GreetingBlock from "@/components/GreetingBlock/GreetingBlock";
import StatusBlock from "@/components/StatusBlock/StatusBlock";
import BabyTodayCard from "@/components/BabyTodayCard/BabyTodayCard";
import MomTipCard from "@/components/MomTipCard/MomTipCard";
import TasksReminderCard from "@/components/TasksReminderCard/TasksReminderCard";
import FeelingCheckCard from "@/components/FeelingCheckCard/FeelingCheckCard";
import Header from "@/components/Header/Header";
import SideBar from "@/components/SideBar/SideBar";
import css from "./Home.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <section className={css.homeContainer}>
      <Header />
      <div className={css.bodyWrapper}>
        <div className={css.sideWrapper}>
          <Link href="/" className={css.logo}>
            <svg className={css.logoIcon}>
              <use href="/leleka-sprite.svg#icon-logo" />
            </svg>
          </Link>
          <SideBar />
        </div>

        <div className={css.contentWrapper}>
          <GreetingBlock />
          <StatusBlock />
          <BabyTodayCard />
          <MomTipCard />
          <TasksReminderCard />
          <FeelingCheckCard />
        </div>
      </div>
    </section>
  );
}
