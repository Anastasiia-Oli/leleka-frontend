import React from "react";
import Image from "next/image";
import css from "./OnboardingPage.module.css";
import OnboardingForm from "./OnboardingForm";

const OnboardingPage = () => {
  return (
    <div className={css.onboardingLayout}>
      <div className={css.formContainer}>
        <OnboardingForm />
      </div>
      <Image
        src="/images/onboard.png"
        alt="onboard photo"
        className={css.mainImage}
        width={720}
        height={900}
      />
    </div>
  );
};

export default OnboardingPage;
