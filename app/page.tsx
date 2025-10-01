import GreetingBlock from "@/components/GreetingBlock/GreetingBlock";
import StatusBlock from "@/components/StatusBlock/StatusBlock";
import BabyTodayCard from "@/components/BabyTodayCard/BabyTodayCard";
import MomTipCard from "@/components/MomTipCard/MomTipCard";
import TasksReminderCard from "@/components/TasksReminderCard/TasksReminderCard";
import FeelingCheckCard from "@/components/FeelingCheckCard/FeelingCheckCard";
import Header from "@/components/Header/Header";
import SideBar from "@/components/SideBar/SideBar";
import css from "./Home.module.css";
import { LogoComponent } from "@/components/LogoComponent/LogoComponent";

export default function Home() {
  return (
    <section className={css.homeContainer}>
      <Header />
      <div className={css.bodyWrapper}>
        <div className={css.sideWrapper}>
          <LogoComponent/>
          <SideBar />
        </div>

        <div className={css.contentWrapper}>
          <GreetingBlock />
          <div className={css.contentCards}>
            <div className={css.leftDayCard}>
          <StatusBlock />
              <BabyTodayCard />
              <MomTipCard />
            </div>
            <div className={css.rightDayCard}>
              <TasksReminderCard />
              <FeelingCheckCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
