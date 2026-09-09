/**
 * Site-wide constants. Kept free of environment values and personal paths so
 * everything here is safe to commit.
 */

export const site = {
  name: "Languages After 60",
  tagline: "Keep your mind active. Find your voice. Learn something new.",
  idea:
    "Life is always speaking. We're still learning how to listen — and how to respond.",
  description:
    "A working record of what an experienced musician and technologist is learning after 60 — Russian, Mandarin, and piano.",
} as const;

export type NavItem = {
  href: string;
  label: string;
  /** Short description used by the mobile navigation panel. */
  hint: string;
};

export const navigation: NavItem[] = [
  { href: "/learn/russian", label: "Russian", hint: "Three beginner lessons" },
  { href: "/learn/mandarin", label: "Mandarin", hint: "Three beginner lessons" },
  { href: "/music/piano", label: "Piano", hint: "A 90-day experiment" },
  { href: "/story/spanish", label: "Spanish", hint: "What already worked" },
  { href: "/about", label: "About", hint: "The project and the person" },
];
