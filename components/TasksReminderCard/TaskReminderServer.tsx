import { getTasksServer } from "@/lib/api/serverApi";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import TasksReminderCard from "./TasksReminderCard";

const TaskReminderServer = async () => {
  const queryClient = new QueryClient();
  queryClient.prefetchQuery({
    queryKey: ["tasks"],
    queryFn: () => getTasksServer(),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TasksReminderCard />
      </HydrationBoundary>
    </>
  );
};

export default TaskReminderServer;
