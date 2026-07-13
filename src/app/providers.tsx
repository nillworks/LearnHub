"use client";

import { ThemeProvider } from "@/components/shared/ThemeProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
}
