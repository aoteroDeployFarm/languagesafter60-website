/**
 * Course progress, persisted in this browser only.
 *
 * There is no account and no server. Every read and write is wrapped because
 * localStorage throws in private-mode and blocked-cookie configurations, and a
 * storage failure must never take the lesson interface down with it.
 */

const STORAGE_KEY = "la60.russian.progress.v1";

export type Progress = {
  completedLessons: string[];
};

export const emptyProgress: Progress = { completedLessons: [] };

function isProgress(value: unknown): value is Progress {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as { completedLessons?: unknown };
  return (
    Array.isArray(candidate.completedLessons) &&
    candidate.completedLessons.every((item) => typeof item === "string")
  );
}

export function readProgress(): Progress {
  if (typeof window === "undefined") return emptyProgress;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyProgress;
    const parsed: unknown = JSON.parse(raw);
    return isProgress(parsed) ? parsed : emptyProgress;
  } catch {
    return emptyProgress;
  }
}

export function writeProgress(progress: Progress): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Storage unavailable or full. Progress stays in memory for this visit.
  }
}

export function clearProgress(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Nothing further to do.
  }
}
