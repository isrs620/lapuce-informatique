import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/components/SiteChrome";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LaPuce Informatique — Réparation iPhone, Samsung, MacBook, PS5 Montréal",
  description:
    "LaPuce Informatique — Spécialiste en réparation d'iPhone, Samsung, iPad, MacBook, Apple Watch et consoles PS5/Xbox à Saint-Laurent, Montréal. Diagnostic gratuit. Réparation rapide et garantie.",
  keywords:
    "réparation iPhone Montréal, réparation Samsung, réparation MacBook, réparation PS5, LaPuce Informatique, Saint-Laurent, diagnostic téléphone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={`${poppins.variable} font-sans antialiased`}>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
