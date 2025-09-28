import { getBabyInfo } from "@/lib/api/serverApi";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import BabyTodayCard from "./BabyTodayCard";

const BabyTodayCardServer = async ({
  params,
}: {
  params: Promise<{ weekNumber: number }>;
}) => {
  const { weekNumber } = await params;
  const queryClient = new QueryClient();

  queryClient.prefetchQuery({
    queryKey: ["weeks", weekNumber],
    queryFn: () => getBabyInfo(weekNumber),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BabyTodayCard week={weekNumber} />
    </HydrationBoundary>
  );
};

export default BabyTodayCardServer;
