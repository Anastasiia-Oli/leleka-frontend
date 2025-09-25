"use client";

import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { registerUser, login } from "@/lib/api/clientApi"; 
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import styles from "./AuthPage.module.css";
import Link from "next/link";

type FormValues = { name: string; email: string; password: string };

const Schema = Yup.object({
  name: Yup.string().required("Вкажіть ім’я"),
  email: Yup.string().email("Некоректний email").required("Вкажіть email"),
  password: Yup.string().min(8, "Мінімум 8 символів").required("Вкажіть пароль"),
});

const AFTER_REGISTER = "/";

export default function RegistrationForm() {
  const router = useRouter();

  return (
    <Formik<FormValues>
      initialValues={{ name: "", email: "", password: "" }}
      validationSchema={Schema}
      onSubmit={async (values, { setSubmitting }) => {
        const payload = {
          name: values.name.trim(),
          email: values.email.trim().toLowerCase(),
          password: values.password,
        };

        try {
          await registerUser(payload);
          await login({ email: payload.email, password: payload.password });
          toast.success("Реєстрація успішна!");
          router.push(AFTER_REGISTER);
        } catch (err: unknown) {
          if (axios.isAxiosError(err)) {
            if (err.response?.status === 409) {
              toast.error("Такий email вже використовується");
            } else {
              toast.error((err.response?.data as { message?: string })?.message || "Помилка реєстрації");
            }
          } else {
            toast.error(err instanceof Error ? err.message : "Помилка реєстрації");
          }
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, errors, touched }) => {
        const nameHasError = Boolean(touched.name && errors.name);
        const emailHasError = Boolean(touched.email && errors.email);
        const passwordHasError = Boolean(touched.password && errors.password);

        return (
          <Form>
            <label className={styles.label}>
              <span className={`${styles.labelText} ${nameHasError ? styles.labelTextError : ""}`}>Ім’я*</span>
              <Field
                type="text"
                name="name"
                placeholder="Ваше ім’я"
                className={`${styles.input} ${nameHasError ? styles.inputError : ""}`}
                aria-invalid={nameHasError}
                autoComplete="name"
              />
              <ErrorMessage name="name" component="div" className={styles.error} />
            </label>

            <label className={styles.label}>
              <span className={`${styles.labelText} ${emailHasError ? styles.labelTextError : ""}`}>Пошта*</span>
              <Field
                type="email"
                name="email"
                placeholder="hello@leleka.com"
                className={`${styles.input} ${emailHasError ? styles.inputError : ""}`}
                aria-invalid={emailHasError}
                autoComplete="email"
                inputMode="email"
              />
              <ErrorMessage name="email" component="div" className={styles.error} />
            </label>

            <label className={styles.label}>
              <span className={`${styles.labelText} ${passwordHasError ? styles.labelTextError : ""}`}>Пароль*</span>
              <Field
                type="password"
                name="password"
                placeholder="********"
                className={`${styles.input} ${passwordHasError ? styles.inputError : ""}`}
                aria-invalid={passwordHasError}
                autoComplete="new-password"
              />
              <ErrorMessage name="password" component="div" className={styles.error} />
            </label>

            <button type="submit" disabled={isSubmitting} className={styles.btnPink}>
              Зареєструватись
            </button>

            <p className={styles.helper}>
              Вже маєте акаунт? <Link href="/auth/login" className={styles.helperLink}>Увійти</Link>
            </p>
          </Form>
        );
      }}
    </Formik>
  );
}
