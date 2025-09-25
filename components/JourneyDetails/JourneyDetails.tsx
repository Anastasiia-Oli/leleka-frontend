"use client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import ToggleTabs from "../ui/Tabs";
import css from "./JourneyDetails.module.css";
import { useState } from "react";
import { getJourneyDetailsByWeek } from "@/lib/api/clientApi";
import { JourneyDetails } from "@/types/journeyType";
import TasksReminderCard from "../TasksReminderCard/TasksReminderCard";

export default function JourneyDetailsComponent({
  weekNumber,
}: {
  weekNumber: number;
}) {
  const [selectedTab, setSelectedTab] = useState(0);

  const setTab = (index: number) => {
    setSelectedTab(index);
  };

  const { data, isLoading, error } = useQuery<JourneyDetails>({
    queryKey: ["journey", weekNumber],
    queryFn: () => getJourneyDetailsByWeek(weekNumber),
    refetchOnMount: false,
  });

  if (isLoading) return <p>loading...</p>;
  if (error) return <p>Error while getting details.Please try again</p>;

  return (
    <section className={css.journeyDetailsSection}>
      <ToggleTabs
        getSelectedTab={setTab}
        options={["Розвиток малюка", "Тіло мами"]}
      />
      {selectedTab === 0 && data ? (
        <div className={css.journeyDetailsContainer}>
          <div>
            <Image
              alt="Baby Size"
              src={`${data.baby.image}`}
              width={287}
              height={379}
              className={css.babySizeImage}
            />
            <p>{data.baby.analogy}</p>
          </div>
          <div className={css.journeyTextInfo}>
            <div className={css.descriptionContainer}>
              <p className={css.journeyDescription}>{data.baby.babyActivity}</p>
              <p className={css.journeyDescription}>
                {data.baby.babyDevelopment}
              </p>
            </div>
            <div className={css.interestingFacts}>
              <div className={css.titleLogoFacts}>
                <svg width={24} height={24} className={css.factsIcon}>
                  <use href="/leleka-sprite.svg#icon-star_shine"></use>
                </svg>
                <h4 className={css.factsTitle}>Цікавий факт тижня</h4>
              </div>
              <p className={css.factsDescription}>
                {data.baby.interestingFact}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className={css.journeyDetails}>
          <div className={css.infoForMomBlock}>
            <div className={css.howYouCanFeel}>
              <h3 className={css.advicesTitle}>Як ви можете почуватись</h3>
              <ul>
                {data?.mom.feelings.states.map((feeling) => {
                  return <li key={Math.random()}>{feeling}</li>;
                })}
              </ul>
              <p>{data?.mom.feelings.sensationDescr}</p>
            </div>
            <div className={css.advices}>
              <h3 className={css.advicesTitle}>Поради для вашого комфорту</h3>
              <ul className={css.advicesList}>
                <li>
                  <div className={css.iconTitleAdvice}>
                    <svg width={24} height={24} className={css.factsIcon}>
                      <use href="/leleka-sprite.svg#icon-fork_spoon"></use>
                    </svg>
                    <h5>{data?.mom.comfortTips[0].category}</h5>
                  </div>
                  <p>{data?.mom.comfortTips[0].tip}</p>
                </li>
                <li>
                  <div className={css.iconTitleAdvice}>
                    <svg width={24} height={24} className={css.factsIcon}>
                      <use href="/leleka-sprite.svg#icon-fitness_center"></use>
                    </svg>
                    <h5>{data?.mom.comfortTips[1].category}</h5>
                  </div>
                  <p>{data?.mom.comfortTips[1].tip}</p>
                </li>
                <li>
                  <div className={css.iconTitleAdvice}>
                    <svg width={24} height={24} className={css.factsIcon}>
                      <use href="/leleka-sprite.svg#icon-chair"></use>
                    </svg>
                    <h5>{data?.mom.comfortTips[2].category}</h5>
                  </div>
                  <p>{data?.mom.comfortTips[0].tip}</p>
                </li>
              </ul>
            </div>
          </div>
          <div className={css.taskBlock}>
            <TasksReminderCard />
          </div>
        </div>
      )}
    </section>
  );
}
