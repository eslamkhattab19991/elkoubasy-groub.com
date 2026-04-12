import type { Metadata } from 'next';
import { Inter, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: 'ElKoubasy Group | Premium Production Solutions',
  description: 'ElKoubasy Group delivers world-class industrial, agricultural, and commercial products with unmatched quality since 1999.',
  keywords: 'ElKoubasy, Industry, Manufacturing, Egypt, Global Export, Production Quality',
  openGraph: {
    title: 'ElKoubasy Group',
    description: 'World-class industrial and commercial products since 1999.',
    url: 'https://elkoubasy-groub-com.vercel.app',
    siteName: 'ElKoubasy Group',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${inter.variable} ${ibmPlexArabic.variable} h-full antialiased transition-colors duration-300`}
    >
      <body className="min-h-full flex flex-col selection:bg-brand-green selection:text-white">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
