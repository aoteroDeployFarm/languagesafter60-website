/**
 * My Learning — the learner's local workspace state.
 *
 * This is deliberately small. It holds preferences and pointers, never content:
 * phrase identifiers rather than phrases, a course id rather than a history.
 * Nothing here identifies a person, and nothing here leaves the browser.
 */

export type PlaybackSpeed = "normal" | "slow";

/**
 * Speech synthesis rates.
 *
 * "normal" is 0.85 because that is the rate the courses have always used —
 * deliberately a little under conversational pace, since this is a
 * pronunciation model rather than speech. Keeping it means existing learners
 * hear exactly what they heard before this feature existed. "slow" goes
 * meaningfully below that without dropping into the distorted range where
 * synthesised voices stop sounding like the language.
 */
export const PLAYBACK_RATES: Record<PlaybackSpeed, number> = {
  normal: 0.85,
  slow: 0.7,
};

export type LastPracticed = {
  courseId: string;
  /** ISO timestamp. Used only to know which course was most recent. */
  at: string;
};

export type Profile = {
  version: 1;
  /** courseId -> stable phrase ids the learner marked for practice. */
  savedPhrases: Record<string, string[]>;
  playbackSpeed: PlaybackSpeed;
  lastPracticed: LastPracticed | null;
};

export const PROFILE_VERSION = 1 as const;

export const emptyProfile: Profile = {
  version: PROFILE_VERSION,
  savedPhrases: {},
  playbackSpeed: "normal",
  lastPracticed: null,
};

/** Whether local state can be read and written at all. */
export type StorageStatus = "loading" | "ready" | "unavailable";
