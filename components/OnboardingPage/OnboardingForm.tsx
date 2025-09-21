"use client";
import React, { useState } from "react";
import Image from "next/image";
import Select from "../ui/Select";
import css from "./OnboardingForm.module.css";

const OPTIONS = ["Хлопчик", "Дівчинка", "Ще не знаю"];

const OnboardingForm = () => {
    const [preview, setPreview] = useState<string>("");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
                if (file) {
        setPreview(URL.createObjectURL(file));
        }
    };

  return (
    <div className={css.onboard_container}>
      <h1 className={`header-first ${css.header}`}>
        Давайте познайомимось ближче
      </h1>

      <div className={css.photo_file_wrapper}>
        <div>
            <input
                type="file"
                id="fileInput"
                accept="image/*"
                onChange={handleFileChange}
                hidden
            />

            <label htmlFor="fileInput" className={css.avatarLabel}>
                <Image
                    src={preview || "/images/placeholder.png"} // картинка-заглушка
                    alt="avatar"
                    className={css.avatar}
                    width={164}
                    height={164}
                />
            </label>
        </div>
            <button className={`${css.load_photo_btn} btn-secondary`} onClick={() => (document.getElementById("fileInput") as HTMLInputElement | null)?.click()}>
             Завантажити фото
            </button>
      </div>

      <form action="" className={css.edit_form}>
        <div className={css.inputs}>
          <label htmlFor="sex" className={css.label_cont}>
            <span className={`${css.label} text-primary`}>Стать дитини</span>
                      <Select options={OPTIONS} id="sex" />
          </label>

          <label htmlFor="dateOfBirth" className={css.label_cont}>
            <span className={`${css.label} text-primary`}>
              Планова дата пологів
            </span>
            <input
              type="date"
              className={css.dateSelect}
              id="dateOfBirth"
            />
          </label>
        </div>

        <button className={`btn-primary ${css.submit_btn}`}>Зберегти</button>
      </form>
    </div>
  );
};

export default OnboardingForm;
