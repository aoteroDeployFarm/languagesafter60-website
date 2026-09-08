"use client";

import type { Phrase } from "@/lib/russian/lessons";
import { pronunciationToText } from "@/lib/russian/lessons";
import { PronunciationGuide } from "./pronunciation-guide";

type PhraseCardProps = {
  phrase: Phrase;
  /** False when the browser cannot speak at all. */
  canSpeak: boolean;
  isSpeaking: boolean;
  onSpeak: (phrase: Phrase) => void;
  onStop: () => void;
};

export function PhraseCard({
  phrase,
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
            lang="ru"
            className="font-display text-2xl leading-snug font-semibold break-words text-ink-900 sm:text-[1.75rem]"
          >
            {phrase.cyrillic}
          </p>
          <p className="mt-1.5 text-lg text-ink-700">{phrase.english}</p>
          <p className="mt-3">
            <span className="sr-only">
              Pronunciation: {pronunciationToText(phrase.pronunciation)}.
              Capitals mark the stressed syllable.
            </span>
            <span aria-hidden="true">
              <PronunciationGuide words={phrase.pronunciation} />
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
                <span className="sr-only"> pronunciation of {phrase.english}</span>
              </span>
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-secondary w-full sm:w-auto"
              disabled
              title="Pronunciation playback is not available in this browser"
            >
              <span aria-hidden="true">▶</span>
              <span>Play</span>
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
