import React from "react";
import Image from "next/image";
import css from "./OnboardingPage.module.css";
import OnboardingForm from "./OnboardingForm";
import Link from "next/link";

const OnboardingPage = () => {
  return (
    <div className={css.scene}>
      <div className={css.regCard}>
        <div className={css.regLeft}>
          <div className={css.logoCont}>
            <Link href="/" className={css.logo}>
              <svg className={css.logoIcon}>
                <use href="/leleka-sprite.svg#icon-logo" />
              </svg>
            </Link>
          </div>
          <OnboardingForm />
        </div>

        <div className={css.regRight}>
          <Image
            src="/images/onboard.png"
            alt="onboard photo"
            className={css.mainImage}
            width={720}
            height={900}
          />
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
