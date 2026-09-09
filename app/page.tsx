import Link from "next/link";
import { mandarinCourse } from "@/lib/course/mandarin";
import { russianCourse } from "@/lib/course/russian";
import { site } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-ink-900 text-white">
        <div className="shell py-16 sm:py-20 lg:py-24">
          <div className="max-w-3xl">
            <p className="text-sm font-bold tracking-[0.11em] text-accent-300 uppercase">
              {site.tagline}
            </p>
            <h1 className="mt-5 font-display text-[2.25rem] leading-[1.1] font-semibold sm:text-5xl lg:text-[3.5rem]">
              I am 60-plus, and I am learning Russian and piano in public.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-brand-100 sm:text-xl">
              Languages After 60 is the working record of what that actually
              takes — the lessons, the practice plans, the parts that are
              harder than expected. Not advice from a teacher. Notes from
              someone doing the work now.
            </p>

            {/* Both language courses are live and interactive, so they carry
                equal weight; the piano journey stays the outlined secondary
                action. flex-wrap lets the three fall onto a second row rather
                than overflowing at tablet widths. */}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Link href="/learn/russian" className="btn btn-on-ink">
                Start Russian
                <span aria-hidden="true">→</span>
              </Link>
              <Link href="/learn/mandarin" className="btn btn-on-ink">
                Start Mandarin
                <span aria-hidden="true">→</span>
              </Link>
              <Link href="/music/piano" className="btn btn-on-ink-outline">
                Follow the piano journey
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Who and why */}
      <section aria-labelledby="who" className="shell py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <p className="eyebrow">Who is doing this</p>
            <h2
              id="who"
              className="mt-2 font-display text-3xl leading-tight text-ink-900 sm:text-[2.25rem]"
            >
              Alex — musician, technologist, second-language speaker
            </h2>
            <div className="copy mt-5">
              <p>
                I play guitar and bass, and I have spent a career in technology.
                Spanish is my second language — learned as an adult, used in
                real conversations, and hard-won enough that I know exactly how
                long the middle of that process takes.
              </p>
              <p>
                So this is not a beginner writing about beginning. It is
                somebody who has finished a long learning project once, starting
                two more, and keeping an honest record of both.
              </p>
              <p>
                <Link href="/about" className="link-inline">
                  More about the project
                </Link>
              </p>
            </div>
          </div>

          <div>
            <p className="eyebrow">What is running now</p>
            <div className="mt-4 space-y-5">
              <TrackCard
                href="/learn/russian"
                kicker="Languages"
                title="Russian"
                cta="Start lesson 1"
                body="A new alphabet, unfamiliar sounds, and no shared vocabulary to lean on. Russian was chosen precisely because nothing about Spanish makes it easy. It is the honest test of whether the method transfers."
                detail={`${russianCourse.lessons.length} lessons ready — ${russianCourse.lessons
                  .map((lesson) => lesson.title)
                  .join(", ")}`}
              />
              <TrackCard
                href="/learn/mandarin"
                kicker="Languages"
                title="Mandarin"
                cta="Begin Mandarin"
                body="Newly begun. No conjugations, no genders, no tenses — and almost all of the difficulty moved into the ear, where pitch is part of the word. A different kind of hard from Russian, and an inviting one for a musician."
                detail={`${mandarinCourse.lessons.length} lessons ready — ${mandarinCourse.lessons
                  .map((lesson) => lesson.title)
                  .join(", ")}`}
              />
              <TrackCard
                href="/music/piano"
                kicker="Music"
                title="Piano"
                cta="Read the plan"
                body="Not learning music from zero — I already read, hear, and play. Piano is the problem of translating what my hands know on a fretboard into an entirely different geometry, with both hands working independently."
                detail="A 90-day practice experiment, tracked weekly"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Spanish as evidence */}
      <section
        aria-labelledby="spanish-evidence"
        className="border-y border-line bg-surface-tint"
      >
        <div className="shell py-14 sm:py-16">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-2xl">
              <p className="eyebrow">Evidence, not a claim</p>
              <h2
                id="spanish-evidence"
                className="mt-2 font-display text-2xl text-ink-900 sm:text-3xl"
              >
                Spanish came first — and it is the reason any of this is
                credible
              </h2>
              <p className="mt-4 text-lg text-muted-700">
                Spanish is the second language I actually learned. It taught me
                what a plateau feels like, how much of the work is listening
                rather than studying, and why persistence beats intensity over a
                long enough run. Russian is that same method applied to a much
                harder problem.
              </p>
            </div>
            <Link href="/story/spanish" className="btn btn-secondary shrink-0">
              Read the Spanish story
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Where it goes */}
      <section aria-labelledby="direction" className="shell py-16">
        <div className="max-w-2xl">
          <p className="eyebrow">Where this goes</p>
          <h2
            id="direction"
            className="mt-2 font-display text-2xl text-ink-900 sm:text-3xl"
          >
            {site.idea}
          </h2>
          <p className="mt-4 text-lg text-muted-700">
            Over time this site is organised around three kinds of language:
            expression, vitality, and connection. Only what is genuinely being
            worked on appears here — Russian, Mandarin, and piano, with Spanish
            as the record of what came before. Portuguese is on the list, not on
            the menu.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="/learn/russian" className="btn btn-primary">
              Start Russian
              <span aria-hidden="true">→</span>
            </Link>
            <Link href="/learn/mandarin" className="btn btn-secondary">
              Begin Mandarin
            </Link>
            <Link href="/music/piano" className="btn btn-secondary">
              Follow the piano journey
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function TrackCard({
  href,
  kicker,
  title,
  body,
  detail,
  cta,
}: {
  href: string;
  kicker: string;
  title: string;
  body: string;
  detail: string;
  cta: string;
}) {
  return (
    <article className="card p-6">
      <p className="text-xs font-bold tracking-[0.11em] text-muted-500 uppercase">
        {kicker}
      </p>
      <h3 className="mt-1.5 font-display text-2xl text-ink-900">{title}</h3>
      <p className="mt-3 text-muted-700">{body}</p>
      <p className="mt-4 border-t border-line-soft pt-3 text-sm text-muted-600">
        {detail}
      </p>
      <Link
        href={href}
        className="mt-4 inline-flex items-center gap-1.5 font-semibold text-brand-700 hover:text-brand-800 hover:underline"
      >
        {cta}
        <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}
