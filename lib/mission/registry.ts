import { getCourseById } from "@/lib/course/registry";
import type { Course, Phrase } from "@/lib/course/types";
import { mandarinMission1 } from "./mandarin";
import { russianMission1 } from "./russian";
import type { Mission } from "./types";

export const missions: Mission[] = [russianMission1, mandarinMission1];

/** Look a phrase up across every lesson in a course. */
export function findPhrase(course: Course, phraseId: string): Phrase | undefined {
  for (const lesson of course.lessons) {
    const phrase = lesson.phrases.find((p) => p.id === phraseId);
    if (phrase) return phrase;
  }
  return undefined;
}

/**
 * Resolve a phrase id, or throw.
 *
 * Missions hold ids rather than copies, so a renamed or deleted phrase would
 * otherwise fail silently at runtime. Throwing here means the mission pages —
 * which are prerendered — fail the build instead, before anyone sees a broken
 * step.
 */
export function requirePhrase(course: Course, phraseId: string): Phrase {
  const phrase = findPhrase(course, phraseId);
  if (!phrase) {
    throw new Error(
      `Mission references unknown phrase "${phraseId}" in course "${course.id}".`,
    );
  }
  return phrase;
}

export function getMission(
  courseId: string,
  slug: string,
): Mission | undefined {
  return missions.find((m) => m.courseId === courseId && m.slug === slug);
}

export function missionForCourse(courseId: string): Mission | undefined {
  return missions.find((m) => m.courseId === courseId);
}

/** Where a mission lives. */
export function missionHref(mission: Mission): string {
  return `/practice/${mission.courseId}/${mission.slug}`;
}

/**
 * Verify every mission at module load: the course must exist, and every phrase
 * id in every step — speaker, answer, and each choice — must resolve. The
 * answer must also be among the choices.
 */
function validateMissions() {
  for (const mission of missions) {
    const course = getCourseById(mission.courseId);
    if (!course) {
      throw new Error(`Mission "${mission.id}" references unknown course.`);
    }
    for (const step of mission.steps) {
      if (step.speakerPhraseId) requirePhrase(course, step.speakerPhraseId);
      requirePhrase(course, step.answerPhraseId);
      step.choicePhraseIds.forEach((id) => requirePhrase(course, id));
      if (!step.choicePhraseIds.includes(step.answerPhraseId)) {
        throw new Error(
          `Mission "${mission.id}" step "${step.id}" does not offer its own answer as a choice.`,
        );
      }
    }
  }
}

validateMissions();
