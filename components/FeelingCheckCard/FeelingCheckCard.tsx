"use client";

import { useState, useEffect } from "react";
import AddDiaryEntryModal from "../Diary/AddDiaryEntryModal/AddDiaryEntryModal";
import css from "./FeelingCheckCard.module.css";
import { useAuthUserStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";

const FeelingCheckCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAuthenticated } = useAuthUserStore();
  const router = useRouter();

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
        onClick={() => {
          if (!isAuthenticated) {
            router.push("/auth/login");
          } else {
            setIsModalOpen(true);
          }
        }}
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
