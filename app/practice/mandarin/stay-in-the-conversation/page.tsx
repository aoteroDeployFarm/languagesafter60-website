import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MissionExperience } from "@/components/mission/mission-experience";
import { getCourseById } from "@/lib/course/registry";
import { getMission } from "@/lib/mission/registry";

export const metadata: Metadata = {
  title: "Mission 1 — Stay in the Conversation (Mandarin)",
  description:
    "A guided Mandarin conversation built from phrases in Lessons 1–4: greet, introduce yourself, ask for slower speech, ask for a repeat, and close politely.",
};

/**
 * An explicit static route rather than a dynamic segment, so the page is
 * prerendered into the export like every other page on the site.
 */
export default function MandarinMissionPage() {
  const course = getCourseById("mandarin");
  const mission = getMission("mandarin", "stay-in-the-conversation");
  if (!course || !mission) notFound();
  return <MissionExperience mission={mission} course={course} />;
}
