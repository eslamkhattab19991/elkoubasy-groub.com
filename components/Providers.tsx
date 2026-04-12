'use client';

import { LanguageProvider, useLanguage } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";

function RootLayoutContent({ children }: { children: React.ReactNode }) {
  const { dir, lang } = useLanguage();
  
  return (
    <div lang={lang} dir={dir} className="h-full min-h-full flex flex-col p-0 m-0 w-full contents">
      {children}
    </div>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
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
