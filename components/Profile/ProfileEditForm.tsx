"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import css from "./ProfileForm.module.css";
import toast from "react-hot-toast";
import { ChildSex } from "@/types/user";
import * as Yup from "yup";
import { saveProfile } from "@/lib/api/clientApi";
import dynamic from "next/dynamic";
import { useAuthUserStore } from "@/lib/store/authStore";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";

const Select = dynamic(() => import("../ui/Select"), { ssr: false });

const OPTIONS: ChildSex[] = ["Хлопчик", "Дівчинка", "Ще не знаю"];

type FormValues = {
  name: string;
  email: string;
  photo: File | null;
  gender: ChildSex | "Ще не знаю";
  dueDate: string;
};

export const ProfileSchema = Yup.object({
  name: Yup.string().required("Вкажіть ім’я").max(50, "Максимум 50 символів"),
  email: Yup.string().email("Некоректний email").required("Вкажіть email"),
  gender: Yup.string().required("Оберіть стать дитини"),
  dueDate: Yup.string().required("Оберіть дату пологів"),
  photo: Yup.mixed<File>().nullable(),
});

const ProfileForm = () => {
  const router = useRouter();
  const [preview, setPreview] = useState<string | null>(null);
  const user = useAuthUserStore((state) => state.user);
  const setUser = useAuthUserStore((state) => state.setUser);

  const initialValues: FormValues = {
    name: user.name || "",
    email: user.email || "",
    photo: null,
    gender: user.childSex || "Ще не знаю",
    dueDate: user.dueDate || "",
  };

  const a = useAuthUserStore.getState();
  console.log(a);

  return (
    <Formik<FormValues>
      initialValues={initialValues}
      validationSchema={ProfileSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const res = await saveProfile({
            name: values.name,
            email: values.email,
            childSex: values.gender,
            dueDate: values.dueDate,
            photo: values.photo ?? undefined,
          });

          if (res) {
            setUser(res);
          }

          toast.success("Дані збережено!");
          router.push("/");
        } catch (err: unknown) {
          if (err instanceof Error) {
            toast.error(err?.message || "Сталася помилка");
          }
        } finally {
          setSubmitting(false);
        }
      }}
      enableReinitialize={true}
    >
      {({ isSubmitting, setFieldValue, values, resetForm }) => {
        console.log(values);

        return (
          
          <Form className={css.edit_form}>
            <Breadcrumbs/>
            <div className={css.profile_main_row}>
              <div className={css.photo_file_wrapper}>
                <div>
                  <label htmlFor="fileInput" className={css.avatarLabel}>
                    <Image
                      src={preview || user.photo || "/images/placeholder.png"}
                      alt="avatar"
                      className={css.avatar}
                      width={132}
                      height={132}
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
              </div>

              <div className={css.info_fields_stack}>
                <div className={css.info_item}>
                  <span className={css.value_name}>{user.name || "Ганна"}</span>
                </div>

                <div className={css.info_item}>
                  <span className={css.value_email}>
                    {user.email || "hanna@gmail.com"}
                  </span>
                </div>

                <button
                  type="button"
                  className={`${css.load_photo_btn} btn-secondary`}
                  onClick={() =>
                    (
                      document.getElementById("fileInput") as HTMLInputElement
                    )?.click()
                  }
                >
                  Завантажити нове фото
                </button>
              </div>
            </div>

            <label htmlFor="name" className={css.label_cont}>
              <span className={`${css.label} text-primary`}>Ім&apos;я</span>
              <Field
                id="name"
                type="text"
                name="name"
                className={css.dateSelect}
                value={values.name}
                placeholder="Ганна"
              />

              <ErrorMessage name="name" component="div" className={css.error} />
            </label>

            <label htmlFor="email" className={css.label_cont}>
              <span className={`${css.label} text-primary`}>Пошта</span>
              <Field
                id="email"
                type="text"
                name="email"
                className={css.dateSelect}
                value={values.email}
                placeholder="hanna@gmail.com"
              />

              <ErrorMessage
                name="email"
                component="div"
                className={css.error}
              />
            </label>

            <label htmlFor="sex" className={css.label_cont}>
              <span className={`${css.label} text-primary`}>Стать дитини</span>
              <Select
                id="sex"
                options={OPTIONS}
                value={values.gender}
                onChange={(val: string) => setFieldValue("gender", val)}
                placeholder="Оберіть стать"
                isClearable={false}
              />
              <ErrorMessage
                name="gender"
                component="div"
                className={css.error}
              />
            </label>
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
              <ErrorMessage
                name="dueDate"
                component="div"
                className={css.error}
              />
            </label>

            <div className={css.actions_wrapper}>
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  setPreview(null);
                }}
                className={`btn-secondary ${css.cancel_btn}`}
              >
                Відмінити зміни
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`btn-primary ${css.submit_btn}`}
              >
                {isSubmitting ? "Збереження..." : "Зберегти зміни"}
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ProfileForm;
