import React from "react";
// import Image from "next/image";
import css from "./ProfilePage.module.css";
import ProfileForm from "./ProfileEditForm";
// import Link from "next/link";

const MyProfilePage = () => {
  return (
    <div className={css.scene}>
      {/* <div className={css.regCard}> */}
        {/* <div className={css.regLeft}> */}
      {/* </div> */}
            <ProfileForm />
        {/* </div> */}
      {/* </div> */}
    </div>
  );
};

export default MyProfilePage;
