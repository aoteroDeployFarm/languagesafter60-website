import type { Mission } from "./types";

/**
 * Russian Mission 1.
 *
 * Every phrase id below comes from lib/course/russian.ts. The registry checks
 * them at module load, so a typo fails the build rather than reaching anyone.
 */
export const russianMission1: Mission = {
  id: "russian-stay-in-the-conversation",
  courseId: "russian",
  slug: "stay-in-the-conversation",
  label: "Mission 1",
  title: "Stay in the Conversation",
  tagline:
    "A short exchange with someone you have just met, using only phrases from Lessons 1–4.",
  intro:
    "Six moments from an ordinary first conversation. You will not understand every word — nobody does at this stage. The point is to keep the exchange going anyway: greet, introduce yourself, say how much Russian you have, ask for help when you need it, and close politely.",
  steps: [
    {
      id: "greet-back",
      context: "Someone greets you. What do you say?",
      speakerPhraseId: "privet",
      answerPhraseId: "privet",
      // Correct answer first here; the position moves around from step to step.
      choicePhraseIds: ["privet", "spasibo", "do-svidaniya"],
    },
    {
      id: "introduce-yourself",
      context: "They ask your name. How do you respond?",
      speakerPhraseId: "kak-vas-zovut",
      answerPhraseId: "menya-zovut",
      choicePhraseIds: ["ochen-priyatno", "kak-vas-zovut", "menya-zovut"],
    },
    {
      id: "set-expectations",
      context:
        "You want them to know that you speak only a little Russian, so they can help you.",
      answerPhraseId: "ya-nemnogo-govoryu",
      choicePhraseIds: [
        "ya-ne-ponimayu",
        "ya-nemnogo-govoryu",
        "vy-govorite-po-angliyski",
      ],
    },
    {
      id: "ask-slower",
      context:
        "They answer, but the words are coming too fast. You want them to slow down.",
      answerPhraseId: "pomedlennee",
      choicePhraseIds: ["khorosho", "povtorite", "pomedlennee"],
    },
    {
      id: "ask-repeat",
      context: "They slowed down, but you still missed it. Ask them to say it again.",
      answerPhraseId: "povtorite",
      choicePhraseIds: ["povtorite", "pomedlennee", "pozhaluysta"],
    },
    {
      id: "close-politely",
      context: "The conversation is ending. What do you say?",
      speakerPhraseId: "do-svidaniya",
      answerPhraseId: "do-svidaniya",
      choicePhraseIds: ["privet", "do-svidaniya", "spasibo"],
    },
  ],
  accomplishments: [
    "Returned a greeting without hesitating",
    "Introduced yourself by name",
    "Told someone how much Russian you have, before it became a problem",
    "Asked for slower speech, and then for a repeat",
    "Closed the conversation politely",
  ],
};
