"use client";

// import type { Metadata } from "next";
import { Comfortaa } from "next/font/google";
// import { appWithTranslation } from "next-i18next";
import "./globals.css";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import AuthProvider from "@/components/AuthProvider/AuthProvider";
import { lato } from "./fonts";
import ConfirmationModal from "@/components/ConfirmationModal/ConfirmationModal";
import { useModalStore } from "@/lib/store/modalStore";

const comfortaa = Comfortaa({
  subsets: ["latin", "cyrillic"],
  weight: ["700"],
  variable: "--second-family",
});

// export const metadata: Metadata = {
//   title: "Leleka",
//   description: "Track your pregnancy journey with Leleka",
//   icons: {
//     icon: "/favicon.svg",
//   },
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isLogoutModalOpen, onConfirmCallback, closeLogoutModal } =
    useModalStore();

  return (
    <html lang="uk">
      <body className={`${lato.variable} ${comfortaa.variable}`}>
        <TanStackProvider>
          <AuthProvider>
            {children}
            <ConfirmationModal
              title="Ви точно хочете вийти?"
              isOpen={isLogoutModalOpen}
              onClose={closeLogoutModal}
              onConfirm={async () => {
                if (onConfirmCallback) await onConfirmCallback();
                closeLogoutModal();
              }}
            />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}

// change language in this file
// export default appWithTranslation(RootLayout);

// using in components example
// "use client";

// import { useTranslation } from 'react-i18next';

// export default function Example() {
//   const { t } = useTranslation('translation');

//   return (
//     <div>
//       <h1>{t('welcome')}</h1>
//       <p>{t('description')}</p>
//     </div>
//   );
// }
