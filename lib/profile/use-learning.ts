"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Course, Lesson } from "@/lib/course/types";
import { readProgress } from "@/lib/course/progress";
import {
  clearAllLearningData,
  clearCourseData,
  isStorageWritable,
  notifyChange,
  PROFILE_CHANGE_EVENT,
  PROFILE_STORAGE_KEY,
  readProfile,
  writeProfile,
} from "./storage";
import { emptyProfile, type PlaybackSpeed, type Profile, type StorageStatus } from "./types";

/**
 * The single hook the UI uses for My Learning state.
 *
 * Nothing outside this module touches localStorage directly, so swapping the
 * storage layer later means changing one file rather than every component.
 *
 * All reads happen after mount. The server render and the first client render
 * both see `status: "loading"` with empty data, which is what keeps the static
 * export free of hydration mismatches — the page never renders stored progress
 * as though it were authoritative before it has actually been read.
 */

export type CourseProgress = {
  completedLessons: string[];
};

export function useLearning(courses: Course[]) {
  const [status, setStatus] = useState<StorageStatus>("loading");
  const [profile, setProfile] = useState<Profile>(emptyProfile);
  const [progress, setProgress] = useState<Record<string, CourseProgress>>({});
  const profileRef = useRef<Profile>(emptyProfile);

  // Courses are module-level constants; depending on the id list keeps this
  // stable even if a caller passes a fresh array each render.
  const courseKey = courses.map((c) => `${c.id}:${c.storageKey}`).join("|");

  const refresh = useCallback(() => {
    const next = readProfile();
    profileRef.current = next;
    setProfile(next);
    const byCourse: Record<string, CourseProgress> = {};
    for (const entry of courseKey.split("|")) {
      const [id, storageKey] = entry.split(":");
      if (!id || !storageKey) continue;
      byCourse[id] = { completedLessons: readProgress(storageKey).completedLessons };
    }
    setProgress(byCourse);
  }, [courseKey]);

  useEffect(() => {
    setStatus(isStorageWritable() ? "ready" : "unavailable");
    refresh();

    const onLocalChange = () => refresh();
    const onStorage = (event: StorageEvent) => {
      // Another tab on this origin changed something we own.
      if (
        event.key === null ||
        event.key === PROFILE_STORAGE_KEY ||
        courseKey.includes(`:${event.key}`)
      ) {
        refresh();
      }
    };

    window.addEventListener(PROFILE_CHANGE_EVENT, onLocalChange);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(PROFILE_CHANGE_EVENT, onLocalChange);
      window.removeEventListener("storage", onStorage);
    };
  }, [refresh, courseKey]);

  const update = useCallback((mutate: (current: Profile) => Profile) => {
    const next = mutate(profileRef.current);
    profileRef.current = next;
    setProfile(next);
    const ok = writeProfile(next);
    if (!ok) setStatus("unavailable");
  }, []);

  /* --------------------------------------------------------------------- */

  const setPlaybackSpeed = useCallback(
    (playbackSpeed: PlaybackSpeed) => {
      update((current) => ({ ...current, playbackSpeed }));
    },
    [update],
  );

  const isSaved = useCallback(
    (courseId: string, phraseId: string) =>
      (profile.savedPhrases[courseId] ?? []).includes(phraseId),
    [profile],
  );

  /** Toggle — never appends a duplicate. */
  const toggleSavedPhrase = useCallback(
    (courseId: string, phraseId: string) => {
      update((current) => {
        const existing = current.savedPhrases[courseId] ?? [];
        const next = existing.includes(phraseId)
          ? existing.filter((id) => id !== phraseId)
          : [...existing, phraseId];
        return {
          ...current,
          savedPhrases: { ...current.savedPhrases, [courseId]: next },
        };
      });
    },
    [update],
  );

  const removeSavedPhrase = useCallback(
    (courseId: string, phraseId: string) => {
      update((current) => {
        const existing = current.savedPhrases[courseId] ?? [];
        return {
          ...current,
          savedPhrases: {
            ...current.savedPhrases,
            [courseId]: existing.filter((id) => id !== phraseId),
          },
        };
      });
    },
    [update],
  );

  /** Called only on deliberate learning activity, never on render. */
  const recordPractice = useCallback(
    (courseId: string) => {
      update((current) => ({
        ...current,
        lastPracticed: { courseId, at: new Date().toISOString() },
      }));
    },
    [update],
  );

  const resetCourse = useCallback(
    (course: Course) => {
      clearCourseData(course);
      refresh();
    },
    [refresh],
  );

  const clearEverything = useCallback(
    (allCourses: Course[]) => {
      const removed = clearAllLearningData(allCourses);
      profileRef.current = emptyProfile;
      setProfile(emptyProfile);
      refresh();
      return removed;
    },
    [refresh],
  );

  const savedPhraseIds = useCallback(
    (courseId: string) => profile.savedPhrases[courseId] ?? [],
    [profile],
  );

  const progressFor = useCallback(
    (courseId: string): CourseProgress =>
      progress[courseId] ?? { completedLessons: [] },
    [progress],
  );

  return {
    status,
    profile,
    playbackSpeed: profile.playbackSpeed,
    lastPracticed: profile.lastPracticed,
    progressFor,
    savedPhraseIds,
    isSaved,
    setPlaybackSpeed,
    toggleSavedPhrase,
    removeSavedPhrase,
    recordPractice,
    resetCourse,
    clearEverything,
    refresh,
    notifyChange,
  };
}

/* -------------------------------------------------------------------------
   Derived helpers — pure, so they are easy to reason about and reuse
   ---------------------------------------------------------------------- */

/** Completed lessons in course order, ignoring ids the course no longer has. */
export function completedLessonsOf(
  course: Course,
  completedLessons: string[],
): Lesson[] {
  return course.lessons.filter((lesson) => completedLessons.includes(lesson.slug));
}

/**
 * The next thing to do, derived from real progress.
 *
 * Lesson order comes from the course itself rather than from lesson numbering,
 * and unknown or out-of-order stored ids simply do not match — so malformed
 * progress recovers to the first genuinely incomplete lesson.
 */
export function nextActionFor(
  course: Course,
  completedLessons: string[],
): { kind: "lesson"; lesson: Lesson } | { kind: "review" } {
  const next = course.lessons.find(
    (lesson) => !completedLessons.includes(lesson.slug),
  );
  return next ? { kind: "lesson", lesson: next } : { kind: "review" };
}

/** Phrases introduced by lessons the learner has actually completed. */
export function phrasesFromCompletedLessons(
  course: Course,
  completedLessons: string[],
) {
  return completedLessonsOf(course, completedLessons).flatMap(
    (lesson) => lesson.phrases,
  );
}

/**
 * Saved phrases resolved against current course content, in course order.
 * Ids for phrases that no longer exist are skipped rather than rendered blank.
 */
export function savedPhrasesOf(course: Course, savedIds: string[]) {
  const wanted = new Set(savedIds);
  return course.lessons
    .flatMap((lesson) => lesson.phrases)
    .filter((phrase) => wanted.has(phrase.id));
}
