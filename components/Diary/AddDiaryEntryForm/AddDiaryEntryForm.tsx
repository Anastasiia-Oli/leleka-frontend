"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { createDiaryEntry, updateDiaryEntry } from "../../../lib/api/diaryApi";
import diaryEntrySchema from "@/lib/validation/diaryEntrySchema";
import css from "./AddDiaryEntryForm.module.css";

interface Props {
  mode: "create" | "edit";
  entryId?: string;
  onSuccess: () => void;
}

// Тип для значень форми
interface FormValues {
  title: string;
  categories: string[];
  content: string;
  description: string;
  emotions: string[];
}

export default function AddDiaryEntryForm({ mode, entryId, onSuccess }: Props) {
  const initialValues: FormValues = {
    title: "",
    categories: [],
    content: "",
    description: "",
    emotions: [],
  };

  const handleSubmit = async (values: FormValues) => {
    try {
      if (mode === "create") await createDiaryEntry(values);
      else if (mode === "edit" && entryId)
        await updateDiaryEntry(entryId, values);

      onSuccess();
    } catch (err) {
      alert("Сталася помилка. Спробуйте ще раз.");
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={diaryEntrySchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className={css.fieldWrapper}>
            <label className={css.label}>Заголовок</label>
            <Field className={css.input} name="title" type="text" />
            <ErrorMessage name="title" component="div" className={css.error} />
          </div>

          <div className={css.fieldWrapper}>
            <label className={css.label}>Категорії</label>
            <div className={css.checkboxGroup}>
              <label>
                <Field type="checkbox" name="categories" value="радість" />{" "}
                Радість
              </label>
              <label>
                <Field type="checkbox" name="categories" value="сум" /> Сум
              </label>
              <label>
                <Field type="checkbox" name="categories" value="злість" />{" "}
                Злість
              </label>
            </div>
            <ErrorMessage
              name="categories"
              component="div"
              className={css.error}
            />
          </div>

          <div className={css.fieldWrapper}>
            <label className={css.label}>Запис</label>
            <Field
              as="textarea"
              className={css.textarea}
              name="content"
              rows={5}
            />
            <ErrorMessage
              name="content"
              component="div"
              className={css.error}
            />
          </div>

          <div className={css.fieldWrapper}>
            <label className={css.label}>Опис</label>
            <Field
              as="textarea"
              className={css.textarea}
              name="description"
              rows={3}
            />
            <ErrorMessage
              name="description"
              component="div"
              className={css.error}
            />
          </div>

          <div className={css.fieldWrapper}>
            <label className={css.label}>Емоції</label>
            <div className={css.checkboxGroup}>
              <label>
                <Field type="checkbox" name="emotions" value="радість" />{" "}
                Радість
              </label>
              <label>
                <Field type="checkbox" name="emotions" value="сум" /> Сум
              </label>
              <label>
                <Field type="checkbox" name="emotions" value="злість" /> Злість
              </label>
            </div>
            <ErrorMessage
              name="emotions"
              component="div"
              className={css.error}
            />
          </div>

          <button
            type="submit"
            className={css.submitBtn}
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Збереження..."
              : mode === "create"
                ? "Зберегти"
                : "Оновити"}
          </button>
        </Form>
      )}
    </Formik>
  );
}
