import Link from "next/link";
import type { Mission } from "@/lib/mission/types";
import { missionHref } from "@/lib/mission/registry";

/**
 * The one place a mission is advertised, used by both the course page and the
 * My Learning summaries so the wording and prominence stay in step.
 *
 * Deliberately a bordered callout rather than another button in the action
 * row: it keeps the row from growing, and it never competes with the primary
 * "continue your lessons" action for someone who is still working through
 * them. The mission is never locked — only framed differently.
 */
export function MissionCallout({
  mission,
  courseComplete,
}: {
  mission: Mission;
  courseComplete: boolean;
}) {
  return (
    <div className="rounded-lg border border-line bg-surface-tint p-4">
      <p className="eyebrow">{mission.label}</p>
      <p className="mt-1 font-display text-lg text-ink-900">{mission.title}</p>
      <p className="mt-1 text-[0.97rem] text-muted-700">
        {courseComplete
          ? "A guided conversation that puts Lessons 1–4 together. Nothing new to learn — just the phrases you have, in the order a real exchange needs them."
          : "You can try this mission now. It uses phrases from Lessons 1–4."}
      </p>
      <Link
        href={missionHref(mission)}
        className={`mt-3 ${courseComplete ? "btn btn-primary" : "btn btn-secondary"}`}
      >
        Start {mission.label}
        <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}
