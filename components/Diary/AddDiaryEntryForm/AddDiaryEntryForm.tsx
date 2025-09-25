"use client";

import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  createDiaryEntry,
  updateDiaryEntry,
  fetchCategories,
} from "../../../lib/api/diaryApi";
import diaryEntrySchema from "@/lib/validation/diaryEntrySchema";
import css from "./AddDiaryEntryForm.module.css";

interface Props {
  mode: "create" | "edit";
  entryId?: string;
  onSuccess: () => void;
}

interface FormValues {
  title: string;
  categories: string[]; // у Formik зберігаємо id категорій
  content: string;
  description: string;
  emotions: string[];
}

interface Category {
  id: string;
  name: string;
}

export default function AddDiaryEntryForm({ mode, entryId, onSuccess }: Props) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // завантаження категорій з бекенду
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data: Category[] = await fetchCategories();
        setCategories(data);
      } catch (err) {
        console.error("Помилка завантаження категорій:", err);
      } finally {
        setLoading(false);
      }
    };
    loadCategories();
  }, []);

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
            {loading ? (
              <p>Завантаження...</p>
            ) : (
              <div className={css.checkboxGroup}>
                {categories.map((cat) => (
                  <label key={cat.id}>
                    <Field
                      type="checkbox"
                      name="categories"
                      value={cat.id} // ✅ у Formik підуть id категорій
                    />{" "}
                    {cat.name}
                  </label>
                ))}
              </div>
            )}
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
