import css from "./Button.module.css";

type ButtonProps = {
  label: string;
  style?: "primary" | "secondary";
  disabled?: boolean;
};

export default function Button({
  label,
  style = "primary",
  disabled,
}: ButtonProps) {
  return disabled ? (
    <button className={`${css.button} ${css.disabled} ${css[style]}`}>
      {label}
    </button>
  ) : (
    <button className={`${css.button} ${css[style]}`}>{label}</button>
  );
}
