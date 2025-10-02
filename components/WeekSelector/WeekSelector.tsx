"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import css from "./WeekSelector.module.css";
import { useGetCurrentWeek } from "@/lib/store/getCurrentWeekStore";

type WeekSelectorProps = {
  weeks: number[];
  onButtonClick: (week: number) => void;
};

const WeekSelector = ({ weeks, onButtonClick }: WeekSelectorProps) => {
  const pathname = usePathname();
  const { initialWeek } = useGetCurrentWeek();
  const swiperRef = useRef<SwiperType | null>(null);

  const currentWeek = initialWeek;

  const activeWeek = useMemo(() => {
    const match = pathname.match(/\/journey\/(\d+)/);
    return match ? Number(match[1]) : initialWeek;
  }, [pathname, initialWeek]);

  useEffect(() => {
    if (swiperRef.current && !isNaN(activeWeek)) {
      const index = weeks.indexOf(activeWeek);
      if (index !== -1) {
        swiperRef.current.slideTo(index, 0);
      }
    }
  }, [activeWeek, weeks]);
  return (
    <div className={css.weekSelectorContainer}>
      <Swiper
        modules={[Mousewheel]}
        slidesPerView="auto"
        spaceBetween={16}
        freeMode={true}
        mousewheel={{
          forceToAxis: true,
          releaseOnEdges: true,
          sensitivity: 3,
        }}
        onSwiper={(swiper) => {
          swiperRef.current?.slideTo(0, 600);
          swiperRef.current = swiper;
        }}
      >
        {weeks.map((week) => {
          const isActive = pathname === `/journey/${week}`;
          const isDisabled =
            typeof currentWeek === "number" && week > currentWeek;

          return (
            <SwiperSlide
              key={week}
              className={css.weekSlide}
              style={{ flexShrink: 0 }}
            >
              <Link
                href={isDisabled ? "#" : `/journey/${week}`}
                className={`${isActive ? css.activatedButton : ""} ${
                  isDisabled ? css.disabledBtn : css.weekButton
                }`}
                onClick={(e) => {
                  if (isDisabled) {
                    e.preventDefault();
                    return;
                  }
                  onButtonClick(week);
                }}
              >
                <p className={css.weekNumbers}>{week}</p>
                <p className={css.weekText}>Тиждень</p>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default WeekSelector;
