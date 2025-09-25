"use client";
import GreetingBlock from "@/components/GreetingBlock/GreetingBlock";
import JourneyDetailsComponent from "@/components/JourneyDetails/JourneyDetails";
import WeekSelector from "@/components/WeekSelector/WeekSelector";
import { useMemo, useState } from "react";

export function ClientJourney({ currentWeek }: { currentWeek: number }) {
  const [selectedWeek, setSelectedWeek] = useState(currentWeek);

  const pregnacyWeeks = useMemo(() => {
    const weekNumbers: number[] = [];
    for (let i = 1; i <= 36; i++) {
      weekNumbers.push(i);
    }
    return weekNumbers;
  }, []);

  const handleClickAndStateUpdate = (choosedWeek: number) => {
    setSelectedWeek(choosedWeek);
  };

  return (
    <div>
      <GreetingBlock />
      <WeekSelector
        weeks={pregnacyWeeks}
        onButtonClick={handleClickAndStateUpdate}
      />
      <JourneyDetailsComponent weekNumber={selectedWeek} />
    </div>
  );
}
