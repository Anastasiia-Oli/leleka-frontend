"use client";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useDiaryForm } from "@/hooks/useDiaryForm";
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
  date: new Date().toISOString().slice(0, 10),
  emotions: [],
};

// ✅ Схема валідації
const validationSchema = Yup.object({
  title: Yup.string().required("Заголовок є обов’язковим"),
  description: Yup.string().required("Запис не може бути порожнім"),
  emotions: Yup.array().min(1, "Оберіть хоча б одну категорію"),
});

export default function AddDiaryEntryForm({
  mode,
  entryId,
  onSuccess,
}: AddDiaryEntryFormProps) {
  const { emotions, loading, error, topCount } = useDiaryForm();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const topEmotions = emotions.slice(0, topCount);

  const handleSubmit = (values: DiaryEntryValues) => {
    console.log("Форма відправлена:", values, { mode, entryId });
    onSuccess();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue, errors, touched, submitCount }) => (
        <Form className={css.form}>
          {/* 📝 Заголовок */}
          <div className={css.fieldWrapper}>
            <label className={css.label}>Заголовок</label>
            <Field
              name="title"
              className={`${css.input} 
    ${errors.title && (touched.title || submitCount > 0) ? css.inputError : ""} 
    ${errors.title && (touched.title || submitCount > 0) ? css.placeholderError : ""}
  `}
              placeholder="Введіть заголовок запису"
            />
            {errors.title && touched.title && (
              <div className={css.error}>{errors.title}</div>
            )}
          </div>

          {/* 📂 Категорії */}
          <div className={css.fieldWrapper}>
            <label className={css.label}>Категорії</label>

            {loading && <p>Завантаження категорій...</p>}
            {error && <p className={css.error}>{error}</p>}

            <div className={css.dropdownWrapper}>
              {!dropdownOpen && (
                <div
                  className={css.selectedEmotions}
                  onClick={() => setDropdownOpen(true)}
                >
                  {(values.emotions.length > 0
                    ? values.emotions
                    : topEmotions.map((e) => e._id)
                  ).map((id) => {
                    const emotion = emotions.find((e) => e._id === id);
                    return (
                      <span key={id} className={css.chip}>
                        {emotion?.title}
                      </span>
                    );
                  })}

                  <svg
                    className={css.selectIcon}
                    viewBox="0 0 32 32"
                    width="24"
                    height="24"
                  >
                    <use href="/leleka-sprite.svg#icon-keyboard_arrow_down" />
                  </svg>
                </div>
              )}

              {dropdownOpen && (
                <div className={css.dropdown}>
                  <div className={css.dropdownHeader}>
                    Оберіть категорію
                    <svg
                      className={css.selectIcon}
                      viewBox="0 0 32 32"
                      width="24"
                      height="24"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <use href="/leleka-sprite.svg#icon-keyboard_arrow_up" />
                    </svg>
                  </div>

                  <div className={css.optionsList}>
                    {emotions.map((emotion) => (
                      <label key={emotion._id} className={css.option}>
                        <input
                          type="checkbox"
                          value={emotion._id}
                          checked={values.emotions.includes(emotion._id)}
                          onChange={(e) => {
                            const updated = e.target.checked
                              ? [...values.emotions, emotion._id]
                              : values.emotions.filter(
                                  (id) => id !== emotion._id
                                );
                            setFieldValue("emotions", updated);
                          }}
                        />
                        {emotion.title}
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {(touched.emotions || submitCount > 0) && errors.emotions && (
              <div className={css.error}>{errors.emotions as string}</div>
            )}
          </div>

          {/* ✏️ Запис */}
          <div className={css.fieldWrapper}>
            <label className={css.label}>Запис</label>
            <Field
              as="textarea"
              name="description"
              placeholder="Запишіть, як ви себе відчуваєте"
              className={`${css.textarea} 
    ${(touched.description || submitCount > 0) && errors.description ? css.inputError : ""} 
    ${(touched.description || submitCount > 0) && errors.description ? css.placeholderError : ""}
  `}
            />
            {(touched.description || submitCount > 0) && errors.description && (
              <div className={css.error}>{errors.description}</div>
            )}
          </div>

          <button type="submit" className={css.submitBtn}>
            Зберегти
          </button>
        </Form>
      )}
    </Formik>
  );
}
