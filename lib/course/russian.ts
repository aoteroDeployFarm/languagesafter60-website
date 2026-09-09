import type { Course, PronunciationWord } from "./types";

/**
 * Russian course content.
 *
 * Pronunciation guides are deliberately written for an English reader rather
 * than in IPA. Stress is the single most useful thing to get right early in
 * Russian, so every multi-syllable word marks its stressed syllable. Words of
 * one syllable are left unmarked: they carry the stress by default and marking
 * them adds noise.
 */

/** Separator rendered between alternatives in a pronunciation guide. */
const SLASH: PronunciationWord = [{ text: "/" }];

export const russianCourse: Course = {
  id: "russian",
  name: "Russian After 60",
  shortName: "Russian",
  languageName: "Russian",
  scriptLang: "ru",
  pronunciationStyle: "stress",
  speech: { lang: "ru-RU", voiceLangPrefixes: ["ru"] },
  storageKey: "la60.russian.progress.v1",
  lessons: [
    {
      slug: "hello-russia",
      number: 1,
      title: "Hello, Russia",
      summary:
        "Four phrases that carry a first exchange: a greeting, a question, an answer, and a thank you.",
      phrases: [
        {
          id: "privet",
          script: "Привет!",
          scriptAnnotated: "Приве́т!",
          english: "Hi",
          pronunciation: {
            kind: "stress",
            words: [[{ text: "pree" }, { text: "vyet", stressed: true }]],
          },
          note: "Informal — friends, family, people your own age. For strangers and anyone older or senior to you, use «Здравствуйте».",
        },
        {
          id: "kak-dela",
          script: "Как дела?",
          scriptAnnotated: "Как дела́?",
          english: "How are you?",
          pronunciation: {
            kind: "stress",
            words: [
              [{ text: "kak" }],
              [{ text: "dee" }, { text: "la", stressed: true }],
            ],
          },
          note: "Literally “how are the affairs?”. Unlike the English version, it's a real question and expects a real answer.",
        },
        {
          id: "khorosho",
          script: "Хорошо!",
          scriptAnnotated: "Хорошо́!",
          english: "Good",
          pronunciation: {
            kind: "stress",
            words: [
              [{ text: "kha" }, { text: "ra" }, { text: "sho", stressed: true }],
            ],
          },
          note: "Written with three о's, but only the stressed one sounds like “oh”. The other two relax toward “ah”. This reduction is the core habit of Russian pronunciation.",
        },
        {
          id: "spasibo",
          script: "Спасибо!",
          scriptAnnotated: "Спаси́бо!",
          english: "Thank you",
          pronunciation: {
            kind: "stress",
            words: [
              [{ text: "spa" }, { text: "see", stressed: true }, { text: "ba" }],
            ],
          },
          note: "The final о is unstressed, so it lands closer to “ba” than “bo”.",
        },
      ],
      check: {
        question:
          "Someone greets you and says «Как дела?». What are they asking?",
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
          script: "Меня зовут Алекс.",
          scriptAnnotated: "Меня́ зову́т Але́кс.",
          english: "My name is Alex",
          pronunciation: {
            kind: "stress",
            words: [
              [{ text: "mee" }, { text: "nya", stressed: true }],
              [{ text: "za" }, { text: "voot", stressed: true }],
              [{ text: "a", stressed: true }, { text: "leks" }],
            ],
          },
          note: "Literally “they call me Alex”. Swap in your own name and the sentence is done.",
        },
        {
          id: "kak-vas-zovut",
          script: "Как вас зовут?",
          scriptAnnotated: "Как вас зову́т?",
          english: "What is your name? (formal)",
          pronunciation: {
            kind: "stress",
            words: [
              [{ text: "kak" }],
              [{ text: "vas" }],
              [{ text: "za" }, { text: "voot", stressed: true }],
            ],
          },
          note: "«вас» is the formal “you”. With someone you already know well, it becomes «Как тебя зовут?».",
        },
        {
          id: "ochen-priyatno",
          script: "Очень приятно.",
          scriptAnnotated: "О́чень прия́тно.",
          english: "Nice to meet you",
          pronunciation: {
            kind: "stress",
            words: [
              [{ text: "o", stressed: true }, { text: "cheen" }],
              [{ text: "pree" }, { text: "yat", stressed: true }, { text: "na" }],
            ],
          },
          note: "The standard reply after an exchange of names. Short, warm, and always correct.",
        },
        {
          id: "do-svidaniya",
          script: "До свидания!",
          scriptAnnotated: "До свида́ния!",
          english: "Goodbye",
          pronunciation: {
            kind: "stress",
            words: [
              [{ text: "da" }],
              [
                { text: "svee" },
                { text: "da", stressed: true },
                { text: "nee" },
                { text: "ya" },
              ],
            ],
          },
          note: "Neutral and safe in any setting. «Пока!» is the casual equivalent, and pairs with «Привет!».",
        },
      ],
      check: {
        question:
          "You have just been introduced to someone. Which phrase do you say?",
        choices: [
          { id: "a", label: "Очень приятно.", lang: "ru" },
          { id: "b", label: "До свидания!", lang: "ru" },
          { id: "c", label: "Как вас зовут?", lang: "ru" },
          { id: "d", label: "Хорошо!", lang: "ru" },
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
          script: "Поехали!",
          scriptAnnotated: "Пое́хали!",
          english: "Let's go",
          pronunciation: {
            kind: "stress",
            words: [
              [
                { text: "pa" },
                { text: "ye", stressed: true },
                { text: "kha" },
                { text: "lee" },
              ],
            ],
          },
          note: "Gagarin's word at launch in 1961, and still ordinary Russian for “let's get moving”.",
        },
        {
          id: "da-net",
          script: "Да / Нет",
          scriptAnnotated: "Да / Нет",
          english: "Yes / No",
          pronunciation: {
            kind: "stress",
            words: [[{ text: "da" }], SLASH, [{ text: "nyet" }]],
          },
          note: "«Нет» carries a soft “y” glide: nyet, not net.",
        },
        {
          id: "pozhaluysta",
          script: "Пожалуйста.",
          scriptAnnotated: "Пожа́луйста.",
          english: "Please / You're welcome",
          pronunciation: {
            kind: "stress",
            words: [
              [
                { text: "pa" },
                { text: "zhal", stressed: true },
                { text: "sta" },
              ],
            ],
          },
          note: "Spelled with more letters than it gets in speech — the middle collapses, so it lands as pa-ZHAL-sta. It answers «Спасибо» as well as making a request polite.",
        },
        {
          id: "ya-ne-ponimayu",
          script: "Я не понимаю.",
          scriptAnnotated: "Я не понима́ю.",
          english: "I don't understand",
          pronunciation: {
            kind: "stress",
            words: [
              [{ text: "ya" }],
              [{ text: "nee" }],
              [
                { text: "pa" },
                { text: "nee" },
                { text: "ma", stressed: true },
                { text: "yu" },
              ],
            ],
          },
          note: "The phrase that keeps a real conversation going instead of ending it. Worth over-practising.",
        },
      ],
      check: {
        question:
          "A conversation has moved faster than you can follow. Which phrase says so?",
        choices: [
          { id: "a", label: "Поехали!", lang: "ru" },
          { id: "b", label: "Я не понимаю.", lang: "ru" },
          { id: "c", label: "Пожалуйста.", lang: "ru" },
          { id: "d", label: "Меня зовут Алекс.", lang: "ru" },
        ],
        correctChoiceId: "b",
        explanation:
          "«Я не понимаю» — “I don't understand.” Said early and without apology, it usually gets you a slower, clearer repeat.",
      },
    },
  ],
};
