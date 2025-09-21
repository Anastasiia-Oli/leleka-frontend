"use client";
import css from "./Input.module.css";
import { Field } from "formik";

export default function Input({
  placeholder,
  name,
}: {
  placeholder: string;
  name: string;
}) {
  return (
    <Field
      placeholder={placeholder}
      name={name}
      className={css.customInputField}
    ></Field>
  );
}
