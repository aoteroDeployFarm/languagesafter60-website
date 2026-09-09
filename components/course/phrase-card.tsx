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

        <div className="shrink-0">
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
