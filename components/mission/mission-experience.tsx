"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { courses } from "@/lib/course/registry";
import type { Course, Phrase } from "@/lib/course/types";
import { pronunciationToText } from "@/lib/course/types";
import { useCourseSpeech } from "@/lib/course/use-speech";
import { PronunciationGuide } from "@/components/course/pronunciation-guide";
import { requirePhrase } from "@/lib/mission/registry";
import type { Mission } from "@/lib/mission/types";
import { useLearning } from "@/lib/profile/use-learning";
import { PLAYBACK_RATES } from "@/lib/profile/types";

/**
 * A guided, fully scripted conversation.
 *
 * Deterministic end to end: fixed steps, fixed choices, fixed order. There is
 * no model, no network call and no scoring — the only judgement is whether the
 * chosen phrase is the one the situation calls for.
 *
 * Mission progress lives in this component's memory and nowhere else. The
 * playback preference is read from My Learning, but nothing here writes to
 * storage: lesson completion, saved phrases and profile state are untouched.
 */
export function MissionExperience({
  mission,
  course,
}: {
  mission: Mission;
  course: Course;
}) {
  const totalSteps = mission.steps.length;
  const groupName = useId();

  const [stepIndex, setStepIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [result, setResult] = useState<"unanswered" | "correct" | "incorrect">(
    "unanswered",
  );
  const [completed, setCompleted] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  const stepRef = useRef<HTMLElement>(null);
  /**
   * Bumped only when the learner explicitly advances or restarts. Nothing else
   * moves the viewport — not the first render, not answering, not playback.
   */
  const [moveRequest, setMoveRequest] = useState(0);

  // Read-only: the mission respects the learner's playback speed but never
  // records practice or touches any other profile state.
  const learning = useLearning(courses);
  const speech = useCourseSpeech(
    course.speech,
    PLAYBACK_RATES[learning.playbackSpeed],
  );

  useEffect(() => {
    if (moveRequest === 0) return;
    const el = stepRef.current;
    if (!el) return;
    const prefersReducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
    el.focus({ preventScroll: true });
  }, [moveRequest]);

  const step = mission.steps[Math.min(stepIndex, totalSteps - 1)];

  const speakerPhrase = useMemo(
    () =>
      step.speakerPhraseId
        ? requirePhrase(course, step.speakerPhraseId)
        : undefined,
    [course, step],
  );
  const choices = useMemo(
    () => step.choicePhraseIds.map((id) => requirePhrase(course, id)),
    [course, step],
  );

  const isPinyin = course.pronunciationStyle === "pinyin";
  const pronunciationLabel = isPinyin ? "Pinyin" : "Pronunciation";

  /**
   * `speakKey` identifies the *button*, not the phrase.
   *
   * A mission step can show the same phrase twice — "Привет!" is both what the
   * other person said and one of the replies — and keying playback on the
   * phrase id alone made one press flip both buttons to "Stop" at once. The
   * prefix keeps each control's state its own.
   */
  const speakPhrase = useCallback(
    (phrase: Phrase, speakKey: string, spokenLabel: string) => {
      if (speech.speakingId === speakKey) {
        speech.cancel();
        return;
      }
      // Only the target-language script is ever spoken.
      speech.speak(phrase.script, speakKey);
      setAnnouncement(`Playing ${spokenLabel}`);
    },
    [speech],
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!selected || result === "correct") return;
    // The visible feedback below sits in its own aria-live region, so the
    // result announces itself. Setting `announcement` here as well would read
    // the same verdict to a screen reader twice.
    setResult(selected === step.answerPhraseId ? "correct" : "incorrect");
  };

  const advance = useCallback(() => {
    speech.cancel();
    if (stepIndex + 1 >= totalSteps) {
      setCompleted(true);
      setAnnouncement("Mission complete.");
    } else {
      setStepIndex((n) => n + 1);
      setAnnouncement(`Step ${stepIndex + 2} of ${totalSteps}`);
    }
    setSelected(null);
    setResult("unanswered");
    setMoveRequest((n) => n + 1);
  }, [speech, stepIndex, totalSteps]);

  const restart = useCallback(() => {
    speech.cancel();
    setStepIndex(0);
    setSelected(null);
    setResult("unanswered");
    setCompleted(false);
    setAnnouncement("Mission restarted at step 1.");
    setMoveRequest((n) => n + 1);
  }, [speech]);

  const courseHref = `/learn/${course.id}`;

  /* --------------------------------------------------------------------- */

  if (completed) {
    return (
      <div className="shell-narrow py-12 sm:py-14">
        <MissionHeader mission={mission} course={course} />

        <section
          ref={stepRef}
          tabIndex={-1}
          aria-labelledby="mission-complete-heading"
          className="focus-landmark mt-8 scroll-mt-24"
        >
          <div className="rounded-lg border border-success-700/25 bg-success-50 px-5 py-4">
            <p className="font-semibold text-success-700">
              <span aria-hidden="true">✓ </span>
              Mission complete
            </p>
            <h2
              id="mission-complete-heading"
              className="mt-2 font-display text-2xl text-ink-900"
            >
              You stayed in the conversation
            </h2>
            <p className="mt-2 text-muted-700">
              You did not need every word. You needed a way to keep going, and
              you had one at each turn.
            </p>
          </div>

          <h3 className="mt-8 font-sans text-lg font-bold text-ink-900">
            What you just did
          </h3>
          <ul className="copy mt-3">
            {mission.accomplishments.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h3 className="mt-8 font-sans text-lg font-bold text-ink-900">
            The conversation, start to finish
          </h3>
          <p className="mt-1 text-sm text-muted-600">
            A recap of this guided mission — a scripted exercise, not a
            recording of a real conversation.
          </p>
          <ol className="mt-4 space-y-3">
            {mission.steps.map((s, i) => {
              const answer = requirePhrase(course, s.answerPhraseId);
              const speaker = s.speakerPhraseId
                ? requirePhrase(course, s.speakerPhraseId)
                : undefined;
              return (
                <li key={s.id} className="card p-4 sm:p-5">
                  <p className="text-xs font-bold tracking-[0.11em] text-muted-500 uppercase">
                    Step {i + 1}
                  </p>
                  {speaker ? (
                    <p className="mt-2 text-[0.97rem] text-muted-700">
                      <span className="font-semibold text-ink-800">
                        They said:{" "}
                      </span>
                      <span lang={course.scriptLang}>{speaker.script}</span>{" "}
                      <span className="text-muted-600">
                        ({speaker.english})
                      </span>
                    </p>
                  ) : null}
                  <p className="mt-2 text-sm font-semibold text-ink-800">
                    You said:
                  </p>
                  <RecapPhrase
                    phrase={answer}
                    course={course}
                    pronunciationLabel={pronunciationLabel}
                    canSpeak={speech.available}
                    isSpeaking={speech.speakingId === `recap:${answer.id}`}
                    onPlay={() =>
                      speakPhrase(answer, `recap:${answer.id}`, answer.english)
                    }
                  />
                </li>
              );
            })}
          </ol>

          <div className="mt-8 flex flex-wrap gap-3 border-t border-line pt-6">
            <button type="button" className="btn btn-primary" onClick={restart}>
              Practice this mission again
            </button>
            <Link href={courseHref} className="btn btn-secondary">
              Back to {course.shortName}
            </Link>
            <Link href="/my-learning" className="btn btn-secondary">
              Go to My Learning
            </Link>
          </div>
        </section>

        <p aria-live="polite" className="sr-only">
          {announcement}
        </p>
      </div>
    );
  }

  return (
    <div className="shell-narrow py-12 sm:py-14">
      <MissionHeader mission={mission} course={course} />

      <SpeechNotice status={speech.status} languageName={course.languageName} />

      {/* Progress across the mission — a count, not a score. */}
      <div className="mt-8">
        <div
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={totalSteps}
          aria-valuenow={stepIndex + 1}
          aria-valuetext={`Step ${stepIndex + 1} of ${totalSteps}`}
          aria-label="Mission progress"
          className="h-2 w-full overflow-hidden rounded-full bg-surface-sunken"
        >
          <div
            className="h-full rounded-full bg-brand-600 transition-[width] duration-500"
            style={{ width: `${((stepIndex + 1) / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      <section
        ref={stepRef}
        tabIndex={-1}
        aria-labelledby="mission-step-heading"
        className="focus-landmark mt-6 scroll-mt-24"
      >
        <p className="eyebrow">
          Step {stepIndex + 1} of {totalSteps}
        </p>
        <h2
          id="mission-step-heading"
          className="mt-2 font-display text-2xl leading-tight text-ink-900 sm:text-3xl"
        >
          {step.context}
        </h2>

        {speakerPhrase ? (
          <div className="card mt-5 border-l-4 border-l-accent-500 p-5">
            <p className="text-xs font-bold tracking-[0.11em] text-muted-500 uppercase">
              They say
            </p>
            <p
              lang={course.scriptLang}
              className="mt-1.5 font-display text-2xl leading-snug font-semibold break-words text-ink-900"
            >
              {speakerPhrase.script}
            </p>
            <p className="mt-3">
              <span className="sr-only">
                {pronunciationLabel}:{" "}
                {pronunciationToText(speakerPhrase.pronunciation)}
              </span>
              <span aria-hidden="true">
                <PronunciationGuide pronunciation={speakerPhrase.pronunciation} />
              </span>
            </p>
            <div className="mt-4">
              <PlayButton
                canSpeak={speech.available}
                isSpeaking={speech.speakingId === `speaker:${speakerPhrase.id}`}
                languageName={course.languageName}
                label={`what they said, ${speakerPhrase.english}`}
                onClick={() =>
                  speakPhrase(
                    speakerPhrase,
                    `speaker:${speakerPhrase.id}`,
                    "what they said",
                  )
                }
              />
            </div>
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="mt-6">
          <fieldset>
            <legend className="font-sans text-base font-bold text-ink-900">
              What do you say?
            </legend>
            <ul className="mt-4 space-y-3">
              {choices.map((phrase) => {
                const inputId = `${groupName}-${phrase.id}`;
                const chosen = selected === phrase.id;
                return (
                  <li key={phrase.id}>
                    <div
                      className={`rounded-lg border bg-surface-raised transition-colors ${
                        chosen
                          ? "border-brand-600 ring-1 ring-brand-600"
                          : "border-line hover:border-brand-400"
                      }`}
                    >
                      <label
                        htmlFor={inputId}
                        className="flex cursor-pointer items-start gap-3 px-4 py-3"
                      >
                        <input
                          type="radio"
                          id={inputId}
                          name={groupName}
                          value={phrase.id}
                          checked={chosen}
                          onChange={() => {
                            setSelected(phrase.id);
                            setResult("unanswered");
                          }}
                          className="mt-1 size-[1.15rem] shrink-0 accent-brand-600"
                        />
                        <span className="min-w-0">
                          <span
                            lang={course.scriptLang}
                            className="block text-lg font-semibold break-words text-ink-900"
                          >
                            {phrase.script}
                          </span>
                          <span className="sr-only">
                            {pronunciationLabel}:{" "}
                            {pronunciationToText(phrase.pronunciation)}
                          </span>
                          <span aria-hidden="true" className="mt-1 block">
                            <PronunciationGuide
                              pronunciation={phrase.pronunciation}
                            />
                          </span>
                        </span>
                      </label>
                      <div className="px-4 pb-3">
                        <PlayButton
                          small
                          canSpeak={speech.available}
                          isSpeaking={
                            speech.speakingId === `choice:${phrase.id}`
                          }
                          languageName={course.languageName}
                          label={`this option in ${course.languageName}`}
                          onClick={() =>
                            speakPhrase(
                              phrase,
                              `choice:${phrase.id}`,
                              "an option",
                            )
                          }
                        />
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </fieldset>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!selected || result === "correct"}
            >
              Check answer
            </button>
            {result === "incorrect" ? (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setSelected(null);
                  setResult("unanswered");
                }}
              >
                Try again
              </button>
            ) : null}
          </div>
        </form>

        <div aria-live="polite" className="mt-5 empty:mt-0">
          {result === "correct" ? (
            <div className="rounded-lg border border-success-700/25 bg-success-50 px-4 py-3">
              <p className="font-semibold text-success-700">
                <span aria-hidden="true">✓ </span>
                Yes — that keeps the conversation moving.
              </p>
            </div>
          ) : null}
          {result === "incorrect" ? (
            <div className="rounded-lg border border-caution-700/25 bg-caution-50 px-4 py-3">
              <p className="font-semibold text-caution-700">
                <span aria-hidden="true">↻ </span>
                That phrase is useful, but it does not fit this situation. Try
                again.
              </p>
            </div>
          ) : null}
        </div>

        {result === "correct" ? (
          <div className="mt-6 border-t border-line pt-6">
            <button type="button" className="btn btn-primary" onClick={advance}>
              {stepIndex + 1 >= totalSteps ? (
                <>Finish the mission</>
              ) : (
                <>
                  Next step
                  <span aria-hidden="true">→</span>
                </>
              )}
            </button>
          </div>
        ) : null}
      </section>

      <p className="mt-10 border-t border-line pt-6 text-sm text-muted-600">
        A guided exercise, not a conversation with a person or a machine. Every
        step is scripted, and nothing you do here changes your lesson progress.{" "}
        <Link href={courseHref} className="link-inline">
          Back to {course.shortName}
        </Link>
      </p>

      <p aria-live="polite" className="sr-only">
        {announcement}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------------ */

function MissionHeader({
  mission,
  course,
}: {
  mission: Mission;
  course: Course;
}) {
  return (
    <header className="max-w-2xl">
      <p className="eyebrow">
        {course.shortName} · {mission.label}
      </p>
      <h1 className="mt-2 font-display text-3xl leading-tight text-ink-900 sm:text-4xl">
        {mission.title}
      </h1>
      <p className="mt-3 text-lg text-muted-700">{mission.tagline}</p>
      <p className="mt-3 text-muted-700">{mission.intro}</p>
    </header>
  );
}

function PlayButton({
  canSpeak,
  isSpeaking,
  languageName,
  label,
  onClick,
  small = false,
}: {
  canSpeak: boolean;
  isSpeaking: boolean;
  languageName: string;
  label: string;
  onClick: () => void;
  small?: boolean;
}) {
  const classes = small
    ? "inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-2 text-sm font-semibold text-muted-700 transition-colors hover:border-brand-400 hover:text-ink-900"
    : "btn btn-secondary";

  if (!canSpeak) {
    return (
      <button
        type="button"
        className={classes}
        disabled
        title={`${languageName} playback is not available in this browser`}
      >
        <span aria-hidden="true">▶</span>
        <span>
          Play
          <span className="sr-only">
            {" "}
            — {languageName} playback unavailable in this browser
          </span>
        </span>
      </button>
    );
  }

  return (
    <button type="button" className={classes} onClick={onClick}>
      <span aria-hidden="true">{isSpeaking ? "◼" : "▶"}</span>
      <span>
        {isSpeaking ? "Stop" : "Play"}
        <span className="sr-only"> {label}</span>
      </span>
    </button>
  );
}

function RecapPhrase({
  phrase,
  course,
  pronunciationLabel,
  canSpeak,
  isSpeaking,
  onPlay,
}: {
  phrase: Phrase;
  course: Course;
  pronunciationLabel: string;
  canSpeak: boolean;
  isSpeaking: boolean;
  onPlay: () => void;
}) {
  return (
    <div className="mt-1.5">
      <p
        lang={course.scriptLang}
        className="font-display text-xl leading-snug font-semibold break-words text-ink-900"
      >
        {phrase.script}
      </p>
      <p className="mt-1 text-ink-700">{phrase.english}</p>
      <p className="mt-1.5">
        <span className="sr-only">
          {pronunciationLabel}: {pronunciationToText(phrase.pronunciation)}
        </span>
        <span aria-hidden="true">
          <PronunciationGuide pronunciation={phrase.pronunciation} />
        </span>
      </p>
      <div className="mt-3">
        <PlayButton
          small
          canSpeak={canSpeak}
          isSpeaking={isSpeaking}
          languageName={course.languageName}
          label={`${phrase.english} in ${course.languageName}`}
          onClick={onPlay}
        />
      </div>
    </div>
  );
}

function SpeechNotice({
  status,
  languageName,
}: {
  status: ReturnType<typeof useCourseSpeech>["status"];
  languageName: string;
}) {
  if (status === "checking" || status === "ready") return null;
  const message =
    status === "unsupported"
      ? "This browser does not support speech playback, so the Play buttons are turned off. The mission works exactly as it is without audio."
      : `This browser can speak, but no ${languageName} voice is installed on this device, so playback may sound wrong. The mission works without audio.`;
  return (
    <p className="mt-6 rounded-lg border border-caution-700/25 bg-caution-50 px-4 py-3 text-[0.97rem] text-caution-700">
      {message}
    </p>
  );
}
