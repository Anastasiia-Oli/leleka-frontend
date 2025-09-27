import type { Metadata } from "next";
import { Comfortaa, Lato } from "next/font/google";
import "./globals.css";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import Header from "@/components/Header/Header";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import SideBar from "@/components/SideBar/SideBar";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-family",
});

const comfortaa = Comfortaa({
  subsets: ["latin", "cyrillic"],
  weight: ["700"],
  variable: "--second-family",
});

export const metadata: Metadata = {
  title: "Leleka",
  description: "Track your pregnancy journey with Leleka",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body className={`${lato.variable} ${comfortaa.variable}`}>
        <TanStackProvider>
          <AuthProvider>
            <Header />
            {children}
            {modal}
          </AuthProvider>
        </TanStackProvider>
        <ToastContainer position="top-right" autoClose={3000} />
      </body>
    </html>
  );
}

// change language in this file
