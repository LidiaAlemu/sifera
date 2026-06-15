import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}