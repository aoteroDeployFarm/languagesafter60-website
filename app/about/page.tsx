import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "What Languages After 60 is, who is writing it, and what it deliberately does not claim.",
};

const areas = [
  {
    name: "Languages of Expression",
    body: "Spoken language and music — the systems we use to say something. Russian and piano both live here, which is why they are the two projects running now.",
  },
  {
    name: "Languages of Vitality",
    body: "The physical practice that makes sustained learning possible. Not a health programme, and not a claim about outcomes.",
  },
  {
    name: "Languages of Connection",
    body: "What learning is ultimately for: conversation, playing with other people, being understood in a room you would otherwise be quiet in.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-ink-900 text-white">
        <div className="shell py-14 sm:py-16">
          <div className="max-w-3xl">
            <p className="text-sm font-bold tracking-[0.11em] text-accent-300 uppercase">
              About
            </p>
            <h1 className="mt-4 font-display text-[2.15rem] leading-[1.12] font-semibold sm:text-[3rem]">
              {site.idea}
            </h1>
          </div>
        </div>
      </section>

      <div className="shell-narrow py-14">
        <section aria-labelledby="what-this-is">
          <h2
            id="what-this-is"
            className="font-display text-2xl text-ink-900 sm:text-3xl"
          >
            What this is
          </h2>
          <div className="copy mt-5">
            <p>
              Languages After 60 documents how an experienced musician and
              technologist keeps learning after 60. I play guitar and bass, I
              have spent a career in technology, and Spanish is my second
              language. I am now starting Russian and taking up piano.
            </p>
            <p>
              The site exists because most material written for people my age
              either sells a shortcut or lowers the bar. I am not interested in
              either. What is genuinely useful is a record of the actual work:
              what the practice schedule is, which parts are harder than
              expected, and what happens when a week goes badly.
            </p>
            <p>
              Everything here is written from inside the process, not after it.
              I am a learner writing about learning — not a certified language
              instructor and not a music teacher.
            </p>
          </div>
        </section>

        <section aria-labelledby="projects" className="mt-14">
          <h2
            id="projects"
            className="font-display text-2xl text-ink-900 sm:text-3xl"
          >
            The two projects
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Link href="/learn/russian" className="card block p-5 hover:border-brand-500">
              <h3 className="font-display text-xl text-ink-900">Russian</h3>
              <p className="mt-2 text-[0.97rem] text-muted-700">
                Three beginner lessons, built to be spoken aloud. A deliberately
                unfamiliar language, chosen because Spanish offers no shortcut
                into it.
              </p>
              <span className="mt-3 inline-block font-semibold text-brand-700">
                Start Russian →
              </span>
            </Link>
            <Link href="/music/piano" className="card block p-5 hover:border-brand-500">
              <h3 className="font-display text-xl text-ink-900">Piano</h3>
              <p className="mt-2 text-[0.97rem] text-muted-700">
                A 90-day experiment in translating what I know on guitar and
                bass onto an instrument that works nothing like either.
              </p>
              <span className="mt-3 inline-block font-semibold text-brand-700">
                Follow the journey →
              </span>
            </Link>
          </div>
        </section>

        <section aria-labelledby="who-for" className="mt-14">
          <h2
            id="who-for"
            className="font-display text-2xl text-ink-900 sm:text-3xl"
          >
            Who it is for
          </h2>
          <div className="copy mt-5">
            <p>
              Adults around 60 and older who want to keep learning, creating,
              and taking on things that are genuinely difficult. People who have
              already done hard things and do not need to be encouraged so much
              as accompanied.
            </p>
            <p>
              If you are looking for a gentle activity to fill time, this
              probably is not it. The projects here are chosen because they are
              hard.
            </p>
          </div>
        </section>

        <section aria-labelledby="structure" className="mt-14">
          <h2
            id="structure"
            className="font-display text-2xl text-ink-900 sm:text-3xl"
          >
            How it is organised
          </h2>
          <p className="copy mt-5">
            Over time the site is organised around three areas. Only the first
            has anything real in it yet, and sections appear when there is work
            to put in them — not before.
          </p>
          <ul className="mt-6 space-y-4">
            {areas.map((area, index) => (
              <li key={area.name} className="card p-5">
                <div className="flex items-baseline gap-3">
                  <span
                    aria-hidden="true"
                    className="font-display text-lg font-semibold text-accent-600"
                  >
                    0{index + 1}
                  </span>
                  <h3 className="font-sans text-base font-bold text-ink-900">
                    {area.name}
                  </h3>
                </div>
                <p className="mt-2 text-[0.97rem] text-muted-700">{area.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="not-claiming" className="mt-14">
          <h2
            id="not-claiming"
            className="font-display text-2xl text-ink-900 sm:text-3xl"
          >
            What this site does not claim
          </h2>
          <div className="copy mt-5">
            <p>
              Being straight about this matters more than it might seem, because
              the space around “learning after 60” is full of claims that are
              not supported.
            </p>
            <ul>
              <li>
                This site does not claim that learning a language or an
                instrument prevents, treats, delays, or reverses dementia or any
                other medical or cognitive condition.
              </li>
              <li>
                It offers no medical, cognitive, or therapeutic advice. If you
                have a health question, that is a conversation for a qualified
                clinician.
              </li>
              <li>
                It is not professional language instruction or music teaching,
                and it is not a substitute for either.
              </li>
              <li>
                Nothing here is anti-aging. Learning Russian at 60 is
                interesting because it is worth doing, not because it promises
                to make anyone younger.
              </li>
            </ul>
            <p>
              What is true and worth saying plainly: staying active and engaged
              — learning things, making things, staying in contact with other
              people — is a good way to spend this stretch of life. That is the
              whole argument. Should specific health research ever be cited on
              this site, it will be sourced and carefully qualified rather than
              summarised into a promise.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
