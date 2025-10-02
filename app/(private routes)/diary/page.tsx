import React from "react";
import DiaryPage from "@/components/Diary/DiaryPage/DiaryPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leleka | Diary",
  description: "Your personal diary",
  icons: {
    icon: "/favicon.svg",
  },
};

const page = () => {
  return <DiaryPage />;
};

export default page;
