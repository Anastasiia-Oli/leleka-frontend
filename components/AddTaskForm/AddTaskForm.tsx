"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./AddTaskForm.module.css";
import { TaskFormValues } from "@/lib/api/clientApi";

interface AddTaskFormProps {
  initialData?: TaskFormValues;
  onSubmit: (values: TaskFormValues) => void;
}

const TaskSchema = Yup.object().shape({
  text: Yup.string().required("Обов'язкове поле"),
  date: Yup.date().required("Обов'язкове поле"),
});

export default function AddTaskForm({
  initialData,
  onSubmit,
}: AddTaskFormProps) {
  return (
    <Formik
      initialValues={{
        _id: initialData?._id,
        text: initialData?.text || "",
        date: initialData?.date || new Date().toISOString().slice(0, 10),
      }}
      validationSchema={TaskSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <Form className={css.form}>
          <div className={css.fieldWrapper}>
            <label className={css.label}>Назва завдання</label>
            <Field
              className={`${css.field} ${errors.text && touched.text ? css.errorField : ""}`}
              name="text"
              placeholder="Прийняти вітаміни"
            />
            <ErrorMessage
              name="text"
              component="div"
              className={css.errorMessage}
            />
          </div>

          <div className={css.fieldWrapper}>
            <label className={css.label}>Дата</label>
            <Field
              className={`${css.field} ${css.dateInput} ${errors.date && touched.date ? css.errorField : ""}`}
              type="date"
              name="date"
            />
            <ErrorMessage
              name="date"
              component="div"
              className={css.errorMessage}
            />
          </div>

          <button className={css.submitTaskBtn} type="submit">
            Зберегти
          </button>
        </Form>
      )}
    </Formik>
  );
}
