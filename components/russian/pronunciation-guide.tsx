import type { PronunciationWord } from "@/lib/russian/lessons";

/**
 * Renders a pronunciation guide with the stressed syllable made unmistakable:
 * capitals, weight, and an underline, so it reads correctly in colour, in
 * greyscale, and to anyone who does not perceive the accent colour.
 */
export function PronunciationGuide({ words }: { words: PronunciationWord[] }) {
  return (
    <span className="font-sans text-[1.05rem] tracking-wide text-muted-700">
      {words.map((word, wordIndex) => (
        <span key={wordIndex}>
          {wordIndex > 0 ? " " : null}
          <span className="whitespace-nowrap">
            {word.map((syllable, syllableIndex) => (
              <span key={syllableIndex}>
                {syllableIndex > 0 ? (
                  <span aria-hidden="true" className="text-line-strong">
                    -
                  </span>
                ) : null}
                {syllable.stressed ? (
                  <strong className="font-bold text-ink-900 underline decoration-accent-500 decoration-2 underline-offset-4">
                    {syllable.text.toUpperCase()}
                  </strong>
                ) : (
                  syllable.text
                )}
              </span>
            ))}
          </span>
        </span>
      ))}
    </span>
  );
}
