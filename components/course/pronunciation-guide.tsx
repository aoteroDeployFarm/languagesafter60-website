import type { Pronunciation, PronunciationWord } from "@/lib/course/types";

/**
 * Renders a pronunciation guide in whichever style the course uses.
 *
 * Both styles share one type slot in the phrase card so the two courses stay
 * visually consistent — only the contents differ.
 */
export function PronunciationGuide({
  pronunciation,
}: {
  pronunciation: Pronunciation;
}) {
  if (pronunciation.kind === "pinyin") {
    return <PinyinGuide text={pronunciation.text} />;
  }
  return <StressGuide words={pronunciation.words} />;
}

/**
 * Pinyin, shown as written. Tone marks sit above the vowels and are the whole
 * point, so the type is set a little larger and looser than the surrounding
 * copy to keep the diacritics legible — including on small screens.
 */
function PinyinGuide({ text }: { text: string }) {
  return (
    <span className="font-sans text-[1.1rem] leading-relaxed tracking-wide text-muted-700">
      {text}
    </span>
  );
}

/**
 * English-readable syllables with the stressed one made unmistakable:
 * capitals, weight, and an underline, so it reads correctly in colour, in
 * greyscale, and to anyone who does not perceive the accent colour.
 */
function StressGuide({ words }: { words: PronunciationWord[] }) {
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
