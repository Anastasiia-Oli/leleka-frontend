import React from "react";
import { getMeServer } from "@/lib/api/serverApi";
import ProfileForm from "@/components/Profile/ProfileEditForm";
import css from "./ProfilePage.module.css";

export default async function MyProfilePage() {
  const user = await getMeServer();

  return (
    <div className={css.scene}>
      <ProfileForm currentUser={user} />
    </div>
  );
}
