"use client";

import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";

interface UseDiaryModalReturn {
  closeModal: () => void;
}

export const useDiaryModal = (): UseDiaryModalReturn => {
  const router = useRouter();

  const closeModal = useCallback(() => {
    router.back();
  }, [router]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [closeModal]);

  return { closeModal };
};
