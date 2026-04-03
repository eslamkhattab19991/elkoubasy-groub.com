'use client';

import { Inter, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

function RootLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { dir, lang } = useLanguage();
  
  return (
    <html
      lang={lang}
      dir={dir}
      className={`${inter.variable} ${ibmPlexArabic.variable} h-full antialiased transition-colors duration-300`}
    >
      <body className="min-h-full flex flex-col selection:bg-brand-green selection:text-white">
        {children}
      </body>
    </html>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <RootLayoutContent>
          {children}
        </RootLayoutContent>
      </LanguageProvider>
    </ThemeProvider>
  );
}
