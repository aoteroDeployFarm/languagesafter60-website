"use client";

import type { Phrase } from "@/lib/course/types";
import { pronunciationToText } from "@/lib/course/types";
import { PronunciationGuide } from "./pronunciation-guide";

type PhraseCardProps = {
  phrase: Phrase;
  /** BCP-47 tag for the script, e.g. "ru" or "zh-Hans". */
  scriptLang: string;
  /** Language name used in the disabled-control explanation. */
  languageName: string;
  /** How the pronunciation guide should be described to a screen reader. */
  pronunciationLabel: string;
  /** False when the browser cannot speak at all. */
  canSpeak: boolean;
  isSpeaking: boolean;
  onSpeak: (phrase: Phrase) => void;
  onStop: () => void;
  /** Whether this phrase is on the learner's practice list. */
  isSaved: boolean;
  onToggleSaved: (phrase: Phrase) => void;
};

export function PhraseCard({
  phrase,
  scriptLang,
  languageName,
  pronunciationLabel,
  canSpeak,
  isSpeaking,
  onSpeak,
  onStop,
  isSaved,
  onToggleSaved,
}: PhraseCardProps) {
  return (
    <li className="card p-5 sm:p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p
            lang={scriptLang}
            className="font-display text-2xl leading-snug font-semibold break-words text-ink-900 sm:text-[1.75rem]"
          >
            {phrase.script}
          </p>
          <p className="mt-1.5 text-lg text-ink-700">{phrase.english}</p>
          <p className="mt-3">
            <span className="sr-only">
              {pronunciationLabel}: {pronunciationToText(phrase.pronunciation)}
            </span>
            <span aria-hidden="true">
              <PronunciationGuide pronunciation={phrase.pronunciation} />
            </span>
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-2 sm:items-end">
          {canSpeak ? (
            <button
              type="button"
              className="btn btn-secondary w-full sm:w-auto"
              onClick={() => (isSpeaking ? onStop() : onSpeak(phrase))}
            >
              <span aria-hidden="true">{isSpeaking ? "◼" : "▶"}</span>
              <span>
                {isSpeaking ? "Stop" : "Play"}
                <span className="sr-only">
                  {" "}
                  pronunciation of {phrase.english}
                </span>
              </span>
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-secondary w-full sm:w-auto"
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
          )}

          {/* Practice list toggle. aria-pressed carries the state for assistive
              technology; the ★/☆ glyph and the border weight carry it visually,
              so selection never depends on colour alone. */}
          <button
            type="button"
            aria-pressed={isSaved}
            onClick={() => onToggleSaved(phrase)}
            className={`inline-flex w-full items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-semibold transition-colors sm:w-auto ${
              isSaved
                ? "border-accent-600 bg-accent-50 text-accent-800"
                : "border-line text-muted-700 hover:border-accent-500 hover:text-ink-900"
            }`}
          >
            <span aria-hidden="true">{isSaved ? "★" : "☆"}</span>
            <span>
              {isSaved ? "Saved for practice" : "Practice again"}
              <span className="sr-only">
                {" "}
                — {phrase.english} ({phrase.script})
              </span>
            </span>
          </button>
        </div>
      </div>

      {phrase.note ? (
        <p className="mt-5 border-t border-line-soft pt-4 text-[0.97rem] text-muted-700">
          {phrase.note}
        </p>
      ) : null}
    </li>
  );
}
