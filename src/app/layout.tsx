import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
