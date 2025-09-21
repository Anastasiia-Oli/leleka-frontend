"use client";
import ToggleTabs from "@/components/ui/Tabs";
import WeekSelector from "@/components/WeekSelector/WeekSelector";
import React, { useMemo } from "react";

const page = () => {
  const pregnacyWeeks = useMemo(() => {
    let weekNumbers: number[] = [];
    for (let i = 0; i <= 11; i++) {
      weekNumbers.push(i);
    }
    return weekNumbers;
  }, []);
  return (
    <div>
      <h1>Доброго ранку, Галина!</h1>
      <WeekSelector weeks={pregnacyWeeks} />
      <ToggleTabs options={["Розвиток малюка", "Тіло мами"]} />
    </div>
  );
};

export default page;
