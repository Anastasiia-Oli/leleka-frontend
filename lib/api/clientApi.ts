import { JourneyDetails } from "@/types/journeyType";
import nextServer from "./api";

type JourneyDetailResponce = {
  message: string;
  status: number;
  weekNumber: number;
  data: JourneyDetails;
};

export const getJourneyDetailsByWeek = async (
  weekNumber: number
): Promise<JourneyDetails> => {
  const responce = await nextServer<JourneyDetailResponce>(
    `http://localhost:3000/public/${weekNumber}`
  );
  console.log(responce.data.data);
  return responce.data.data;
};
