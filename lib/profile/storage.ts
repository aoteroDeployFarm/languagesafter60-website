import type { Course } from "@/lib/course/types";
import { clearProgress } from "@/lib/course/progress";
import {
  emptyProfile,
  PROFILE_VERSION,
  type PlaybackSpeed,
  type Profile,
} from "./types";

/**
 * Reading and writing My Learning state.
 *
 * The two course-progress keys predate this feature and stay authoritative —
 * nothing here migrates, renames, or rewrites them. My Learning adds exactly
 * one key of its own.
 *
 * Every access is wrapped: localStorage throws outright in some private-mode
 * and blocked-cookie configurations, and a storage failure must never take the
 * page down with it.
 */

export const PROFILE_STORAGE_KEY = "la60.profile.v1";

/** Fired on same-tab writes. The cross-tab equivalent is the native `storage` event. */
export const PROFILE_CHANGE_EVENT = "la60:learningchange";

function getStorage(): Storage | null {
  if (typeof window === "undefined") return null;
  try {
    const storage = window.localStorage;
    if (!storage || typeof storage.getItem !== "function") return null;
    return storage;
  } catch {
    return null;
  }
}

/**
 * Whether local state can actually be persisted, tested by a real round trip.
 * Some browsers expose localStorage but throw on write.
 */
export function isStorageWritable(): boolean {
  const storage = getStorage();
  if (!storage) return false;
  try {
    const probe = "la60.probe";
    storage.setItem(probe, "1");
    storage.removeItem(probe);
    return true;
  } catch {
    return false;
  }
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((v) => typeof v === "string");
}

/**
 * Coerce whatever is in storage into a usable Profile.
 *
 * Invalid fields are ignored individually rather than throwing the whole record
 * away — a corrupt playbackSpeed should not cost the learner their saved
 * phrases. Unknown future versions fall back to defaults rather than being
 * reinterpreted or deleted.
 */
function parseProfile(raw: string | null): Profile {
  if (!raw) return emptyProfile;
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return emptyProfile;
  }
  if (typeof parsed !== "object" || parsed === null) return emptyProfile;

  const candidate = parsed as Partial<Profile> & Record<string, unknown>;

  // A newer version than this build understands: read nothing, write nothing,
  // and leave the stored value alone.
  if (
    typeof candidate.version === "number" &&
    candidate.version > PROFILE_VERSION
  ) {
    return emptyProfile;
  }

  const savedPhrases: Record<string, string[]> = {};
  if (
    typeof candidate.savedPhrases === "object" &&
    candidate.savedPhrases !== null
  ) {
    for (const [courseId, ids] of Object.entries(candidate.savedPhrases)) {
      if (typeof courseId === "string" && isStringArray(ids)) {
        savedPhrases[courseId] = [...new Set(ids)];
      }
    }
  }

  const playbackSpeed: PlaybackSpeed =
    candidate.playbackSpeed === "slow" ? "slow" : "normal";

  let lastPracticed: Profile["lastPracticed"] = null;
  const lp = candidate.lastPracticed;
  if (
    typeof lp === "object" &&
    lp !== null &&
    typeof (lp as { courseId?: unknown }).courseId === "string" &&
    typeof (lp as { at?: unknown }).at === "string"
  ) {
    lastPracticed = {
      courseId: (lp as { courseId: string }).courseId,
      at: (lp as { at: string }).at,
    };
  }

  return { version: PROFILE_VERSION, savedPhrases, playbackSpeed, lastPracticed };
}

export function readProfile(): Profile {
  const storage = getStorage();
  if (!storage) return emptyProfile;
  try {
    return parseProfile(storage.getItem(PROFILE_STORAGE_KEY));
  } catch {
    return emptyProfile;
  }
}

export function writeProfile(profile: Profile): boolean {
  const storage = getStorage();
  if (!storage) return false;
  try {
    storage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
    notifyChange();
    return true;
  } catch {
    return false;
  }
}

/** Let other components in this tab know local state moved. */
export function notifyChange(): void {
  if (typeof window === "undefined") return;
  try {
    window.dispatchEvent(new Event(PROFILE_CHANGE_EVENT));
  } catch {
    // Event construction is not worth failing over.
  }
}

/* -------------------------------------------------------------------------
   Destructive operations
   ---------------------------------------------------------------------- */

/**
 * Clear one course: its lesson progress and its saved phrases. The other
 * course, the playback preference, and everything owned by the rest of the
 * browser are left untouched.
 */
export function clearCourseData(course: Course): void {
  clearProgress(course.storageKey);
  const profile = readProfile();
  const savedPhrases = { ...profile.savedPhrases };
  delete savedPhrases[course.id];
  const lastPracticed =
    profile.lastPracticed?.courseId === course.id ? null : profile.lastPracticed;
  writeProfile({ ...profile, savedPhrases, lastPracticed });
  notifyChange();
}

/**
 * Remove every key Languages After 60 owns — and only those.
 *
 * Deliberately never `localStorage.clear()`: other pages on this origin, and
 * anything the browser stores for them, are none of this feature's business.
 */
export function clearAllLearningData(allCourses: Course[]): string[] {
  const storage = getStorage();
  const removed: string[] = [];
  if (!storage) return removed;
  const owned = [
    ...allCourses.map((course) => course.storageKey),
    PROFILE_STORAGE_KEY,
  ];
  for (const key of owned) {
    try {
      if (storage.getItem(key) !== null) removed.push(key);
      storage.removeItem(key);
    } catch {
      // Skip this key and keep going.
    }
  }
  notifyChange();
  return removed;
}
