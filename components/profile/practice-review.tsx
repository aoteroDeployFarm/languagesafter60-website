"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Course, Phrase } from "@/lib/course/types";
import { pronunciationToText } from "@/lib/course/types";
import { useCourseSpeech } from "@/lib/course/use-speech";
import { PronunciationGuide } from "@/components/course/pronunciation-guide";
import { PLAYBACK_RATES, type PlaybackSpeed } from "@/lib/profile/types";

type PracticeReviewProps = {
  course: Course;
  /** Saved phrases resolved against current course content, in course order. */
  phrases: Phrase[];
  playbackSpeed: PlaybackSpeed;
  onRemove: (phrase: Phrase) => void;
  onPractised: () => void;
};

/**
 * One saved phrase at a time, with the answer hidden until asked for.
 *
 * Deliberately not a quiz: no score, no timer, no streak. The learner decides
 * whether they got it, which is the only judgement worth trusting at this
 * stage.
 */
export function PracticeReview({
  course,
  phrases,
  playbackSpeed,
  onRemove,
  onPractised,
}: PracticeReviewProps) {
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [status, setStatus] = useState("");

  const speech = useCourseSpeech(course.speech, PLAYBACK_RATES[playbackSpeed]);

  // Starting a different language should not carry the old position over.
  useEffect(() => {
    setIndex(0);
    setRevealed(false);
    speech.cancel();
    // speech.cancel is stable; re-running on course change is the intent.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course.id]);

  if (phrases.length === 0) {
    return (
      <div className="card p-6">
        <p className="text-muted-700">
          You haven’t saved any {course.shortName} phrases for practice yet.
          Open a lesson and choose <strong>Practice again</strong> on any phrase
          you want to come back to.
        </p>
        <Link
          href={course.id === "russian" ? "/learn/russian" : "/learn/mandarin"}
          className="btn btn-secondary mt-4"
        >
          Go to {course.shortName}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    );
  }

  /**
   * Clamped during render, not in an effect. Removing the last phrase in the
   * queue shrinks `phrases` and re-renders immediately; an effect would not
   * have corrected the cursor until after that render had already tried to
   * read past the end of the array.
   */
  const safeIndex = Math.min(index, phrases.length - 1);
  const phrase = phrases[safeIndex];
  const isPinyin = course.pronunciationStyle === "pinyin";

  const goNext = () => {
    speech.cancel();
    setRevealed(false);
    setIndex((safeIndex + 1) % phrases.length);
    setStatus("");
  };

  const handlePlay = () => {
    if (speech.speakingId === phrase.id) {
      speech.cancel();
      setStatus("Playback stopped");
      return;
    }
    speech.speak(phrase.script, phrase.id);
    setStatus(`Playing phrase ${safeIndex + 1} of ${phrases.length}`);
    onPractised();
  };

  const handleRemove = () => {
    speech.cancel();
    onRemove(phrase);
    setRevealed(false);
    setStatus(`Removed from practice: ${phrase.english}`);
  };

  return (
    <div className="card p-5 sm:p-6">
      <p className="text-sm text-muted-600">
        Phrase {safeIndex + 1} of {phrases.length} saved for practice
      </p>

      <p
        lang={course.scriptLang}
        className="mt-3 font-display text-3xl leading-snug font-semibold break-words text-ink-900 sm:text-4xl"
      >
        {phrase.script}
      </p>

      <div className="mt-5 flex flex-wrap gap-3">
        {speech.available ? (
          <button type="button" className="btn btn-secondary" onClick={handlePlay}>
            <span aria-hidden="true">
              {speech.speakingId === phrase.id ? "◼" : "▶"}
            </span>
            <span>
              {speech.speakingId === phrase.id ? "Stop" : "Play"}
              <span className="sr-only"> this {course.languageName} phrase</span>
            </span>
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-secondary"
            disabled
            title={`${course.languageName} playback is not available in this browser`}
          >
            <span aria-hidden="true">▶</span>
            <span>
              Play
              <span className="sr-only">
                {" "}
                — {course.languageName} playback unavailable in this browser
              </span>
            </span>
          </button>
        )}

        <button
          type="button"
          className="btn btn-primary"
          aria-expanded={revealed}
          onClick={() => setRevealed((v) => !v)}
        >
          {revealed ? "Hide the answer" : "Show meaning and pronunciation"}
        </button>
      </div>

      {revealed ? (
        <div className="mt-5 rounded-lg border border-line bg-surface-tint p-4">
          <p className="text-lg text-ink-900">{phrase.english}</p>
          <p className="mt-2">
            <span className="sr-only">
              {isPinyin ? "Pinyin" : "Pronunciation"}:{" "}
              {pronunciationToText(phrase.pronunciation)}
            </span>
            <span aria-hidden="true">
              <PronunciationGuide pronunciation={phrase.pronunciation} />
            </span>
          </p>
          {phrase.note ? (
            <p className="mt-3 border-t border-line-soft pt-3 text-[0.97rem] text-muted-700">
              {phrase.note}
            </p>
          ) : null}
        </div>
      ) : null}

      <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-line pt-5">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={goNext}
          disabled={phrases.length < 2}
        >
          Next phrase
          <span aria-hidden="true">→</span>
        </button>
        {/* Identified by the phrase itself rather than its English, so the
            control does not give away the answer that is still hidden. */}
        <button
          type="button"
          onClick={handleRemove}
          className="inline-block py-2.5 text-sm text-muted-600 underline underline-offset-4 hover:text-ink-900"
        >
          Remove this phrase from practice
          <span className="sr-only" lang={course.scriptLang}>
            {" "}
            — {phrase.script}
          </span>
        </button>
      </div>

      <p aria-live="polite" className="sr-only">
        {status}
      </p>
    </div>
  );
}
