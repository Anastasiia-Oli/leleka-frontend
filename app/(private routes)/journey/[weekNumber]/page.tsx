import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { ClientJourney } from "./ClientJourney";
import { getJourneyDetailsByWeek } from "@/lib/api/clientApi";

const page = async ({
  params,
}: {
  params: Promise<{ weekNumber: number }>;
}) => {
  const { weekNumber } = await params;
  const queryClient = new QueryClient();

  queryClient.prefetchQuery({
    queryKey: ["journey", weekNumber],
    queryFn: () => getJourneyDetailsByWeek(weekNumber),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ClientJourney currentWeek={weekNumber} />
      </HydrationBoundary>
    </>
  );
};

export default page;
