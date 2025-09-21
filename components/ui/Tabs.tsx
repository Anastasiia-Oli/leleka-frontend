"use client";
import { useState } from "react";
import css from "./Tabs.module.css";

type ToggleTabsProps = {
  options: string[];
  defaultIndex?: number;
  onChange?: (value: string) => void;
};

export default function ToggleTabs({
  options,
  defaultIndex = 0,
  onChange,
}: ToggleTabsProps) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  const handleClick = (index: number) => {
    setActiveIndex(index);
    onChange?.(options[index]);
  };

  return (
    <div className={css.toggleTabs}>
      <div
        className={css.toggleIndicator}
        style={{
          left: `${(100 / options.length) * activeIndex}%`,
          width: `${100 / options.length}%`,
        }}
      />
      {options.map((option, index) => (
        <button
          key={option}
          className={`${css.toggleTab} ${
            activeIndex === index ? `${css.active}` : ""
          }`}
          onClick={() => handleClick(index)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
