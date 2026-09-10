/**
 * Guided missions — a scripted conversation built entirely from phrases the
 * learner has already met.
 *
 * Steps reference phrases by their existing course phrase id and never copy
 * phrase content. The course data stays the single source of truth for script,
 * pronunciation, pinyin, meaning and playback, so a mission can never drift
 * out of sync with the lesson that taught the phrase.
 *
 * Deterministic by design: fixed steps, fixed choices, fixed order. No model,
 * no network, no scoring.
 */

export type MissionStep = {
  /** Stable id, unique within the mission. */
  id: string;
  /** Short English framing of the situation. */
  context: string;
  /**
   * What the other person says, if anything, as a course phrase id. Rendered
   * in the target language with playback, exactly as the course renders it.
   */
  speakerPhraseId?: string;
  /** The phrase the learner should choose, as a course phrase id. */
  answerPhraseId: string;
  /**
   * Every choice in display order, including the answer. Written out rather
   * than shuffled so the position of the correct answer varies between steps
   * but never between visits — which keeps the mission testable.
   */
  choicePhraseIds: string[];
};

export type Mission = {
  /** Stable id, e.g. "russian-stay-in-the-conversation". */
  id: string;
  /** The course this mission belongs to, matching Course.id. */
  courseId: string;
  /** URL segment under /practice/<course>/. */
  slug: string;
  /** e.g. "Mission 1". */
  label: string;
  title: string;
  /** One line describing the situation. */
  tagline: string;
  /** A short paragraph shown before the first step. */
  intro: string;
  steps: MissionStep[];
  /** What the learner just did, listed on the completion screen. */
  accomplishments: string[];
};
