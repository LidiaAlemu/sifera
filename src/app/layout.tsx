import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProviderWrapper from "@/components/AuthProviderWrapper";
import TailwindConfig from "@/components/TailwindConfig";
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
          rel="stylesheet"
        />
        {/* Tailwind Play CDN */}
        <script src="https://cdn.tailwindcss.com"></script>
        <TailwindConfig />
      </head>
      <body className="antialiased">
        <AuthProviderWrapper>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </AuthProviderWrapper>
      </body>
    </html>
  );
}