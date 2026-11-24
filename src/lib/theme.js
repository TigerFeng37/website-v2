import { useCallback, useSyncExternalStore } from "react";

// "system" follows prefers-color-scheme; "light"/"dark" are explicit choices.
// index.html applies the saved choice before first paint.
const KEY = "theme";
const listeners = new Set();

function read() {
  try {
    const t = localStorage.getItem(KEY);
    return t === "light" || t === "dark" ? t : "system";
  } catch {
    return "system";
  }
}

const CHROME = { light: "#F3F3F0", dark: "#141618" };

function apply(theme) {
  const root = document.documentElement;
  if (theme === "system") delete root.dataset.theme;
  else root.dataset.theme = theme;
  // Keep the browser chrome in step with an explicit choice.
  document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => {
    const scheme = meta.media.includes("dark") ? "dark" : "light";
    meta.content = CHROME[theme === "system" ? scheme : theme];
  });
}

export function setTheme(theme) {
  try {
    if (theme === "system") localStorage.removeItem(KEY);
    else localStorage.setItem(KEY, theme);
  } catch {
    /* private mode: the choice just won't persist */
  }
  apply(theme);
  listeners.forEach((fn) => fn());
}

export function useTheme() {
  const theme = useSyncExternalStore(
    (fn) => {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    read,
    () => "system"
  );
  return [theme, useCallback((t) => setTheme(t), [])];
}
