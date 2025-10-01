"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ukrainianTranslations } from "@/lib/translations/translations";
import { useTitleDraftStore } from "@/lib/store/titleStore";
import styles from "./Breadcrumbs.module.css";

interface Breadcrumb {
  name: string;
  href: string;
}

interface ArrowDividerProps {
  iconId: string;
}

const ArrowDivider = ({ iconId }: ArrowDividerProps) => (
  <svg className={styles.breadcrumbDivider} aria-hidden="true">
    <use href={`${iconId}`} />
  </svg>
);

export default function Breadcrumbs() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);
  const { draft } = useTitleDraftStore();

  const ARROW_ICON_ID = "/leleka-sprite.svg#icon-breadcrumbs";

  const allBreadcrumbs: Breadcrumb[] = [
    // { name: ukrainianTranslations.home, href: "/" },
  ];

  allBreadcrumbs.push({ name: ukrainianTranslations.home, href: "/" });

  if (pathname === "/" || pathname === "") {
    // ✅ Если это главная — добавляем "Мій день"
    allBreadcrumbs.push({ name: "Мій день", href: "/" });
  } else {
    pathSegments.forEach((segment, index) => {
      const href = "/" + pathSegments.slice(0, index + 1).join("/");
      let translatedName = ukrainianTranslations[segment] || segment;

      if (
        index === pathSegments.length - 1 &&
        segment.match(/^[0-9a-f]{24}$/i)
      ) {
        translatedName = draft || "Записка";
      }

      allBreadcrumbs.push({ name: translatedName, href });
    });
  }

  return (
    <nav aria-label="Хлібні крихти" className={styles.breadcrumb}>
      <ul className={styles.breadcrumbsList}>
        {allBreadcrumbs.map((crumb, index) => (
          <li key={index} className={styles.breadcrumbItem}>
            {index > 0 && (
              <span className={styles.breadcrumbDivider}>
                <ArrowDivider iconId={ARROW_ICON_ID} />{" "}
              </span>
            )}
            <Link href={crumb.href} className={styles.breadcrumbLink}>
              {crumb.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
