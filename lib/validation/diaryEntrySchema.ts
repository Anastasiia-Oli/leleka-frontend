import * as Yup from "yup";

const emotionsList = [
  "радість",
  "сум",
  "злість",
  "страх",
  "здивування",
  "спокій",
  "відраза",
  "ентузіазм",
  "тривога",
  "гордість",
  "любов",
  "нудьга",
];

const diaryEntrySchema = Yup.object().shape({
  title: Yup.string()
    .required("Заголовок обов'язковий")
    .min(1, "Заголовок має містити мінімум 1 символ")
    .max(64, "Заголовок має містити максимум 64 символи"),
  description: Yup.string()
    .required("Опис обов'язковий")
    .min(1, "Опис має містити мінімум 1 символ")
    .max(1000, "Опис має містити максимум 1000 символів"),
  date: Yup.string()
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Дата має бути у форматі YYYY-MM-DD")
    .default(() => new Date().toISOString().slice(0, 10)),
  emotions: Yup.array()
    .of(Yup.string().oneOf(emotionsList))
    .required("Оберіть хоча б одну емоцію")
    .min(1, "Оберіть хоча б одну емоцію")
    .max(12, "Можна обрати максимум 12 емоцій"),
});

export default diaryEntrySchema;
