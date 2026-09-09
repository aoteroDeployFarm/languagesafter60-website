/**
 * Shared language-course types.
 *
 * Two courses use these: Russian and Mandarin. The shape is deliberately kept
 * to what those two actually need — this is a shared capability, not a plugin
 * system for hypothetical future languages.
 *
 * No React and no DOM in this module. Course content stays editable without
 * touching the interface.
 */

/* -------------------------------------------------------------------------
   Pronunciation
   ---------------------------------------------------------------------- */

export type Syllable = {
  text: string;
  stressed?: boolean;
};

/** A guide word: a list of syllables. Used by the stress-marked style. */
export type PronunciationWord = Syllable[];

/**
 * How a phrase's pronunciation is written.
 *
 * Russian and Mandarin need genuinely different things here, so this is a
 * union of the two real cases rather than one lowest-common-denominator
 * string:
 *
 *   "stress" — English-readable syllables with the stressed one marked. Stress
 *              is the first thing a Russian learner has to get right.
 *   "pinyin" — standard pinyin with tone marks. Mandarin already has a correct
 *              romanisation, so inventing an English-style respelling for it
 *              would teach the wrong pronunciation.
 */
export type Pronunciation =
  | { kind: "stress"; words: PronunciationWord[] }
  | { kind: "pinyin"; text: string };

export type PronunciationStyle = Pronunciation["kind"];

/* -------------------------------------------------------------------------
   Lessons
   ---------------------------------------------------------------------- */

export type Phrase = {
  id: string;
  /**
   * The phrase in its own script. This is the ONLY string handed to speech
   * synthesis — never the pinyin, never the English.
   */
  script: string;
  /**
   * Optional annotated form of the script for learners who want it — Russian
   * uses it for acute stress marks. Not spoken.
   */
  scriptAnnotated?: string;
  english: string;
  pronunciation: Pronunciation;
  /** One practical note: usage, register, tone behaviour, or a listening cue. */
  note?: string;
};

export type QuizChoice = {
  id: string;
  label: string;
  /** BCP-47 tag when the choice is written in the target script. */
  lang?: string;
};

export type KnowledgeCheck = {
  question: string;
  choices: QuizChoice[];
  correctChoiceId: string;
  /** Shown once the learner answers correctly. */
  explanation: string;
};

export type Lesson = {
  slug: string;
  number: number;
  title: string;
  /** One sentence describing what this lesson gets you. */
  summary: string;
  phrases: Phrase[];
  check: KnowledgeCheck;
};

/* -------------------------------------------------------------------------
   Course
   ---------------------------------------------------------------------- */

export type SpeechConfig = {
  /** BCP-47 locale requested from speech synthesis, e.g. "ru-RU", "zh-CN". */
  lang: string;
  /**
   * Voice `lang` prefixes to accept, best first, lowercase. The exact `lang`
   * above is tried first; these are the graceful fallbacks. Order matters —
   * for Mandarin it keeps a Cantonese zh-HK voice as a last resort rather than
   * a first choice.
   */
  voiceLangPrefixes: string[];
};

export type Course = {
  /** Stable id, also used in the progress storage key. */
  id: string;
  /** Full course name, e.g. "Mandarin After 60". */
  name: string;
  /** Short label for navigation and progress copy, e.g. "Mandarin". */
  shortName: string;
  /** Language name used in spoken-status and fallback messages. */
  languageName: string;
  /** BCP-47 tag applied to script text, e.g. "ru", "zh-Hans". */
  scriptLang: string;
  /** Which pronunciation guide to render and how to explain it. */
  pronunciationStyle: PronunciationStyle;
  speech: SpeechConfig;
  /** localStorage key. Namespaced per course so progress never collides. */
  storageKey: string;
  lessons: Lesson[];
};

/* -------------------------------------------------------------------------
   Helpers
   ---------------------------------------------------------------------- */

/**
 * Render a pronunciation guide as plain text for screen readers: stressed
 * syllables in capitals, syllables joined by hyphens. Pinyin is already
 * readable, so it passes through unchanged.
 */
export function pronunciationToText(pronunciation: Pronunciation): string {
  if (pronunciation.kind === "pinyin") return pronunciation.text;
  return pronunciation.words
    .map((word) =>
      word
        .map((syllable) =>
          syllable.stressed ? syllable.text.toUpperCase() : syllable.text,
        )
        .join("-"),
    )
    .join(" ");
}

export function getLessonBySlug(
  course: Course,
  slug: string,
): Lesson | undefined {
  return course.lessons.find((lesson) => lesson.slug === slug);
}
