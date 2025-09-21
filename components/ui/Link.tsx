import Link from "next/link";
import css from "./Link.module.css";

type LinkComonentProps = {
  href: string;
  label: string;
  disabled?: boolean;
};

export default function LinkComponent({
  href,
  label,
  disabled,
}: LinkComonentProps) {
  return disabled ? (
    <Link href={href} className={`${css.normal} ${css.disabled} `}>
      {label}
    </Link>
  ) : (
    <Link href={href} className={css.normal}>
      {label}
    </Link>
  );
}
