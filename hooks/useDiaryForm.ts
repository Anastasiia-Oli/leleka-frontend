"use client";

import { useState, useEffect } from "react";
import { getEmotions, Emotion } from "@/lib/api/categoriesApi";

interface UseDiaryFormReturn {
  emotions: Emotion[];
  loading: boolean;
  error: string | null;
  topCount: number;
}

export const useDiaryForm = (): UseDiaryFormReturn => {
  const [emotions, setEmotions] = useState<Emotion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // визначаємо кількість популярних категорій (2 мобілка / 3 інше)
  const topCount =
    typeof window !== "undefined" && window.innerWidth < 768 ? 2 : 3;

  useEffect(() => {
    const fetchEmotions = async () => {
      setLoading(true);
      try {
        const data = await getEmotions();
        setEmotions(data);
      } catch (err) {
        setError("Не вдалося завантажити емоції");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmotions();
  }, []);

  return { emotions, loading, error, topCount };
};
