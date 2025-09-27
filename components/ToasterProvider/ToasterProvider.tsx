"use client";

import { Toaster } from "react-hot-toast";

export default function ToasterProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3500,
        style: {
          fontFamily: "var(--font-family)",
          fontSize: "14px",
          lineHeight: "150%",
          color: "var(--black)",
        },
        success: { iconTheme: { primary: "#10b981", secondary: "#fff" } },
        error:   { iconTheme: { primary: "#c60000", secondary: "#fff" } },
      }}
      containerStyle={{ zIndex: 999999 }}
    />
  );
}
