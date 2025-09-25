"use client";

import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { getEmotions, Emotion } from "@/lib/api/categoriesApi";
import css from "./AddDiaryEntryForm.module.css";

interface DiaryEntryValues {
  title: string;
  description: string;
  date: string;
  emotions: string[];
}

interface AddDiaryEntryFormProps {
  mode: "create" | "edit";
  entryId?: string;
  onSuccess: () => void;
}

const initialValues: DiaryEntryValues = {
  title: "",
  description: "",
  date: new Date().toISOString().slice(0, 10), // yyyy-mm-dd
  emotions: [],
};

export default function AddDiaryEntryForm({
  mode,
  entryId,
  onSuccess,
}: AddDiaryEntryFormProps) {
  const [emotions, setEmotions] = useState<Emotion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmotions = async () => {
      try {
        const data = await getEmotions();
        setEmotions(data);
      } catch (error) {
        console.error("Помилка при завантаженні емоцій:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmotions();
  }, []);

  const handleSubmit = (values: DiaryEntryValues) => {
    console.log("Форма відправлена:", values, { mode, entryId });

    // тут можна відрізняти "create" і "edit"
    if (mode === "create") {
      // створення запису
    } else {
      // редагування запису за entryId
    }

    // закриваємо модалку після успішного сабміту
    onSuccess();
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values, setFieldValue }) => (
        <Form className={css.form}>
          {/* Заголовок */}
          <div className={css.fieldWrapper}>
            <label className={css.label}>Заголовок</label>
            <Field name="title" className={css.input} />
            <ErrorMessage name="title" component="div" className={css.error} />
          </div>

          {/* Категорії */}
          <div className={css.fieldWrapper}>
            <label className={css.label}>Категорії</label>
            {loading ? (
              <p>Завантаження...</p>
            ) : (
              <div className={css.selectWrapper}>
                <Field
                  as="select"
                  name="emotions"
                  multiple
                  className={css.select}
                  value={values.emotions}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    const selected = Array.from(
                      e.target.selectedOptions,
                      (option) => option.value
                    );
                    setFieldValue("emotions", selected);
                  }}
                >
                  {emotions.map((emotion) => (
                    <option key={emotion._id} value={emotion._id}>
                      {emotion.title}
                    </option>
                  ))}
                </Field>
                <svg
                  className={css.selectIcon}
                  viewBox="0 0 32 32"
                  width="20"
                  height="20"
                >
                  <use href="/leleka-sprite.svg#icon-arrow-down" />
                </svg>
              </div>
            )}
            <ErrorMessage
              name="emotions"
              component="div"
              className={css.error}
            />
          </div>

          {/* Запис */}
          <div className={css.fieldWrapper}>
            <label className={css.label}>Запис</label>
            <Field as="textarea" name="description" className={css.textarea} />
            <ErrorMessage
              name="description"
              component="div"
              className={css.error}
            />
          </div>

          {/* Кнопка */}
          <button type="submit" className={css.submitBtn}>
            {mode === "create" ? "Створити" : "Зберегти зміни"}
          </button>
        </Form>
      )}
    </Formik>
  );
}
