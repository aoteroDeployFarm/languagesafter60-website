/**
 * Course progress, persisted in this browser only.
 *
 * There is no account and no server. Every read and write is wrapped because
 * localStorage throws in private-mode and blocked-cookie configurations, and a
 * storage failure must never take the lesson interface down with it.
 *
 * Each course passes its own key, so Russian and Mandarin progress are stored
 * separately and can never overwrite or unlock one another.
 */

export type Progress = {
  completedLessons: string[];
};

export const emptyProgress: Progress = { completedLessons: [] };

/**
 * Anything in localStorage may have been hand-edited, truncated, or written by
 * an older version of the site, so stored values are validated rather than
 * trusted. Anything unexpected falls back to empty progress.
 */
function isProgress(value: unknown): value is Progress {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as { completedLessons?: unknown };
  return (
    Array.isArray(candidate.completedLessons) &&
    candidate.completedLessons.every((item) => typeof item === "string")
  );
}

export function readProgress(storageKey: string): Progress {
  if (typeof window === "undefined") return emptyProgress;
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return emptyProgress;
    const parsed: unknown = JSON.parse(raw);
    return isProgress(parsed) ? parsed : emptyProgress;
  } catch {
    return emptyProgress;
  }
}

export function writeProgress(storageKey: string, progress: Progress): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(storageKey, JSON.stringify(progress));
  } catch {
    // Storage unavailable or full. Progress stays in memory for this visit.
  }
}

export function clearProgress(storageKey: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(storageKey);
  } catch {
    // Nothing further to do.
  }
}
