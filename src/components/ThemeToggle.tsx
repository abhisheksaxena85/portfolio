"use client";

import { Moon, Sun } from "./icons";

// Icon visibility is handled in CSS off [data-theme], so server and client
// markup always match and there's no hydration flicker.
export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage unavailable (private mode / blocked) — theme still applies for this visit.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle colour theme"
      className="grid size-9 place-items-center rounded-full border border-line text-muted transition-colors hover:border-fg/30 hover:text-fg"
    >
      <Moon className="icon-moon" />
      <Sun className="icon-sun" />
    </button>
  );
}
