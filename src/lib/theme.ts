export const modes = ["light", "dark", "night"] as const;
export type ThemeMode = (typeof modes)[number];

export function applyMode(m: ThemeMode) {
  if (typeof document === "undefined") return;
  const el = document.documentElement;
  el.classList.toggle("dark", m !== "light");
  el.classList.toggle("night", m === "night");
}

export function getSavedMode(): ThemeMode {
  if (typeof window === "undefined") return "light";
  const saved = localStorage.getItem("theme-mode") as ThemeMode | null;
  if (saved && modes.includes(saved)) return saved;
  return "light";
}

export function setSavedMode(m: ThemeMode) {
  if (typeof window === "undefined") return;
  localStorage.setItem("theme-mode", m);
  applyMode(m);
}
