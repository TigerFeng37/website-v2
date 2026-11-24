import { useLayoutEffect } from "react";

/**
 * Temporary: v2 pages were drawn for a dark ground. While one is mounted,
 * pin the document to the dark tokens so it reads correctly in the v3 shell.
 * Removed once every page is rebuilt.
 */
export default function useLegacyDark() {
  useLayoutEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-legacy-dark", "");
    return () => root.removeAttribute("data-legacy-dark");
  }, []);
}
