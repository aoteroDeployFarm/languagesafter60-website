import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "What Spanish Taught Me",
  description:
    "Spanish was the first second language I actually learned. What that took, what carried over, and why Russian is a different problem entirely.",
};

const lessonsLearned = [
  {
    title: "The middle is long, and it is not a sign of failure",
    body: "The beginning is fast and the end is satisfying. Between them sits a stretch where progress stops being visible while it is still happening. Knowing that stretch exists — and that it ends — is the single most useful thing Spanish gave me.",
  },
  {
    title: "Listening is the real bottleneck",
    body: "I could read Spanish long before I could follow it spoken at normal speed. Comprehension is not vocabulary; it is the ear learning where one word stops and the next begins. That takes hours of input, not more study.",
  },
  {
    title: "Small and daily beats large and occasional",
    body: "Every genuine gain came from consistency. Long sessions produced a good feeling and very little retention. Short daily contact produced fluency slowly and permanently.",
  },
  {
    title: "Speaking badly, early, is the price of speaking well",
    body: "The sentences I got wrong out loud taught me more than the ones I got right silently. Waiting until I was ready would have meant waiting indefinitely.",
  },
];

export default function SpanishPage() {
  return (
    <>
      <section className="bg-ink-900 text-white">
        <div className="shell py-14 sm:py-16">
          <div className="max-w-3xl">
            <p className="text-sm font-bold tracking-[0.11em] text-accent-300 uppercase">
              Story · Spanish
            </p>
            <h1 className="mt-4 font-display text-[2.15rem] leading-[1.12] font-semibold sm:text-[3rem]">
              The language I actually learned
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-brand-100">
              Spanish is my second language. Not a semester of it, not a
              travel phrasebook — a language I learned as an adult and can hold
              a conversation in. Everything I am doing with Russian comes out of
              what that process taught me.
            </p>
          </div>
        </div>
      </section>

      <div className="shell-narrow py-14">
        <section aria-labelledby="what-it-taught">
          <p className="eyebrow">What it taught me</p>
          <h2
            id="what-it-taught"
            className="mt-2 font-display text-2xl text-ink-900 sm:text-3xl"
          >
            Four things I only believe because I lived through them
          </h2>
          <ol className="mt-7 space-y-6">
            {lessonsLearned.map((item, index) => (
              <li key={item.title} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-50 font-display text-lg font-semibold text-brand-700"
                >
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-sans text-lg font-bold text-ink-900">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-muted-700">{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="into-russian" className="mt-14">
          <h2
            id="into-russian"
            className="font-display text-2xl text-ink-900 sm:text-3xl"
          >
            Applying it to Russian
          </h2>
          <div className="copy mt-5">
            <p>
              What transfers from Spanish to Russian is almost none of the
              language and almost all of the method. No shared alphabet, very
              little shared vocabulary, and a grammar that works on entirely
              different principles. What does carry over is knowing how to
              practise: daily contact, listening before speaking, stress and
              rhythm learned with the word rather than bolted on afterwards, and
              patience with a plateau.
            </p>
            <p>
              That is why the{" "}
              <Link href="/learn/russian" className="link-inline">
                Russian lessons
              </Link>{" "}
              are built the way they are — four phrases at a time, each with its
              stressed syllable marked, meant to be said out loud rather than
              recognised on a screen. Twelve phrases I can actually produce are
              worth more than two hundred I can only identify.
            </p>
          </div>
        </section>

        <section aria-labelledby="portuguese" className="mt-14">
          <h2
            id="portuguese"
            className="font-display text-2xl text-ink-900 sm:text-3xl"
          >
            And later, Portuguese
          </h2>
          <div className="copy mt-5">
            <p>
              Portuguese is on the list, and it is the opposite case from
              Russian: Spanish would hand me an enormous amount of it for free.
              Shared Latin roots, largely overlapping vocabulary, a grammar
              built on the same frame. The reading would come quickly.
            </p>
            <p>
              The trap is just as clear. Close relatives make you overconfident.
              The vocabulary that looks identical sometimes is not, the sounds
              are meaningfully different — nasal vowels and reductions Spanish
              never asked me for — and a Spanish accent in Portuguese is a
              recognisable thing, not a neutral one. Familiarity would get me
              reading fast and could easily leave my listening and pronunciation
              behind.
            </p>
          </div>
        </section>

        <section aria-labelledby="every-language" className="mt-14">
          <h2
            id="every-language"
            className="font-display text-2xl text-ink-900 sm:text-3xl"
          >
            Every language asks for something different
          </h2>
          <div className="copy mt-5">
            <p>
              It is tempting to think of languages as one skill with different
              vocabulary attached. They are not. Each one puts its difficulty in
              a different place.
            </p>
            <ul>
              <li>
                <strong>Listening.</strong> Some languages run words together,
                some clip their endings, some carry meaning in pitch. The ear
                has to be retrained separately for each one, and it is almost
                always the last thing to arrive.
              </li>
              <li>
                <strong>Pronunciation.</strong> Spanish vowels are stable and
                few. Russian vowels change depending on where the stress falls,
                and its consonant clusters need physical practice before they
                are even possible.
              </li>
              <li>
                <strong>Culture.</strong> Formality, directness, and what counts
                as polite are part of the language, not decoration on top of it.
                Knowing when to use the formal “you” is as much a skill as
                conjugating the verb that follows it.
              </li>
            </ul>
            <p>
              So the method transfers. The difficulty does not. Each language
              has to be met on its own terms, and finding out where a new one
              puts its hardest problem is most of the first year.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
