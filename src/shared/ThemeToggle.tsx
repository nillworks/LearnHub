"use client";

import { Moon, Sun } from "@/shared/Icons";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-xl border border-border dark:border-secondary text-text-secondary transition-all duration-300 hover:text-primary-dark dark:hover:text-primary hover:bg-primary-light dark:hover:bg-secondary flex items-center justify-center shrink-0 group hover:-translate-y-0.5 active:translate-y-0"
      aria-label="Toggle theme"
    >
      <Sun size={20} className="hidden dark:block transition-transform duration-500 group-hover:rotate-45 group-hover:scale-110" aria-hidden="true" />
      <Moon size={20} className="block dark:hidden transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110" aria-hidden="true" />
    </button>
  );
}
