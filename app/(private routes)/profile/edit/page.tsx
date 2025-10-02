import OnboardingPage from "@/components/OnboardingPage/OnboardingPage";
import React from "react";
import css from "./Onboarding.module.css";

const edit = () => {
  return (
    <div className={css.onboardingWrapper}>
      <OnboardingPage />
    </div>
  );
};

export default edit;
