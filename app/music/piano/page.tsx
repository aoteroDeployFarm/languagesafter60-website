import type { Metadata } from "next";
import Link from "next/link";
import { phases, practiceRules } from "@/lib/piano/plan";

export const metadata: Metadata = {
  title: "The Piano Journey",
  description:
    "Can a guitar and bass player learn piano after 60? A 90-day practice experiment with weekly checkpoints, written from the perspective of an experienced musician learning a new instrument.",
};

const advantages = [
  {
    title: "Theory is already in place",
    body: "Intervals, chord construction, keys, and progressions do not need to be learned again. They need to be relocated onto a different physical map.",
  },
  {
    title: "Time is already internal",
    body: "Decades of playing bass means the pulse is not something I count — it is something I feel. That removes an entire category of beginner problem.",
  },
  {
    title: "The ear is trained",
    body: "I can hear when something is wrong long before I can explain why. On a new instrument that is the difference between practising and just repeating.",
  },
  {
    title: "I know what learning feels like",
    body: "Guitar and bass both had long, unglamorous middles. I do not mistake a bad week for a lack of aptitude any more.",
  },
];

const challenges = [
  {
    title: "Keyboard geography",
    body: "A guitar shape moves; a piano shape does not. Every key has its own fingering, and the pattern recognition I rely on has to be rebuilt in a linear, black-and-white layout.",
  },
  {
    title: "Hand independence",
    body: "On guitar and bass, my hands are two halves of one action. Piano asks each hand to carry a separate line, in a separate rhythm, at the same time. This is the real work.",
  },
  {
    title: "Touch",
    body: "Volume and tone come from how a key is struck — not from a pick, a pickup, or an amp. Dynamics become a physical skill in the fingers rather than a setting.",
  },
  {
    title: "Reading two clefs",
    body: "Bass clef and treble clef, simultaneously, describing two independent parts. It is closer to reading two lines of text at once than to anything a single-staff instrument asks for.",
  },
];

export default function PianoPage() {
  return (
    <>
      <section className="bg-ink-900 text-white">
        <div className="shell py-14 sm:py-16">
          <div className="max-w-3xl">
            <p className="text-sm font-bold tracking-[0.11em] text-accent-300 uppercase">
              Music · The piano journey
            </p>
            <h1 className="mt-4 font-display text-[2.15rem] leading-[1.12] font-semibold sm:text-5xl">
              Can a guitar and bass player learn piano after 60?
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-brand-100">
              This is not learning music from zero. I read, I hear, I play. The
              question is narrower and more interesting than “can I learn an
              instrument” — it is whether thirty years of musical knowledge
              transfers into a body that has never done this particular thing.
            </p>
          </div>
        </div>
      </section>

      <div className="shell-narrow py-14">
        <section aria-labelledby="why-piano">
          <p className="eyebrow">Why piano, why now</p>
          <h2
            id="why-piano"
            className="mt-2 font-display text-2xl text-ink-900 sm:text-3xl"
          >
            The instrument that shows you everything at once
          </h2>
          <div className="copy mt-5">
            <p>
              On guitar and bass, harmony is something I feel my way around — a
              shape under the fingers, a movement up the neck. On piano the
              whole system is laid out in front of you, visible and unavoidable.
              Every interval has a distance you can see. Every chord has a
              literal shape in space.
            </p>
            <p>
              I chose piano because it makes the thing I already know{" "}
              <strong>visible</strong>, and because it demands a physical skill
              I genuinely do not have. That combination — familiar knowledge,
              unfamiliar body — is the same shape as learning Russian while
              already speaking Spanish. Both projects are running at once on
              purpose.
            </p>
          </div>
        </section>

        <section aria-labelledby="advantages" className="mt-14">
          <h2
            id="advantages"
            className="font-display text-2xl text-ink-900 sm:text-3xl"
          >
            What comes with me from guitar and bass
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {advantages.map((item) => (
              <li key={item.title} className="card border-l-4 border-l-brand-600 p-5">
                <h3 className="font-sans text-base font-bold text-ink-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-[0.97rem] text-muted-700">{item.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="challenges" className="mt-14">
          <h2
            id="challenges"
            className="font-display text-2xl text-ink-900 sm:text-3xl"
          >
            What does not come with me
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {challenges.map((item) => (
              <li
                key={item.title}
                className="card border-l-4 border-l-accent-500 p-5"
              >
                <h3 className="font-sans text-base font-bold text-ink-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-[0.97rem] text-muted-700">{item.body}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section
        aria-labelledby="experiment"
        className="border-y border-line bg-surface-tint"
      >
        <div className="shell-narrow py-14">
          <p className="eyebrow">The experiment</p>
          <h2
            id="experiment"
            className="mt-2 font-display text-2xl text-ink-900 sm:text-3xl"
          >
            Ninety days, twenty-five minutes a day
          </h2>
          <p className="mt-4 text-lg text-muted-700">
            Three phases, twelve weekly checkpoints, and a definition of “done”
            for each one that can be observed rather than felt. The plan is
            small on purpose: the failure mode at this stage is an ambitious
            schedule quietly abandoned in week three.
          </p>

          <h3 className="mt-9 font-sans text-lg font-bold text-ink-900">
            The rules
          </h3>
          <ul className="copy mt-3">
            {practiceRules.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>

          <div className="mt-10 space-y-8">
            {phases.map((phase) => (
              <article key={phase.id} className="card p-6">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="eyebrow">{phase.label}</span>
                  <span className="text-sm text-muted-600">{phase.days}</span>
                </div>
                <h3 className="mt-2 font-display text-xl text-ink-900">
                  {phase.headline}
                </h3>
                <p className="mt-2 text-muted-700">{phase.description}</p>

                <div className="mt-5 overflow-x-auto">
                  <table className="w-full min-w-[34rem] border-collapse text-left text-[0.95rem]">
                    <caption className="sr-only">
                      Weekly checkpoints for {phase.headline}
                    </caption>
                    <thead>
                      <tr className="border-b border-line">
                        <th scope="col" className="py-2 pr-4 font-semibold text-ink-800">
                          Week
                        </th>
                        <th scope="col" className="py-2 pr-4 font-semibold text-ink-800">
                          Focus
                        </th>
                        <th scope="col" className="py-2 font-semibold text-ink-800">
                          Counts as done when
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {phase.checkpoints.map((checkpoint) => (
                        <tr
                          key={checkpoint.week}
                          className="border-b border-line-soft last:border-0"
                        >
                          <th
                            scope="row"
                            className="py-3 pr-4 align-top font-bold text-brand-700"
                          >
                            {checkpoint.week}
                          </th>
                          <td className="py-3 pr-4 align-top text-ink-800">
                            {checkpoint.focus}
                          </td>
                          <td className="py-3 align-top text-muted-700">
                            {checkpoint.done}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="convergence" className="shell-narrow py-14">
        <p className="eyebrow">Where the two projects meet</p>
        <h2
          id="convergence"
          className="mt-2 font-display text-2xl text-ink-900 sm:text-3xl"
        >
          The goal at the end of both: one Russian song, played and understood
        </h2>
        <div className="copy mt-5">
          <p>
            The two tracks on this site look unrelated. They are not. The
            marker I am working toward is a single Russian song — learned on
            piano, with the lyrics understood rather than phonetically imitated,
            and the stress falling where a Russian speaker would put it.
          </p>
          <p>
            That is a genuinely hard target. It needs enough piano to play the
            thing, enough Russian to know what I am saying, and enough of both
            to make the words and the phrasing line up. Nothing about it is
            scheduled yet. When it happens, it will be documented here — and if
            it does not happen, that gets written up too.
          </p>
          <p>
            <Link href="/learn/russian" className="link-inline">
              The Russian lessons start here
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
