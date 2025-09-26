"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // якщо App Router
import css from "./OnboardingForm.module.css";
import toast from "react-hot-toast"; // якщо ти юзаєш iziToast можна підмінити
import { ChildSex } from "@/types/types";
import * as Yup from "yup";
import { submitOnboarding } from "@/lib/api/clientApi";
import dynamic from "next/dynamic";
const Select = dynamic(() => import("../ui/Select"), { ssr: false });


const OPTIONS: ChildSex[] = ["Хлопчик", "Дівчинка", "Ще не знаю"];

type FormValues = {
  photo: File | null;
  gender: ChildSex | "Ще не знаю";
  dueDate: string;
};


export const OnboardingSchema = Yup.object({
  gender: Yup.string().required("Оберіть стать дитини"),
  dueDate: Yup.string().required("Оберіть дату пологів"),
  photo: Yup.mixed<File>().nullable(),
}); 

const OnboardingForm = () => {
  const router = useRouter();
  const [preview, setPreview] = useState<string | null>(null);

  const initialValues: FormValues = {
    photo: null,
    gender: "Ще не знаю",
    dueDate: "",
  };

  return (
    <Formik<FormValues>
      initialValues={initialValues}
      validationSchema={OnboardingSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await submitOnboarding({
            childSex: values.gender, // звузимо під час сабміту
            dueDate: values.dueDate,
            photo: values.photo ?? undefined,
          });

          toast.success("Дані збережено!");
          router.push("/my-day");
        } catch (err: unknown) {
          if (err instanceof Error) {
            toast.error(err?.message || "Сталася помилка");
          }
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, setFieldValue, values }) => {
        console.log(values);
        
        return (
          <Form className={css.edit_form}>
            <h1 className={`header-first ${css.header}`}>
              Давайте познайомимось ближче
            </h1>

            {/* Фото */}
            <div className={css.photo_file_wrapper}>
              <div>
                <label htmlFor="fileInput" className={css.avatarLabel}>
                  <Image
                    src={preview || "/images/placeholder.png"}
                    alt="avatar"
                    className={css.avatar}
                    width={164}
                    height={164}
                  />
                </label>
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => {
                    const file = e.currentTarget.files?.[0] || null;
                    setFieldValue("photo", file);
                    if (file) {
                      setPreview(URL.createObjectURL(file));
                    } else {
                      setPreview(null);
                    }
                  }}
                />
              </div>
              <button
                type="button"
                className={`${css.load_photo_btn} btn-secondary`}
                onClick={() =>
                  (document.getElementById("fileInput") as HTMLInputElement)?.click()
                }
              >
                Завантажити фото
              </button>
            </div>

            {/* Стать */}
            <label htmlFor="sex" className={css.label_cont}>
              <span className={`${css.label} text-primary`}>Стать дитини</span>
            <Select
                id="sex"
                options={OPTIONS}
                value={values.gender}
                onChange={(val: string) => setFieldValue("gender", val)}
                placeholder="Оберіть стать"
              />
              <ErrorMessage name="gender" component="div" className={css.error} />
            </label>

            {/* Дата */}
            <label htmlFor="dueDate" className={css.label_cont}>
              <span className={`${css.label} text-primary`}>
                Планова дата пологів
              </span>
              <Field
                id="dueDate"
                type="date"
                name="dueDate"
                className={css.dateSelect}
              />
              <ErrorMessage name="dueDate" component="div" className={css.error} />
            </label>

            {/* Сабміт */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`btn-primary ${css.submit_btn}`}
            >
              {isSubmitting ? "Збереження..." : "Зберегти"}
            </button>
          </Form>
        )
      }}
    </Formik>
  );
}

export default OnboardingForm;
