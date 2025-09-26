"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header/Header";

export default function HeaderWrapper() {
  const pathname = usePathname();
  const shouldShowHeader = pathname.startsWith("/auth/");


  if (shouldShowHeader) {
    return null;
  }

  return <Header />;
}
