"use client";

import { Field } from "formik";
import css from "./TextArea.module.css";

export default function TextArea({
  placeholder,
  name,
}: {
  placeholder?: string;
  name: string;
}) {
  return (
    <Field
      as="textarea"
      name={name}
      className={css.customTextArea}
      placeholder={placeholder}
    />
  );
}
