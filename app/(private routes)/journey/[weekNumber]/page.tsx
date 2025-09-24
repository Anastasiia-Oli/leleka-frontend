import { ClientJourney } from "./ClientJourney";

const page = async ({
  params,
}: {
  params: Promise<{ weekNumber: number }>;
}) => {
  const { weekNumber } = await params;

  return (
    <>
      <ClientJourney currentWeek={weekNumber} />
    </>
  );
};

export default page;
