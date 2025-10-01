"use client";

import { useState } from "react";
import AddDiaryEntryModal from "../Diary/AddDiaryEntryModal/AddDiaryEntryModal";
import css from "./FeelingCheckCard.module.css";
import useCloseModal from "@/hooks/useCloseModal";

const FeelingCheckCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useCloseModal(() => setIsModalOpen(false));

  return (
    <div className={css.card}>
      <div className={css.textBlock}>
        <h3 className="header-third">Як ви себе почуваєте?</h3>
        <div className={css.advice}>
          <p className="text-bold">Рекомендація на сьогодні:</p>
          <p className="text-primary"> Занотуйте незвичні відчуття у тілі.</p>
        </div>
      </div>
      <button
        type="button"
        className={`${css.btn} text-medium`}
        onClick={() => setIsModalOpen(true)}
      >
        Зробити запис у щоденник
      </button>

      <AddDiaryEntryModal
        isOpen={isModalOpen}
        mode="create"
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default FeelingCheckCard;
