import { useRef, useState, useEffect } from "react";
import css from "./EmotionSelect.module.css";
import { FormikHelpers } from "formik";
import type { Emotion } from "@/types/diaryModal";

export type DiaryFormValues = {
  emotions: string[]; // зберігаємо _id
};

type EmotionSelectProps = {
  emotions: Emotion[];
  values: DiaryFormValues;
  setFieldValue: FormikHelpers<DiaryFormValues>["setFieldValue"];
};

export default function EmotionSelect({
  emotions,
  values,
  setFieldValue,
}: EmotionSelectProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [thumbTop, setThumbTop] = useState(8);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;

      const trackHeight = 204;
      const thumbHeight = 56;
      const scrollable = scrollHeight - clientHeight;

      if (scrollable <= 0) {
        setThumbTop(8);
        return;
      }

      const maxThumbMove = trackHeight - thumbHeight;
      const newTop = 8 + (scrollTop / scrollable) * maxThumbMove;
      setThumbTop(newTop);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={css.scrollWrapper}>
      <div className={css.track}></div>
      <div className={css.thumb} style={{ top: `${thumbTop}px` }}></div>

      <div className={css.scrollContainer} ref={scrollRef}>
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
                    : values.emotions.filter((id) => id !== emotion._id);
                  setFieldValue("emotions", updated);
                }}
              />
              {emotion.title}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
