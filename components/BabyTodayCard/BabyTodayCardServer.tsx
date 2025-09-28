import { getBabyInfo } from "@/lib/api/serverApi";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import BabyTodayCard from "./BabyTodayCard";

const BabyTodayCardServer = async ({ week }: { week: number }) => {
  const queryClient = new QueryClient();

  queryClient.prefetchQuery({
    queryKey: ["weeks", week],
    queryFn: () => getBabyInfo(week),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BabyTodayCard week={week} />
    </HydrationBoundary>
  );
};

export default BabyTodayCardServer;
