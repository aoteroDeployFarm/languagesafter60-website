/**
 * Russian course content.
 *
 * This module is data only — no React, no DOM. Presentation lives in
 * `components/russian/*`, so lessons can be edited (or later moved to a CMS or
 * a JSON file) without touching the interface.
 *
 * Pronunciation guides are deliberately written for an English reader rather
 * than in IPA. Stress is the single most useful thing to get right early in
 * Russian, so every multi-syllable word marks its stressed syllable. Words of
 * one syllable are left unmarked: they carry the stress by default and marking
 * them adds noise.
 */

export type Syllable = {
  text: string;
  stressed?: boolean;
};

/** A pronunciation guide: a list of words, each a list of syllables. */
export type PronunciationWord = Syllable[];

export type Phrase = {
  id: string;
  /** Russian, in Cyrillic, as it would be written. */
  cyrillic: string;
  /** Cyrillic with the acute stress mark, for learners who want it. */
  cyrillicStressed: string;
  english: string;
  pronunciation: PronunciationWord[];
  /** One practical note: usage, register, or a listening cue. */
  note?: string;
};

export type QuizChoice = {
  id: string;
  label: string;
};

export type KnowledgeCheck = {
  question: string;
  choices: QuizChoice[];
  correctChoiceId: string;
  /** Shown after answering, whether right or wrong. */
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

/** Separator rendered between alternatives in a pronunciation guide. */
const SLASH: PronunciationWord = [{ text: "/" }];

export const lessons: Lesson[] = [
  {
    slug: "hello-russia",
    number: 1,
    title: "Hello, Russia",
    summary:
      "Four phrases that carry a first exchange: a greeting, a question, an answer, and a thank you.",
    phrases: [
      {
        id: "privet",
        cyrillic: "Привет!",
        cyrillicStressed: "Приве́т!",
        english: "Hi",
        pronunciation: [[{ text: "pree" }, { text: "vyet", stressed: true }]],
        note: "Informal — friends, family, people your own age. For strangers and anyone older or senior to you, use «Здравствуйте».",
      },
      {
        id: "kak-dela",
        cyrillic: "Как дела?",
        cyrillicStressed: "Как дела́?",
        english: "How are you?",
        pronunciation: [
          [{ text: "kak" }],
          [{ text: "dee" }, { text: "la", stressed: true }],
        ],
        note: "Literally “how are the affairs?”. Unlike the English version, it's a real question and expects a real answer.",
      },
      {
        id: "khorosho",
        cyrillic: "Хорошо!",
        cyrillicStressed: "Хорошо́!",
        english: "Good",
        pronunciation: [
          [{ text: "kha" }, { text: "ra" }, { text: "sho", stressed: true }],
        ],
        note: "Written with three о's, but only the stressed one sounds like “oh”. The other two relax toward “ah”. This reduction is the core habit of Russian pronunciation.",
      },
      {
        id: "spasibo",
        cyrillic: "Спасибо!",
        cyrillicStressed: "Спаси́бо!",
        english: "Thank you",
        pronunciation: [
          [{ text: "spa" }, { text: "see", stressed: true }, { text: "ba" }],
        ],
        note: "The final о is unstressed, so it lands closer to “ba” than “bo”.",
      },
    ],
    check: {
      question: "Someone greets you and says «Как дела?». What are they asking?",
      choices: [
        { id: "a", label: "How are you?" },
        { id: "b", label: "What is your name?" },
        { id: "c", label: "Where are you going?" },
        { id: "d", label: "Thank you" },
      ],
      correctChoiceId: "a",
      explanation:
        "«Как дела?» is “How are you?” — and «Хорошо!» is a complete, natural answer.",
    },
  },
  {
    slug: "meet-and-greet",
    number: 2,
    title: "Meet and Greet",
    summary:
      "Introduce yourself, ask for a name politely, and close the conversation without stalling.",
    phrases: [
      {
        id: "menya-zovut",
        cyrillic: "Меня зовут Алекс.",
        cyrillicStressed: "Меня́ зову́т Але́кс.",
        english: "My name is Alex",
        pronunciation: [
          [{ text: "mee" }, { text: "nya", stressed: true }],
          [{ text: "za" }, { text: "voot", stressed: true }],
          [{ text: "a", stressed: true }, { text: "leks" }],
        ],
        note: "Literally “they call me Alex”. Swap in your own name and the sentence is done.",
      },
      {
        id: "kak-vas-zovut",
        cyrillic: "Как вас зовут?",
        cyrillicStressed: "Как вас зову́т?",
        english: "What is your name? (formal)",
        pronunciation: [
          [{ text: "kak" }],
          [{ text: "vas" }],
          [{ text: "za" }, { text: "voot", stressed: true }],
        ],
        note: "«вас» is the formal “you”. With someone you already know well, it becomes «Как тебя зовут?».",
      },
      {
        id: "ochen-priyatno",
        cyrillic: "Очень приятно.",
        cyrillicStressed: "О́чень прия́тно.",
        english: "Nice to meet you",
        pronunciation: [
          [{ text: "o", stressed: true }, { text: "cheen" }],
          [
            { text: "pree" },
            { text: "yat", stressed: true },
            { text: "na" },
          ],
        ],
        note: "The standard reply after an exchange of names. Short, warm, and always correct.",
      },
      {
        id: "do-svidaniya",
        cyrillic: "До свидания!",
        cyrillicStressed: "До свида́ния!",
        english: "Goodbye",
        pronunciation: [
          [{ text: "da" }],
          [
            { text: "svee" },
            { text: "da", stressed: true },
            { text: "nee" },
            { text: "ya" },
          ],
        ],
        note: "Neutral and safe in any setting. «Пока!» is the casual equivalent, and pairs with «Привет!».",
      },
    ],
    check: {
      question: "You have just been introduced to someone. Which phrase do you say?",
      choices: [
        { id: "a", label: "Очень приятно." },
        { id: "b", label: "До свидания!" },
        { id: "c", label: "Как вас зовут?" },
        { id: "d", label: "Хорошо!" },
      ],
      correctChoiceId: "a",
      explanation:
        "«Очень приятно» — “Nice to meet you” — is the expected response once names have been exchanged.",
    },
  },
  {
    slug: "lets-go",
    number: 3,
    title: "Let's Go",
    summary:
      "Move a conversation forward, answer plainly, and say the most useful sentence a beginner owns: I don't understand.",
    phrases: [
      {
        id: "poekhali",
        cyrillic: "Поехали!",
        cyrillicStressed: "Пое́хали!",
        english: "Let's go",
        pronunciation: [
          [
            { text: "pa" },
            { text: "ye", stressed: true },
            { text: "kha" },
            { text: "lee" },
          ],
        ],
        note: "Gagarin's word at launch in 1961, and still ordinary Russian for “let's get moving”.",
      },
      {
        id: "da-net",
        cyrillic: "Да / Нет",
        cyrillicStressed: "Да / Нет",
        english: "Yes / No",
        pronunciation: [[{ text: "da" }], SLASH, [{ text: "nyet" }]],
        note: "«Нет» carries a soft “y” glide: nyet, not net.",
      },
      {
        id: "pozhaluysta",
        cyrillic: "Пожалуйста.",
        cyrillicStressed: "Пожа́луйста.",
        english: "Please / You're welcome",
        pronunciation: [
          [
            { text: "pa" },
            { text: "zhal" , stressed: true },
            { text: "sta" },
          ],
        ],
        note: "Spelled with more letters than it gets in speech — the middle collapses, so it lands as pa-ZHAL-sta. It answers «Спасибо» as well as making a request polite.",
      },
      {
        id: "ya-ne-ponimayu",
        cyrillic: "Я не понимаю.",
        cyrillicStressed: "Я не понима́ю.",
        english: "I don't understand",
        pronunciation: [
          [{ text: "ya" }],
          [{ text: "nee" }],
          [
            { text: "pa" },
            { text: "nee" },
            { text: "ma", stressed: true },
            { text: "yu" },
          ],
        ],
        note: "The phrase that keeps a real conversation going instead of ending it. Worth over-practising.",
      },
    ],
    check: {
      question:
        "A conversation has moved faster than you can follow. Which phrase says so?",
      choices: [
        { id: "a", label: "Поехали!" },
        { id: "b", label: "Я не понимаю." },
        { id: "c", label: "Пожалуйста." },
        { id: "d", label: "Меня зовут Алекс." },
      ],
      correctChoiceId: "b",
      explanation:
        "«Я не понимаю» — “I don't understand.” Said early and without apology, it usually gets you a slower, clearer repeat.",
    },
  },
];

export const totalLessons = lessons.length;

export function getLessonBySlug(slug: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.slug === slug);
}

/**
 * Render a pronunciation guide as plain text: syllables joined by hyphens,
 * stressed syllables in capitals. Used for screen-reader labels and anywhere
 * the styled version would be overkill.
 */
export function pronunciationToText(words: PronunciationWord[]): string {
  return words
    .map((word) =>
      word
        .map((syllable) =>
          syllable.stressed ? syllable.text.toUpperCase() : syllable.text,
        )
        .join("-"),
    )
    .join(" ");
}
