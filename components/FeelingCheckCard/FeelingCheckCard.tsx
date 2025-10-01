"use client";

import { useState, useEffect } from "react";
import AddDiaryEntryModal from "../Diary/AddDiaryEntryModal/AddDiaryEntryModal";
import css from "./FeelingCheckCard.module.css";

const FeelingCheckCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isModalOpen]);

  return (
    <div className={css.card}>
      <h2>Як ви себе почуваєте?</h2>
      <h3>Рекомендація на сьогодні:</h3>
      <p> Занотуйте незвичні відчуття у тілі.</p>

      {/* замінила Link на кнопку */}
      <button
        type="button"
        className={css.btn}
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
