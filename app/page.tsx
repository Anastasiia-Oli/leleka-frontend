import GreetingBlock from "@/components/GreetingBlock/GreetingBlock";
import StatusBlock from "@/components/StatusBlock/StatusBlock";
import BabyTodayCard from "@/components/BabyTodayCard/BabyTodayCard";
import MomTipCard from "@/components/MomTipCard/MomTipCard";
import TasksReminderCard from "@/components/TasksReminderCard/TasksReminderCard";
import FeelingCheckCard from "@/components/FeelingCheckCard/FeelingCheckCard";

export default function Home() {
  return (
    <section>
      <GreetingBlock />
      <StatusBlock />
      <BabyTodayCard />
      <MomTipCard />
      <TasksReminderCard />
      <FeelingCheckCard />
    </section>
  );
}
