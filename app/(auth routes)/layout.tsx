"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ToasterProvider from "@/components/ToasterProvider/ToasterProvider";

type Props = {
  children: React.ReactNode;
};

export default function PublicLayout({ children }: Props) {
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    router.refresh();
    setLoading(false);
  }, [router]);

  return (
    <>
      <ToasterProvider />
      {loading ? <div>Loading...</div> : children}
    </>
  );
}
