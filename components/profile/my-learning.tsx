"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { courses } from "@/lib/course/registry";
import type { Course, Phrase } from "@/lib/course/types";
import {
  nextActionFor,
  phrasesFromCompletedLessons,
  savedPhrasesOf,
  useLearning,
} from "@/lib/profile/use-learning";
import type { PlaybackSpeed } from "@/lib/profile/types";
import { MissionCallout } from "@/components/mission/mission-callout";
import { missionForCourse } from "@/lib/mission/registry";
import { PracticeReview } from "./practice-review";

const courseHref: Record<string, string> = {
  russian: "/learn/russian",
  mandarin: "/learn/mandarin",
};

export function MyLearning() {
  const learning = useLearning(courses);
  const [reviewCourseId, setReviewCourseId] = useState(courses[0].id);
  const [announcement, setAnnouncement] = useState("");

  const reviewSectionRef = useRef<HTMLElement>(null);
  /**
   * Bumped only when a language summary's "Review saved phrases" button is
   * pressed. Nothing else moves the viewport — not the first render, not a
   * progress change, not removing a phrase, and not the language tabs inside
   * the review section itself.
   */
  const [scrollRequest, setScrollRequest] = useState(0);

  /**
   * Runs after React has committed the new review language, so the section is
   * already showing the right course by the time it scrolls into view. That
   * ordering comes from the effect itself rather than from a timeout, which is
   * what keeps the behaviour from being intermittent.
   */
  useEffect(() => {
    if (scrollRequest === 0) return;
    const section = reviewSectionRef.current;
    if (!section) return;

    const prefersReducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    section.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
    // preventScroll keeps focus from fighting the smooth scroll it just started.
    section.focus({ preventScroll: true });
  }, [scrollRequest]);

  const handleReviewFromSummary = useCallback((course: Course) => {
    setReviewCourseId(course.id);
    setScrollRequest((n) => n + 1);
  }, []);

  const reviewCourse =
    courses.find((c) => c.id === reviewCourseId) ?? courses[0];

  const reviewPhrases = useMemo(
    () => savedPhrasesOf(reviewCourse, learning.savedPhraseIds(reviewCourse.id)),
    [reviewCourse, learning],
  );

  const handleRemove = useCallback(
    (phrase: Phrase) => {
      learning.removeSavedPhrase(reviewCourse.id, phrase.id);
      setAnnouncement(
        `Removed ${phrase.english} from your ${reviewCourse.shortName} practice list.`,
      );
    },
    [learning, reviewCourse],
  );

  const handleResetCourse = useCallback(
    (course: Course) => {
      const ok = window.confirm(
        `Reset ${course.shortName}?\n\nThis clears your ${course.shortName} lesson progress and your saved ${course.shortName} phrases on this browser. Your other language is not affected. This cannot be undone.`,
      );
      if (!ok) return;
      learning.resetCourse(course);
      setAnnouncement(
        `${course.shortName} progress and saved phrases cleared. Your other language was not affected.`,
      );
    },
    [learning],
  );

  const handleClearAll = useCallback(() => {
    const ok = window.confirm(
      "Clear all learning data?\n\nThis removes your lesson progress, saved phrases, and playback preference for every language on this browser. Nothing else stored by your browser is touched. This cannot be undone.",
    );
    if (!ok) return;
    const removed = learning.clearEverything(courses);
    setAnnouncement(
      removed.length > 0
        ? "All Languages After 60 learning data cleared from this browser."
        : "There was no learning data stored on this browser.",
    );
  }, [learning]);

  const handleSpeed = useCallback(
    (speed: PlaybackSpeed) => {
      learning.setPlaybackSpeed(speed);
      setAnnouncement(
        speed === "slow"
          ? "Playback speed set to slow."
          : "Playback speed set to normal.",
      );
    },
    [learning],
  );

  const lastCourse = learning.lastPracticed
    ? courses.find((c) => c.id === learning.lastPracticed?.courseId)
    : undefined;

  const loading = learning.status === "loading";

  return (
    <div className="shell-narrow py-12 sm:py-14">
      <header className="max-w-2xl">
        <p className="eyebrow">Your workspace</p>
        <h1 className="mt-2 font-display text-3xl leading-tight text-ink-900 sm:text-4xl">
          My Learning
        </h1>
        <p className="mt-3 text-lg text-muted-700">
          Continue where you left off, review phrases you want to practice, and
          choose what comes next.
        </p>
      </header>

      {/* Storage reality, stated plainly rather than buried. */}
      <p className="mt-6 max-w-2xl rounded-lg border border-line bg-surface-tint px-4 py-3 text-[0.97rem] text-muted-700">
        No account required. Your learning progress and preferences are stored
        only in this browser. Clearing browser data or changing devices may
        remove them.
      </p>

      {learning.status === "unavailable" ? (
        <p className="mt-4 max-w-2xl rounded-lg border border-caution-700/25 bg-caution-50 px-4 py-3 text-[0.97rem] text-caution-700">
          This browser is not allowing pages to save data — often the case in
          private windows or with site data blocked. You can still use every
          lesson, but progress and saved phrases will not be remembered after
          you close the tab.
        </p>
      ) : null}

      {loading ? (
        <p className="mt-8 text-muted-600" role="status">
          Loading your learning from this browser…
        </p>
      ) : (
        <>
          {lastCourse ? (
            <p className="mt-8 text-lg text-ink-800">
              Last practiced:{" "}
              <strong className="font-semibold">{lastCourse.shortName}</strong>.{" "}
              <Link href={courseHref[lastCourse.id]} className="link-inline">
                Continue {lastCourse.shortName}
              </Link>
            </p>
          ) : (
            <p className="mt-8 text-lg text-ink-800">
              Nothing practiced on this browser yet. Pick a language below and
              start with Lesson 1.
            </p>
          )}

          {/* Course summaries */}
          <section aria-labelledby="courses-heading" className="mt-10">
            <h2
              id="courses-heading"
              className="font-display text-2xl text-ink-900"
            >
              Your languages
            </h2>
            <div className="mt-5 space-y-5">
              {courses.map((course) => (
                <CourseSummary
                  key={course.id}
                  course={course}
                  completedLessons={
                    learning.progressFor(course.id).completedLessons
                  }
                  savedCount={
                    savedPhrasesOf(course, learning.savedPhraseIds(course.id))
                      .length
                  }
                  onReset={() => handleResetCourse(course)}
                  onReview={() => handleReviewFromSummary(course)}
                />
              ))}
            </div>
          </section>

          {/* Review */}
          <section
            ref={reviewSectionRef}
            tabIndex={-1}
            aria-labelledby="review-heading"
            className="focus-landmark mt-12 scroll-mt-24"
          >
            <h2
              id="review-heading"
              className="font-display text-2xl text-ink-900"
            >
              Practice your saved phrases
            </h2>
            <p className="mt-2 text-muted-700">
              Only phrases you marked <strong>Practice again</strong> appear
              here.
            </p>

            <div
              role="group"
              aria-label="Choose a language to review"
              className="mt-5 flex flex-wrap gap-2"
            >
              {courses.map((course) => {
                const active = course.id === reviewCourseId;
                const count = savedPhrasesOf(
                  course,
                  learning.savedPhraseIds(course.id),
                ).length;
                return (
                  <button
                    key={course.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setReviewCourseId(course.id)}
                    className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition-colors ${
                      active
                        ? "border-brand-600 bg-brand-50 text-brand-800"
                        : "border-line bg-surface-raised text-muted-700 hover:border-brand-400"
                    }`}
                  >
                    <span aria-hidden="true">{active ? "●" : "○"}</span>
                    {course.shortName} ({count})
                  </button>
                );
              })}
            </div>

            <div className="mt-5">
              <PracticeReview
                course={reviewCourse}
                phrases={reviewPhrases}
                playbackSpeed={learning.playbackSpeed}
                onRemove={handleRemove}
                onPractised={() => learning.recordPractice(reviewCourse.id)}
              />
            </div>
          </section>

          {/* Playback preference */}
          <section aria-labelledby="playback-heading" className="mt-12">
            <h2
              id="playback-heading"
              className="font-display text-2xl text-ink-900"
            >
              Playback speed
            </h2>
            <p className="mt-2 text-muted-700">
              Applies to Russian and Mandarin playback everywhere on the site.
            </p>
            <div
              role="radiogroup"
              aria-labelledby="playback-heading"
              className="mt-4 flex flex-wrap gap-2"
            >
              {(
                [
                  ["normal", "Normal", "The pace the lessons have always used"],
                  ["slow", "Slow", "Noticeably slower, for hearing each sound"],
                ] as const
              ).map(([value, label, hint]) => {
                const active = learning.playbackSpeed === value;
                return (
                  <button
                    key={value}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => handleSpeed(value)}
                    className={`rounded-lg border px-4 py-3 text-left transition-colors ${
                      active
                        ? "border-brand-600 bg-brand-50"
                        : "border-line bg-surface-raised hover:border-brand-400"
                    }`}
                  >
                    <span className="flex items-center gap-2 font-semibold text-ink-900">
                      <span aria-hidden="true">{active ? "●" : "○"}</span>
                      {label}
                    </span>
                    <span className="mt-0.5 block text-sm text-muted-600">
                      {hint}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Reset */}
          <section aria-labelledby="reset-heading" className="mt-12">
            <h2 id="reset-heading" className="font-display text-2xl text-ink-900">
              Start over
            </h2>
            <p className="mt-2 text-muted-700">
              Each control asks you to confirm first. Resetting one language
              leaves the other untouched.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {courses.map((course) => (
                <button
                  key={course.id}
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => handleResetCourse(course)}
                >
                  Reset {course.shortName} progress
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={handleClearAll}
              className="mt-2 inline-block py-2.5 text-sm text-muted-600 underline underline-offset-4 hover:text-ink-900"
            >
              Clear all learning data on this browser
            </button>
            <p className="mt-3 text-sm text-muted-500">
              This removes only what Languages After 60 saved. Anything else
              your browser stores is left alone.
            </p>
          </section>
        </>
      )}

      <p aria-live="polite" className="sr-only">
        {announcement}
      </p>
    </div>
  );
}

function CourseSummary({
  course,
  completedLessons,
  savedCount,
  onReset,
  onReview,
}: {
  course: Course;
  completedLessons: string[];
  savedCount: number;
  onReset: () => void;
  onReview: () => void;
}) {
  const total = course.lessons.length;
  const done = course.lessons.filter((l) =>
    completedLessons.includes(l.slug),
  ).length;
  const introduced = phrasesFromCompletedLessons(course, completedLessons).length;
  const next = nextActionFor(course, completedLessons);
  const href = courseHref[course.id];
  const mission = missionForCourse(course.id);

  return (
    <article className="card p-5 sm:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-display text-xl text-ink-900">{course.name}</h3>
        <p className="text-sm text-muted-600">
          {done} of {total} lessons complete
        </p>
      </div>

      {/* Lesson ticks: a shape per lesson, so progress is never colour-only. */}
      <ol className="mt-3 flex flex-wrap gap-2" aria-label={`${course.shortName} lessons`}>
        {course.lessons.map((lesson) => {
          const isDone = completedLessons.includes(lesson.slug);
          return (
            <li
              key={lesson.slug}
              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${
                isDone
                  ? "border-success-700/30 bg-success-50 text-success-700"
                  : "border-line bg-surface-tint text-muted-600"
              }`}
            >
              <span aria-hidden="true">{isDone ? "✓" : lesson.number}</span>
              <span>
                {lesson.title}
                <span className="sr-only">
                  {isDone ? " — completed" : " — not yet complete"}
                </span>
              </span>
            </li>
          );
        })}
      </ol>

      <dl className="mt-4 grid gap-3 sm:grid-cols-2">
        <div>
          <dt className="text-sm text-muted-600">
            Phrases introduced, available for review
          </dt>
          <dd className="font-display text-lg text-ink-900">{introduced}</dd>
        </div>
        <div>
          <dt className="text-sm text-muted-600">Saved for practice</dt>
          <dd className="font-display text-lg text-ink-900">{savedCount}</dd>
        </div>
      </dl>

      <p className="mt-4 border-t border-line-soft pt-4 text-ink-800">
        <span className="font-semibold">Next: </span>
        {next.kind === "lesson"
          ? `${done === 0 ? "Start" : "Continue to"} Lesson ${next.lesson.number} — ${next.lesson.title}`
          : "Review what you know"}
      </p>

      <div className="mt-4 flex flex-wrap gap-3">
        <Link href={href} className="btn btn-primary">
          {next.kind === "lesson"
            ? done === 0
              ? `Start ${course.shortName}`
              : `Continue ${course.shortName}`
            : `Open ${course.shortName}`}
          <span aria-hidden="true">→</span>
        </Link>
        <button type="button" className="btn btn-secondary" onClick={onReview}>
          Review saved phrases
        </button>
        {/* A secondary button rather than a text link: it is a real action and
            should look like one, while staying quieter than the primary
            Start/Continue call to action beside it. */}
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onReset}
        >
          Reset {course.shortName}
        </button>
      </div>

      {mission ? (
        <div className="mt-4">
          <MissionCallout mission={mission} courseComplete={done === total} />
        </div>
      ) : null}
    </article>
  );
}
