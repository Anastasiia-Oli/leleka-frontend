// components/Breadcrumbs.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '../../app/(private routes)/profile/userProfile.module.css';

interface Breadcrumb {
    label: string;
    href: string;
}

const Breadcrumbs = () => {
    const pathname = usePathname();
    
    const generateBreadcrumbs = (): Breadcrumb[] => {
        const pathSegments = pathname
            .split('/')
            .filter(segment => segment.length > 0);

        const breadcrumbs: Breadcrumb[] = [{ label: 'Головна', href: '/' }];

        pathSegments.forEach((segment, index) => {
            const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
            const label = segment.charAt(0).toUpperCase() + segment.slice(1);
            breadcrumbs.push({ label, href: path });
        });

        return breadcrumbs;
    };

    const breadcrumbs = generateBreadcrumbs();

    return (
        <div className={styles.breadcrumb}>
            {breadcrumbs.map((crumb, index) => (
                <span key={crumb.href}>
                    {/* Ось як потрібно змінити компонент Link */}
                    <Link href={crumb.href} className={styles.breadcrumbLink}>
                        {crumb.label}
                    </Link>
                    {/* Кінець змін */}
                    
                    {index < breadcrumbs.length - 1 && <span className={styles.breadcrumbSeparator}>&gt;</span>}
                </span>
            ))}
        </div>
    );
};

export default Breadcrumbs;