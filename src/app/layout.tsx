import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProviderWrapper from "@/components/AuthProviderWrapper";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Sifera",
  description:
    "A quiet book café and alternative space where coffee, books, and community meet.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${cormorantGaramond.variable} ${inter.variable} antialiased`}
      >
        <AuthProviderWrapper>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </AuthProviderWrapper>
      </body>
    </html>
  );
}