/**
 * The 90-day piano experiment, as data.
 *
 * Presentation lives in the route. Keeping the plan here means the weekly
 * checkpoints can be revised as the experiment actually runs without touching
 * layout code.
 */

export type Checkpoint = {
  week: number;
  /** What is being practised that week. */
  focus: string;
  /** The observable thing that counts as "done" — no vague goals. */
  done: string;
};

export type Phase = {
  id: string;
  label: string;
  days: string;
  headline: string;
  description: string;
  checkpoints: Checkpoint[];
};

export const phases: Phase[] = [
  {
    id: "geography",
    label: "Phase 1",
    days: "Days 1–30",
    headline: "Learn the geography",
    description:
      "On guitar, a shape is a shape anywhere on the neck. On piano, every key looks different and every key feels different. The first month is spent making the layout automatic enough that I stop looking down.",
    checkpoints: [
      {
        week: 1,
        focus: "Hand position, posture, and finding notes without looking",
        done: "Name and play any white key from the black-key groups, eyes closed, in under two seconds",
      },
      {
        week: 2,
        focus: "Right hand alone: five-finger patterns in C, G, and F",
        done: "Play each pattern up and down cleanly at a slow tempo with a metronome",
      },
      {
        week: 3,
        focus: "Left hand alone: root notes and simple bass movement",
        done: "Walk a simple bass line under a chord progression I already know from bass",
      },
      {
        week: 4,
        focus: "Triads and inversions I already understand in theory",
        done: "Play major and minor triads and their inversions in three keys without hunting",
      },
    ],
  },
  {
    id: "independence",
    label: "Phase 2",
    days: "Days 31–60",
    headline: "Make the hands independent",
    description:
      "This is the part guitar and bass genuinely did not prepare me for. My hands have spent decades cooperating on one task. Piano asks them to run two different jobs at the same time.",
    checkpoints: [
      {
        week: 5,
        focus: "Both hands together, same rhythm",
        done: "Play a simple melody with block chords underneath, in time, without stopping",
      },
      {
        week: 6,
        focus: "Different rhythms between hands",
        done: "Hold whole notes in the left hand while the right hand plays quarter notes, without either drifting",
      },
      {
        week: 7,
        focus: "Dynamics and touch — the thing a fretboard never taught me",
        done: "Play the same phrase quiet and loud on purpose, and hear the difference on a recording",
      },
      {
        week: 8,
        focus: "One short piece, start to finish",
        done: "Play a complete beginner piece from memory at a slow, steady tempo",
      },
    ],
  },
  {
    id: "reading",
    label: "Phase 3",
    days: "Days 61–90",
    headline: "Read two staves at once",
    description:
      "I have read music before, but rarely two clefs simultaneously and never with this division of labour. The last month is about reading rather than memorising, so the instrument stays open-ended.",
    checkpoints: [
      {
        week: 9,
        focus: "Treble clef reading at sight, slowly",
        done: "Sight-read an unfamiliar eight-bar melody with no more than two stops",
      },
      {
        week: 10,
        focus: "Bass clef reading — a genuinely new alphabet for my eyes",
        done: "Sight-read an eight-bar bass line without translating note-by-note",
      },
      {
        week: 11,
        focus: "Grand staff: both clefs together",
        done: "Sight-read a simple two-hand piece at half tempo",
      },
      {
        week: 12,
        focus: "Review, record, and assess honestly",
        done: "Record the same piece recorded in week 8 and compare the two takes",
      },
    ],
  },
];

/** The daily commitment. Deliberately small enough to keep for 90 days. */
export const practiceRules = [
  "Twenty-five minutes a day, six days a week. Short and kept beats long and abandoned.",
  "Five minutes of it with a metronome, always. Tempo honesty is the fastest feedback available.",
  "Record one take every week, even a bad one. Memory is a flattering witness.",
  "Hands separately before hands together, every single session.",
  "One skipped day is data. Three in a row means the plan is wrong, not the person.",
];
