import React from "react";
import { getMeServer } from "@/lib/api/serverApi";
import ProfileForm from "@/components/Profile/ProfileEditForm";
import css from "./ProfilePage.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leleka | Profile",
  description: "Your profile settings",
  icons: {
    icon: "/favicon.svg",
  },
};

export default async function MyProfilePage() {
  const user = await getMeServer();

  return (
    <div className={css.scene}>
      <ProfileForm currentUser={user} />
    </div>
  );
}
