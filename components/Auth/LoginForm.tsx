"use client";

import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { getMe, login } from "@/lib/api/clientApi"; 
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import styles from "./AuthPage.module.css";
import Link from "next/link";
import { useAuthUserStore } from "@/lib/store/authStore";

type FormValues = { email: string; password: string };

const Schema = Yup.object({
  email: Yup.string().email("Некоректний email").required("Вкажіть email"),
  password: Yup.string().min(6, "Мінімум 6 символів").required("Вкажіть пароль"),
});

const AFTER_LOGIN = "/";

export default function LoginForm() {
  const { setIsAuthenticated, setUser } = useAuthUserStore.getState();
  
  const router = useRouter();

  return (
    <Formik<FormValues>
      initialValues={{ email: "", password: "" }}
      validationSchema={Schema}
      onSubmit={async (values, { setSubmitting }) => {
        const payload = {
          email: values.email.trim().toLowerCase(),
          password: values.password,
        };
        try {
          console.log(2);
          await login(payload); 
          const user = await getMe()
          toast.success("Вхід успішний!");
          setIsAuthenticated(true);
          setUser(user);
          router.push(AFTER_LOGIN);
        } catch (err: unknown) {
          // const msg = axios.isAxiosError(err)
          //   ? (err.response?.data as { message?: string })?.message || "Помилка входу"
          //   : err instanceof Error
          //   ? err.message
          //   : "Помилка входу";
          // toast.error(msg);
          console.log(err);
          
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, errors, touched }) => {
        const emailHasError = Boolean(touched.email && errors.email);
        const passwordHasError = Boolean(touched.password && errors.password);

        return (
          <Form>
            <label className={styles.label}>
              <span className={`${styles.labelText} ${emailHasError ? styles.labelTextError : ""}`}>Пошта*</span>
              <Field
                type="email"
                name="email"
                placeholder="Пошта"
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
                placeholder="Пароль"
                className={`${styles.input} ${passwordHasError ? styles.inputError : ""}`}
                aria-invalid={passwordHasError}
                autoComplete="current-password"
              />
              <ErrorMessage name="password" component="div" className={styles.error} />
            </label>

            <button type="submit" disabled={isSubmitting} className={styles.btnPink}>
              Увійти
            </button>

            <p className={styles.helper}>
              Немає акаунта? <Link href="/auth/register" className={styles.helperLink}>Зареєструватись</Link>
            </p>
          </Form>
        );
      }}
    </Formik>
  );
}
