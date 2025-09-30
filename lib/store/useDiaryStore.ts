"use client";

import { create } from "zustand";
import { DiaryEntry } from "@/types/dairy";

type DiaryStoreType = {
  currentEntry: DiaryEntry | null;
  setCurrentEntry: (entry: DiaryEntry | null) => void;
};

export const useDiaryStore = create<DiaryStoreType>()((set) => ({
  currentEntry: null,
  setCurrentEntry: (entry) => set({ currentEntry: entry }),
}));
