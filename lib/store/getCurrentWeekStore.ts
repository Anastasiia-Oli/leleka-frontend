import { create } from "zustand";

type useGetCurrentWeekType = {
  initialWeek: number;
  getCurrWeek: (week: number) => void;
};

export const useGetCurrentWeek = create<useGetCurrentWeekType>()((set) => ({
  initialWeek: 1,
  getCurrWeek: (week) => set(() => ({ initialWeek: week })),
}));