import type { Course } from "./types";

/**
 * Mandarin Chinese course content.
 *
 * Simplified characters throughout, with standard Hanyu Pinyin including tone
 * marks. Pinyin is a correct romanisation in its own right, so no English-style
 * respelling is offered alongside it — that would teach the wrong sounds and
 * give the learner two systems to unlearn later.
 *
 * Notes are used sparingly, and only where a pattern genuinely helps: tone
 * sandhi that makes the written tone differ from the spoken one, neutral tones,
 * and the few places where an English gloss would imply a one-to-one
 * equivalence that does not exist.
 *
 * `亚历克斯` (Yàlìkèsī) is the transliteration this course uses for Alex.
 */

export const mandarinCourse: Course = {
  id: "mandarin",
  name: "Mandarin After 60",
  shortName: "Mandarin",
  languageName: "Mandarin",
  scriptLang: "zh-Hans",
  pronunciationStyle: "pinyin",
  speech: {
    lang: "zh-CN",
    // Mainland Mandarin first, then other Mandarin-speaking locales. Bare "zh"
    // is last so a Cantonese zh-HK voice is only ever a final fallback.
    voiceLangPrefixes: ["zh-cn", "zh-hans", "zh-sg", "zh-tw", "zh"],
  },
  storageKey: "la60.mandarin.progress.v1",
  lessons: [
    {
      slug: "hello",
      number: 1,
      title: "Hello",
      summary:
        "Four phrases that carry a first exchange: a greeting, a question, an answer, and a thank you.",
      phrases: [
        {
          id: "ni-hao",
          script: "你好",
          english: "Hello",
          pronunciation: { kind: "pinyin", text: "nǐ hǎo" },
          note: "Two third tones in a row are not both said as written — the first rises, so this comes out closer to ní hǎo. Listen for it rather than forcing the marks.",
        },
        {
          id: "ni-hao-ma",
          script: "你好吗？",
          english: "How are you?",
          pronunciation: { kind: "pinyin", text: "nǐ hǎo ma?" },
          note: "吗 (ma) turns a statement into a yes-or-no question. It carries no tone of its own and no meaning you can translate — it simply marks the sentence as a question.",
        },
        {
          id: "wo-hen-hao",
          script: "我很好。",
          english: "I'm doing well",
          pronunciation: { kind: "pinyin", text: "wǒ hěn hǎo" },
          note: "很 (hěn) means “very”, but here it is just the ordinary link between “I” and “good”. This is “I'm well”, not “I'm very well”.",
        },
        {
          id: "xiexie",
          script: "谢谢。",
          english: "Thank you",
          pronunciation: { kind: "pinyin", text: "xièxie" },
          note: "The second syllable is unstressed and toneless — it drops away lightly rather than repeating the falling tone of the first.",
        },
      ],
      check: {
        question: "Someone greets you and says 你好吗？ What are they asking?",
        choices: [
          { id: "a", label: "How are you?" },
          { id: "b", label: "What is your name?" },
          { id: "c", label: "Thank you" },
          { id: "d", label: "Goodbye" },
        ],
        correctChoiceId: "a",
        explanation:
          "你好吗？ is “How are you?” — and 我很好。 (wǒ hěn hǎo) is a complete, natural answer.",
      },
    },
    {
      slug: "meet-someone",
      number: 2,
      title: "Meet Someone",
      summary:
        "Introduce yourself, ask for a name, and close the conversation without stalling.",
      phrases: [
        {
          id: "wo-jiao",
          script: "我叫亚历克斯。",
          english: "My name is Alex",
          pronunciation: { kind: "pinyin", text: "Wǒ jiào Yàlìkèsī." },
          note: "叫 (jiào) is literally “to be called”. 亚历克斯 is how Alex is written in Chinese — a sound-by-sound transliteration, so swap in your own name and the sentence still works.",
        },
        {
          id: "ni-jiao-shenme",
          script: "你叫什么名字？",
          english: "What is your name?",
          pronunciation: { kind: "pinyin", text: "Nǐ jiào shénme míngzi?" },
          note: "The 字 in 名字 is toneless here — míngzi, with the weight on the first syllable.",
        },
        {
          id: "hen-gaoxing",
          script: "很高兴认识你。",
          english: "Nice to meet you",
          pronunciation: { kind: "pinyin", text: "Hěn gāoxìng rènshi nǐ." },
          note: "The standard reply once names have been exchanged. 认识 (rènshi) is “to know someone” — the 识 is toneless.",
        },
        {
          id: "zaijian",
          script: "再见！",
          english: "Goodbye",
          pronunciation: { kind: "pinyin", text: "Zàijiàn!" },
          note: "Literally “again see” — closer to “see you again” than to a final farewell. Two falling tones, one after the other.",
        },
      ],
      check: {
        question: "You have just been told someone's name. Which phrase do you say?",
        choices: [
          { id: "a", label: "很高兴认识你。", lang: "zh-Hans" },
          { id: "b", label: "再见！", lang: "zh-Hans" },
          { id: "c", label: "你叫什么名字？", lang: "zh-Hans" },
          { id: "d", label: "谢谢。", lang: "zh-Hans" },
        ],
        correctChoiceId: "a",
        explanation:
          "很高兴认识你。 — “Nice to meet you” — is what follows an exchange of names.",
      },
    },
    {
      slug: "lets-go",
      number: 3,
      title: "Let's Go",
      summary:
        "Move a conversation forward, stay polite, and say the most useful sentence a beginner owns: I don't understand.",
      phrases: [
        {
          id: "women-zou-ba",
          script: "我们走吧！",
          english: "Let's go",
          pronunciation: { kind: "pinyin", text: "Wǒmen zǒu ba!" },
          note: "吧 (ba) softens the sentence from an order into a suggestion — “let's go”, rather than “go”.",
        },
        {
          id: "qing",
          script: "请。",
          english: "Please",
          pronunciation: { kind: "pinyin", text: "Qǐng." },
          note: "Usually leads into a verb — 请坐 (qǐng zuò), “please sit”. On its own it works as “please, go ahead”, but it is not the all-purpose tacked-on “please” of English.",
        },
        {
          id: "bu-keqi",
          script: "不客气。",
          english: "You're welcome",
          pronunciation: { kind: "pinyin", text: "Bú kèqi." },
          note: "不 is normally bù, but before a falling tone it shifts to rising — bú kèqi. The written tone and the spoken tone genuinely differ here.",
        },
        {
          id: "wo-bu-mingbai",
          script: "我不明白。",
          english: "I don't understand",
          pronunciation: { kind: "pinyin", text: "Wǒ bù míngbai." },
          note: "Here 不 stays bù, because 明 is a rising tone rather than a falling one. The phrase that keeps a real conversation going instead of ending it.",
        },
      ],
      check: {
        question:
          "A conversation has moved faster than you can follow. Which phrase says so?",
        choices: [
          { id: "a", label: "我们走吧！", lang: "zh-Hans" },
          { id: "b", label: "我不明白。", lang: "zh-Hans" },
          { id: "c", label: "不客气。", lang: "zh-Hans" },
          { id: "d", label: "请。", lang: "zh-Hans" },
        ],
        correctChoiceId: "b",
        explanation:
          "我不明白。 — “I don't understand.” Said early and without apology, it usually gets you a slower, clearer repeat.",
      },
    },
    {
      slug: "help-me-understand",
      number: 4,
      title: "Help Me Understand",
      summary:
        "Ask for a repeat or for slower speech, and explain that you speak only a little Mandarin.",
      phrases: [
        {
          id: "qing-zai-shuo",
          script: "请再说一遍。",
          english: "Please say that again",
          pronunciation: { kind: "pinyin", text: "Qǐng zài shuō yí biàn." },
          note: "一 is normally yī, but before a falling tone it shifts to rising — yí biàn. The phrase is literally “say it one more time”.",
        },
        {
          id: "qing-shuo-man",
          script: "请说慢一点。",
          english: "Please speak a little more slowly",
          pronunciation: { kind: "pinyin", text: "Qǐng shuō màn yìdiǎn." },
          note: "Here 一 goes the other way — before the third tone of 点 it becomes falling, yìdiǎn. 一点 softens the request to “a little”.",
        },
        {
          id: "wo-hui-shuo-yidian",
          script: "我会说一点中文。",
          english: "I can speak a little Chinese",
          pronunciation: { kind: "pinyin", text: "Wǒ huì shuō yìdiǎn Zhōngwén." },
          note: "会 (huì) is “can” in the sense of knowing how. Saying this early sets expectations and usually earns you a slower, more patient conversation.",
        },
        {
          id: "ni-hui-shuo-yingyu",
          script: "你会说英语吗？",
          english: "Do you speak English?",
          pronunciation: { kind: "pinyin", text: "Nǐ huì shuō Yīngyǔ ma?" },
          note: "你 is the everyday informal “you”. 吗 turns the sentence into a question — the same particle from Lesson 1.",
        },
      ],
      check: {
        question:
          "You did not catch what someone said. Which phrase asks them to say it again?",
        choices: [
          { id: "a", label: "请再说一遍。", lang: "zh-Hans" },
          { id: "b", label: "请说慢一点。", lang: "zh-Hans" },
          { id: "c", label: "我会说一点中文。", lang: "zh-Hans" },
          { id: "d", label: "你会说英语吗？", lang: "zh-Hans" },
        ],
        correctChoiceId: "a",
        explanation:
          "请再说一遍。 — “Please say that again.” 再…一遍 is literally “one more time”.",
      },
    },
  ],
};
