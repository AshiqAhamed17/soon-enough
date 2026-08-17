"use client";

import { useLayoutEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

function readTheme(): "light" | "dark" {
  try {
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || stored === "light") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  } catch {
    return "light";
  }
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useLayoutEffect(() => {
    // Re-applies the theme the blocking script in the root layout already set
    // before hydration — also guards against React Strict Mode's dev-only
    // remount, which clears attributes on <html> that aren't managed by JSX.
    const current = readTheme();
    document.documentElement.setAttribute("data-theme", current);
    setTheme(current);
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // localStorage unavailable (private browsing, etc.) — theme still
      // applies for this session, it just won't persist across visits.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className={`text-text-secondary transition-colors hover:text-text ${className}`}
    >
      {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  );
}
