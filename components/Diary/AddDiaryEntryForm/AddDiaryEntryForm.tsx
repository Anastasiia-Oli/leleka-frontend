"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
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
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values, setFieldValue }) => (
        <Form className={css.form}>
          {/* 📝 Заголовок */}
          <div className={css.fieldWrapper}>
            <label className={css.label}>Заголовок</label>
            <Field
              name="title"
              className={css.input}
              placeholder="Введіть заголовок запису"
            />
            <ErrorMessage name="title" component="div" className={css.error} />
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

            <ErrorMessage
              name="emotions"
              component="div"
              className={css.error}
            />
          </div>

          {/* ✏️ Запис */}
          <div className={css.fieldWrapper}>
            <label className={css.label}>Запис</label>
            <Field
              as="textarea"
              name="description"
              className={css.textarea}
              placeholder="Запишіть, як ви себе відчуваєте"
            />
            <ErrorMessage
              name="description"
              component="div"
              className={css.error}
            />
          </div>

          <button type="submit" className={css.submitBtn}>
            Зберегти
          </button>
        </Form>
      )}
    </Formik>
  );
}
