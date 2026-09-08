"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Phrase } from "@/lib/russian/lessons";
import { lessons, totalLessons } from "@/lib/russian/lessons";
import {
  clearProgress,
  emptyProgress,
  readProgress,
  writeProgress,
} from "@/lib/russian/progress";
import { useRussianSpeech } from "@/lib/russian/use-speech";
import { KnowledgeCheck } from "./knowledge-check";
import { PhraseCard } from "./phrase-card";

export function RussianCourse() {
  const [completed, setCompleted] = useState<string[]>(
    emptyProgress.completedLessons,
  );
  /** Progress is read after mount so server and client markup agree. */
  const [hydrated, setHydrated] = useState(false);
  const [activeSlug, setActiveSlug] = useState(lessons[0].slug);
  const [statusMessage, setStatusMessage] = useState("");

  const speech = useRussianSpeech();

  useEffect(() => {
    const stored = readProgress();
    setCompleted(stored.completedLessons);
    // Open on the first lesson the learner has not finished.
    const nextUp = lessons.find(
      (lesson) => !stored.completedLessons.includes(lesson.slug),
    );
    if (nextUp) setActiveSlug(nextUp.slug);
    setHydrated(true);
  }, []);

  const activeLesson = useMemo(
    () => lessons.find((lesson) => lesson.slug === activeSlug) ?? lessons[0],
    [activeSlug],
  );

  const activeIndex = lessons.indexOf(activeLesson);
  const completedCount = hydrated ? completed.length : 0;
  const percent = Math.round((completedCount / totalLessons) * 100);

  const markComplete = useCallback(
    (slug: string) => {
      setCompleted((current) => {
        if (current.includes(slug)) return current;
        const next = [...current, slug];
        writeProgress({ completedLessons: next });
        return next;
      });
    },
    [],
  );

  const goToLesson = useCallback(
    (slug: string) => {
      speech.cancel();
      setActiveSlug(slug);
      setStatusMessage("");
    },
    [speech],
  );

  const handleSpeak = useCallback(
    (phrase: Phrase) => {
      speech.speak(phrase.cyrillic, phrase.id);
      setStatusMessage(`Playing: ${phrase.english}`);
    },
    [speech],
  );

  const handleStop = useCallback(() => {
    speech.cancel();
    setStatusMessage("Playback stopped");
  }, [speech]);

  const handleReset = useCallback(() => {
    clearProgress();
    setCompleted([]);
    setActiveSlug(lessons[0].slug);
    setStatusMessage("Course progress cleared");
  }, []);

  const previousLesson = activeIndex > 0 ? lessons[activeIndex - 1] : null;
  const nextLesson =
    activeIndex < lessons.length - 1 ? lessons[activeIndex + 1] : null;
  const courseFinished = hydrated && completedCount === totalLessons;

  return (
    <div className="grid gap-8 lg:grid-cols-[17rem_1fr] lg:gap-12">
      {/* Lesson rail + progress */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        <section aria-labelledby="course-progress-heading" className="card p-5">
          <h2
            id="course-progress-heading"
            className="font-display text-lg text-ink-900"
          >
            Course progress
          </h2>
          <p className="mt-1 text-sm text-muted-600">
            {hydrated
              ? `${completedCount} of ${totalLessons} lessons complete`
              : `${totalLessons} lessons`}
          </p>
          <div
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={totalLessons}
            aria-valuenow={completedCount}
            aria-valuetext={`${completedCount} of ${totalLessons} lessons complete`}
            aria-labelledby="course-progress-heading"
            className="mt-3 h-2 w-full overflow-hidden rounded-full bg-surface-sunken"
          >
            <div
              className="h-full rounded-full bg-brand-600 transition-[width] duration-500"
              style={{ width: `${percent}%` }}
            />
          </div>

          <nav aria-label="Lessons" className="mt-5">
            <ol className="space-y-2">
              {lessons.map((lesson) => {
                const isActive = lesson.slug === activeSlug;
                const isDone = hydrated && completed.includes(lesson.slug);
                return (
                  <li key={lesson.slug}>
                    <button
                      type="button"
                      onClick={() => goToLesson(lesson.slug)}
                      aria-current={isActive ? "step" : undefined}
                      className={`flex w-full items-start gap-3 rounded-lg border px-3 py-2.5 text-left transition-colors ${
                        isActive
                          ? "border-brand-600 bg-brand-50"
                          : "border-line bg-surface-raised hover:border-brand-400"
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                          isDone
                            ? "bg-success-700 text-white"
                            : isActive
                              ? "bg-brand-600 text-white"
                              : "bg-surface-sunken text-muted-600"
                        }`}
                      >
                        {isDone ? "✓" : lesson.number}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold text-ink-900">
                          Lesson {lesson.number}
                        </span>
                        <span className="block text-sm text-muted-600">
                          {lesson.title}
                        </span>
                        {isDone ? (
                          <span className="sr-only">Completed</span>
                        ) : null}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </nav>

          {hydrated && completedCount > 0 ? (
            <button
              type="button"
              onClick={handleReset}
              className="mt-4 text-sm text-muted-600 underline underline-offset-4 hover:text-ink-900"
            >
              Reset progress
            </button>
          ) : null}

          <p className="mt-4 border-t border-line-soft pt-4 text-xs text-muted-500">
            Progress is saved in this browser only. There is no account, and
            nothing is sent anywhere.
          </p>
        </section>
      </div>

      {/* Active lesson */}
      <div>
        <article aria-labelledby="lesson-heading">
          <p className="eyebrow">Lesson {activeLesson.number} of {totalLessons}</p>
          <h2
            id="lesson-heading"
            className="mt-2 font-display text-3xl leading-tight text-ink-900 sm:text-4xl"
          >
            {activeLesson.title}
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-muted-700">
            {activeLesson.summary}
          </p>

          <SpeechNotice status={speech.status} />

          <p className="mt-6 text-sm text-muted-600">
            <span className="font-semibold text-ink-800">Reading the guide:</span>{" "}
            syllables are separated by hyphens, and the{" "}
            <strong className="font-bold text-ink-900 underline decoration-accent-500 decoration-2 underline-offset-4">
              STRESSED
            </strong>{" "}
            syllable is capitalised. Russian stress changes how the surrounding
            vowels sound, so it is worth learning with the word.
          </p>

          <ul className="mt-6 space-y-4">
            {activeLesson.phrases.map((phrase) => (
              <PhraseCard
                key={phrase.id}
                phrase={phrase}
                canSpeak={speech.available}
                isSpeaking={speech.speakingId === phrase.id}
                onSpeak={handleSpeak}
                onStop={handleStop}
              />
            ))}
          </ul>

          <div className="mt-8">
            <KnowledgeCheck
              check={activeLesson.check}
              lessonSlug={activeLesson.slug}
              isComplete={hydrated && completed.includes(activeLesson.slug)}
              onPass={() => markComplete(activeLesson.slug)}
            />
          </div>

          <nav
            aria-label="Lesson navigation"
            className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6"
          >
            {previousLesson ? (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => goToLesson(previousLesson.slug)}
              >
                <span aria-hidden="true">←</span>
                <span>Lesson {previousLesson.number}</span>
              </button>
            ) : (
              <span />
            )}
            {nextLesson ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => goToLesson(nextLesson.slug)}
              >
                <span>
                  Lesson {nextLesson.number}: {nextLesson.title}
                </span>
                <span aria-hidden="true">→</span>
              </button>
            ) : null}
          </nav>

          {courseFinished ? (
            <p className="mt-6 rounded-lg border border-success-700/25 bg-success-50 px-4 py-3 text-success-700">
              All three lessons complete. More are being written as the study
              continues — the next set builds on these phrases rather than
              starting over.
            </p>
          ) : null}
        </article>

        {/* Single live region for playback and progress announcements. */}
        <p aria-live="polite" className="sr-only">
          {statusMessage}
        </p>
      </div>
    </div>
  );
}

function SpeechNotice({
  status,
}: {
  status: ReturnType<typeof useRussianSpeech>["status"];
}) {
  if (status === "checking" || status === "ready") return null;

  const message =
    status === "unsupported"
      ? "This browser does not support speech playback, so the Play buttons are turned off. The written pronunciation guides below still work on their own."
      : "This browser can speak, but no Russian voice is installed on this device, so playback may sound wrong. Adding a Russian voice in your system's speech settings fixes it.";

  return (
    <p className="mt-5 rounded-lg border border-caution-700/25 bg-caution-50 px-4 py-3 text-[0.97rem] text-caution-700">
      {message}
    </p>
  );
}
