"use client";

import { Formik, Form, Field, FormikHelpers } from "formik";
import { useState, useEffect } from "react";
import { useDiaryForm } from "@/hooks/useDiaryForm";
import css from "./AddDiaryEntryForm.module.css";
import {
  createDiaryEntry,
  updateDiaryEntry,
  getDiaryById,
} from "@/lib/api/clientApi";
import { createDiaryEntrySchema } from "@/lib/validation/diaryValidation";
import EmotionSelect from "@/components/Diary/EmotionSelect/EmotionSelect";
import { ObjectSchema } from "yup";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Emotion } from "@/types/diaryModal";

interface DiaryEntryValues {
  title: string;
  description: string;
  date: string;
  emotions: string[]; // тут залишаю string[], бо Formik з чекбоксами працює тільки з простими рядками
}

interface AddDiaryEntryFormProps {
  mode: "create" | "edit";
  entryId?: string;
  onSuccess: () => void;
}

export default function AddDiaryEntryForm({
  mode,
  entryId,
  onSuccess,
}: AddDiaryEntryFormProps) {
  const router = useRouter();
  const { emotions, loading, error, topCount } = useDiaryForm();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [validationSchema, setValidationSchema] =
    useState<ObjectSchema<DiaryEntryValues> | null>(null);

  const [initialValues, setInitialValues] = useState<DiaryEntryValues>({
    title: "",
    description: "",
    date: new Date().toISOString().slice(0, 10),
    emotions: [], // а тут вже йде масив тайтлів, а не об’єктів
  });

  const [loadingEntry, setLoadingEntry] = useState(false);
  const topEmotions = emotions.slice(0, topCount);

  // ✅ Отримуємо динамічну схему валідації на основі емоцій з бази
  useEffect(() => {
    if (emotions.length > 0) {
      createDiaryEntrySchema().then((schema) =>
        setValidationSchema(schema as ObjectSchema<DiaryEntryValues>)
      );
    }
  }, [emotions]);

  // ✅ якщо режим редагування – підтягуємо існуючий запис
  useEffect(() => {
    const fetchEntry = async () => {
      if (mode === "edit" && entryId) {
        setLoadingEntry(true);
        try {
          const entry = await getDiaryById(entryId);

          setInitialValues({
            title: entry.title || "",
            description: entry.description || "",
            date:
              entry.date?.slice(0, 10) || new Date().toISOString().slice(0, 10), // ✅ гарантуємо рядок
            emotions: (entry.emotions as Emotion[])?.map((e) => e._id) || [],
          });
        } catch (err) {
          console.error("Не вдалося завантажити запис:", err);
          toast.error("Не вдалося завантажити запис");
        } finally {
          setLoadingEntry(false);
        }
      }
    };

    fetchEntry();
  }, [mode, entryId]);

  // ✅ Сабміт з пуш-помилкою і оновленням сторінки
  const handleSubmit = async (
    values: DiaryEntryValues,
    helpers: FormikHelpers<DiaryEntryValues>
  ) => {
    try {
      if (mode === "create") {
        await createDiaryEntry(values);
        toast.success("Запис успішно створено!");
      } else if (mode === "edit" && entryId) {
        await updateDiaryEntry(entryId, values);
        toast.success("Запис оновлено!");
      }
      helpers.resetForm();
      onSuccess();
      router.refresh(); // ✅ оновлює список записів
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
  if (loadingEntry) return <div>Завантаження запису...</div>;

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

          {/* ✏️ Запис */}
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
            {mode === "create" ? "Зберегти" : "Оновити"}
          </button>
        </Form>
      )}
    </Formik>
  );
}
