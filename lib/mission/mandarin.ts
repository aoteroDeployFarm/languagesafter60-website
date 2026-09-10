import type { Mission } from "./types";

/**
 * Mandarin Mission 1.
 *
 * Every phrase id below comes from lib/course/mandarin.ts, including its
 * punctuation — 你好 has no exclamation mark in the course, so the mission uses
 * the course's form rather than introducing a second version of the phrase.
 */
export const mandarinMission1: Mission = {
  id: "mandarin-stay-in-the-conversation",
  courseId: "mandarin",
  slug: "stay-in-the-conversation",
  label: "Mission 1",
  title: "Stay in the Conversation",
  tagline:
    "A short exchange with someone you have just met, using only phrases from Lessons 1–4.",
  intro:
    "Six moments from an ordinary first conversation. You will not catch every word — nobody does at this stage. The point is to keep the exchange going anyway: greet, introduce yourself, say how much Mandarin you have, ask for help when you need it, and close politely.",
  steps: [
    {
      id: "greet-back",
      context: "Someone greets you. What do you say?",
      speakerPhraseId: "ni-hao",
      answerPhraseId: "ni-hao",
      choicePhraseIds: ["ni-hao", "xiexie", "zaijian"],
    },
    {
      id: "introduce-yourself",
      context: "They ask your name. How do you respond?",
      speakerPhraseId: "ni-jiao-shenme",
      answerPhraseId: "wo-jiao",
      choicePhraseIds: ["hen-gaoxing", "ni-jiao-shenme", "wo-jiao"],
    },
    {
      id: "set-expectations",
      context:
        "You want them to know that you can speak only a little Chinese, so they can help you.",
      answerPhraseId: "wo-hui-shuo-yidian",
      choicePhraseIds: [
        "wo-bu-mingbai",
        "wo-hui-shuo-yidian",
        "ni-hui-shuo-yingyu",
      ],
    },
    {
      id: "ask-slower",
      context:
        "They answer, but the words are coming too fast. You want them to slow down.",
      answerPhraseId: "qing-shuo-man",
      choicePhraseIds: ["wo-hen-hao", "qing-zai-shuo", "qing-shuo-man"],
    },
    {
      id: "ask-repeat",
      context: "They slowed down, but you still missed it. Ask them to say it again.",
      answerPhraseId: "qing-zai-shuo",
      choicePhraseIds: ["qing-zai-shuo", "qing-shuo-man", "qing"],
    },
    {
      id: "close-politely",
      context: "The conversation is ending. What do you say?",
      speakerPhraseId: "zaijian",
      answerPhraseId: "zaijian",
      choicePhraseIds: ["ni-hao", "zaijian", "xiexie"],
    },
  ],
  accomplishments: [
    "Returned a greeting without hesitating",
    "Introduced yourself by name",
    "Told someone how much Mandarin you have, before it became a problem",
    "Asked for slower speech, and then for a repeat",
    "Closed the conversation politely",
  ],
};
