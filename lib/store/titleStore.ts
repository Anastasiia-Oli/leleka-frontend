import { create } from "zustand";
import { persist } from "zustand/middleware";

type TitleDreftStore = {
  draft: string;
  setDraft: (title: string) => void;
  clearDraft: () => void;
};

const initialDraft: string = "Записка";

export const useTitleDraftStore = create<TitleDreftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (title) => set(() => ({ draft: title })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
      name: "title-draft",
      partialize: (state) => ({ draft: state.draft }),
    }
  )
);
