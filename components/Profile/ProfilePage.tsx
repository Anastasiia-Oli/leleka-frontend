import React from "react";
import css from "./ProfilePage.module.css";
import ProfileForm from "./ProfileEditForm";
// import css from "./ProfilePage.module.css";

const MyProfilePage = () => {
  return (
    <div className={css.scene}>
            <ProfileForm />
    </div>
  );
};

export default MyProfilePage;
