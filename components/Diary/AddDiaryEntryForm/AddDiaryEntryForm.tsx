"use client";

import { Formik, Form, Field, FormikHelpers } from "formik";
import { useState, useEffect } from "react";
import { useDiaryForm } from "@/hooks/useDiaryForm";
import css from "./AddDiaryEntryForm.module.css";
import { createDiaryEntry, updateDiaryEntry } from "@/lib/api/clientApi";
import { createDiaryEntrySchema } from "@/lib/validation/diaryValidation";
import EmotionSelect from "@/components/Diary/EmotionSelect/EmotionSelect";
import { ObjectSchema } from "yup";
import { toast } from "react-hot-toast";
import { DiaryEntry } from "@/types/dairy";
import { useQueryClient } from "@tanstack/react-query";

interface DiaryEntryValues {
  title: string;
  description: string;
  date: string;
  emotions: string[];
}

interface AddDiaryEntryFormProps {
  mode: "create" | "edit";
  entry?: DiaryEntry;
  onSuccess: () => void;
}

export default function AddDiaryEntryForm({
  mode,
  entry,
  onSuccess,
}: AddDiaryEntryFormProps) {
  const queryClient = useQueryClient();
  const { emotions, loading, error, topCount } = useDiaryForm();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [validationSchema, setValidationSchema] =
    useState<ObjectSchema<DiaryEntryValues> | null>(null);

  const [initialValues, setInitialValues] = useState<DiaryEntryValues>({
    title: "",
    description: "",
    date: new Date().toISOString().slice(0, 10),
    emotions: [],
  });

  const topEmotions = emotions.slice(0, topCount);

  // ✅ Створюємо схему валідації після завантаження емоцій
  useEffect(() => {
    if (emotions.length > 0) {
      createDiaryEntrySchema().then((schema) =>
        setValidationSchema(schema as ObjectSchema<DiaryEntryValues>)
      );
    }
  }, [emotions]);

  // ✅ Заповнюємо форму даними при редагуванні
  useEffect(() => {
    if (mode === "edit" && entry) {
      setInitialValues({
        title: entry.title || "",
        description: entry.description || "",
        date: entry.date?.slice(0, 10) || new Date().toISOString().slice(0, 10),
        emotions: entry.emotions?.map((e) => e._id) || [],
      });
    } else if (mode === "create") {
      setInitialValues({
        title: "",
        description: "",
        date: new Date().toISOString().slice(0, 10),
        emotions: [],
      });
    }
  }, [mode, entry]);

  // ✅ Сабміт форми
  const handleSubmit = async (
    values: DiaryEntryValues,
    helpers: FormikHelpers<DiaryEntryValues>
  ) => {
    try {
      if (mode === "create") {
        // console.log("📤 Дані, які відправляємо:", values);
        await createDiaryEntry(values);
        toast.success("Запис успішно створено!");
      } else if (mode === "edit" && entry?._id) {
        // console.log("📦 Що надсилаємо:", JSON.stringify(values, null, 2));
        await updateDiaryEntry(entry._id, values);
        toast.success("Запис успішно оновлено!");
      }

      await queryClient.invalidateQueries({ queryKey: ["diary"] });

      helpers.resetForm();
      onSuccess(); // ✅ закриває модалку
    } catch (err: unknown) {
      console.error("Помилка при збереженні запису:", err);

      const message =
        err && typeof err === "object" && "response" in err
          ? (err as { response?: { data?: { message?: string } } }).response
              ?.data?.message
          : undefined;

      toast.error(message || "Не вдалося зберегти запис. Спробуйте ще раз.");
    }
  };

  if (!validationSchema) return <div>Завантаження форми...</div>;

  return (
    <Formik
      enableReinitialize
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
              className={`${css.input} ${
                errors.title && (touched.title || submitCount > 0)
                  ? css.inputError
                  : ""
              }`}
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

                  <EmotionSelect
                    emotions={emotions}
                    values={values}
                    setFieldValue={setFieldValue}
                  />
                </div>
              )}
            </div>

            {(touched.emotions || submitCount > 0) && errors.emotions && (
              <div className={css.error}>{errors.emotions as string}</div>
            )}
          </div>

          {/* ✏️ Опис */}
          <div className={css.fieldWrapper}>
            <label className={css.label}>Запис</label>
            <Field
              as="textarea"
              name="description"
              placeholder="Запишіть, як ви себе відчуваєте"
              className={`${css.textarea} ${
                (touched.description || submitCount > 0) && errors.description
                  ? css.inputError
                  : ""
              }`}
            />
            {(touched.description || submitCount > 0) && errors.description && (
              <div className={css.error}>{errors.description}</div>
            )}
          </div>

          <button type="submit" className={css.submitBtn}>
            {mode === "create" ? "Зберегти" : "Зберегти"}
          </button>
        </Form>
      )}
    </Formik>
  );
}
