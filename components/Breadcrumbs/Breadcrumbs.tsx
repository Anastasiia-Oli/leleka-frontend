
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ukrainianTranslations } from '@/lib/translations/translations';
// Імпортуйте ваші CSS-модулі
import styles from './Breadcrumbs.module.css'// Приклад імпорту для CSS-модулів

interface Breadcrumb {
  name: string;
  href: string;
}

export default function Breadcrumbs() {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);

  const allBreadcrumbs: Breadcrumb[] = [
    { name: ukrainianTranslations.home, href: '/' },
  ];

  pathSegments.forEach((segment, index) => {
    const href = '/' + pathSegments.slice(0, index + 1).join('/');
    const translatedName = ukrainianTranslations[segment] || segment;
    allBreadcrumbs.push({ name: translatedName, href });
  });

  return (
    <nav aria-label="Хлібні крихти" className={styles.breadcrumb}>
      <ul className={styles.breadcrumbsList}>
        {allBreadcrumbs.map((crumb, index) => (
          <li key={index} className={styles.breadcrumbItem}>
            {index > 0 && <span className={styles.breadcrumbDivider}> {'>'} </span>}
            <Link href={crumb.href} className={styles.breadcrumbLink}>
              {crumb.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

