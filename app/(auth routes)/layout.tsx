import React from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
