import type { Metadata } from "next";
import {Comfortaa, Lato} from "next/font/google";
import "./globals.css";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import Header from "@/components/Header/Header";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import SideBar from "@/components/SideBar/SideBar";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-family"
});

const comfortaa = Comfortaa({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--second-family"
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lato.variable} ${comfortaa.variable}`}>
        <TanStackProvider>
          <Header />
          <main>
            <SideBar />
            <div className="content">
              <Breadcrumbs />
              {children}
            </div>
          </main>
        </TanStackProvider>
      </body>
    </html>
  );
}
