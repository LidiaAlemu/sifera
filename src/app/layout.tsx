import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProviderWrapper from "@/components/AuthProviderWrapper";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sifera - Quiet Book Café & Community Space",
  description:
    "A luxurious quiet book café where exceptional coffee, curated books, and vibrant community converge. Experience a sanctuary for readers, writers, and coffee enthusiasts.",
  keywords: "café, book café, coffee shop, books, community, quiet space",
  openGraph: {
    title: "Sifera - Quiet Book Café & Community Space",
    description: "A luxurious quiet book café where exceptional coffee, curated books, and vibrant community converge.",
    type: "website",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-background">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
          rel="stylesheet"
        />
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
