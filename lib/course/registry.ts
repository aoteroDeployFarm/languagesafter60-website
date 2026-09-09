import type { Course } from "./types";
import { mandarinCourse } from "./mandarin";
import { russianCourse } from "./russian";

/**
 * Every language course on the site, in the order they should be presented.
 *
 * My Learning iterates this rather than hard-coding two courses, and the
 * clear-all-data control derives the set of progress keys it owns from here —
 * so adding a third course later does not leave orphaned storage behind.
 */
export const courses: Course[] = [russianCourse, mandarinCourse];

export function getCourseById(id: string): Course | undefined {
  return courses.find((course) => course.id === id);
}
