import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How I Learned Spanish",
  description:
    "I grew up in El Paso hearing Spanish, took classes I was sure I would never need, and then went to work in Mexico. What that taught me now shapes how Languages After 60 is built.",
};

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
              The language I was sure I would never need
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-brand-100">
              Spanish is my second language. I did not grow up speaking it, and
              I did not learn it from the classes I sat through as a boy. I
              learned it as an adult, when work in Mexico made it something I
              needed to get through an ordinary day.
            </p>
          </div>
        </div>
      </section>

      <div className="shell-narrow py-14">
        <section aria-labelledby="growing-up">
          <p className="eyebrow">Where it started</p>
          <h2
            id="growing-up"
            className="mt-2 font-display text-2xl text-ink-900 sm:text-3xl"
          >
            Growing up beside Mexico
          </h2>
          <div className="copy mt-5">
            <p>
              I grew up in El Paso, Texas, directly across the border from
              Ciudad Juárez, Chihuahua. Spanish was simply part of the
              environment. I heard it constantly — in shops, on the street, in
              the ordinary background of the day.
            </p>
            <p>
              I want to be accurate about this, because it is the part people
              tend to assume wrongly:{" "}
              <strong>I heard Spanish. I did not speak it.</strong> Being near a
              language every day is not the same as having it. I could not hold
              a conversation, and for a long time I had no particular interest
              in being able to.
            </p>
          </div>
        </section>

        <section aria-labelledby="the-classes" className="mt-14">
          <h2
            id="the-classes"
            className="font-display text-2xl text-ink-900 sm:text-3xl"
          >
            The classes I thought I would never need
          </h2>
          <div className="copy mt-5">
            <p>
              I took Spanish formally through sixth grade, and I disliked it. It
              felt like a subject invented to be graded — vocabulary lists and
              conjugation drills attached to nothing I cared about. I was
              convinced I would never use any of it.
            </p>
            <p>
              <strong>I was so wrong.</strong>
            </p>
            <p>
              I do not blame the teachers or the classes for that. Looking back,
              the problem was not the instruction. It was that I had no reason
              yet — nothing the language would let me do that I actually wanted
              to do. A reason turns out to matter more than a method.
            </p>
          </div>
        </section>

        <section aria-labelledby="became-necessary" className="mt-14">
          <h2
            id="became-necessary"
            className="font-display text-2xl text-ink-900 sm:text-3xl"
          >
            When Spanish became necessary
          </h2>
          <div className="copy mt-5">
            <p>
              As an adult, I went to work in Mexico. Spanish stopped being a
              school subject and became the thing standing between me and an
              ordinary day. And once it was genuinely necessary, I learned it
              quickly — far more quickly than any classroom had ever managed
              with me.
            </p>
            <p>
              What I needed first was not literature or grammar. It was the
              small machinery of daily life:
            </p>
            <ul>
              <li>The days of the week, so I could follow a schedule</li>
              <li>How to ask what something cost</li>
              <li>
                How to recognise an amount when somebody said it out loud, at
                speed
              </li>
              <li>How pesos worked, and how to count them</li>
              <li>How to check my change</li>
              <li>
                How to confirm that I had understood a transaction correctly
              </li>
            </ul>
            <p>
              I needed to understand what things cost, count pesos, check my
              change, and know that I had understood the transaction correctly.
              Part of that was plain self-protection. When you cannot follow a
              spoken number, you cannot tell a misunderstanding from a mistake
              from being overcharged — and not being able to tell is its own
              kind of vulnerability. I did not want to be the person who nodded
              at a price he had not actually understood.
            </p>
            <p>
              None of it was ambitious. All of it was useful. I learned what my
              life required next, in the order my life required it.
            </p>
          </div>
        </section>

        <section aria-labelledby="the-people" className="mt-14">
          <h2
            id="the-people"
            className="font-display text-2xl text-ink-900 sm:text-3xl"
          >
            The people who helped
          </h2>
          <div className="copy mt-5">
            <p>
              Nobody was fooled. Spanish speakers could tell immediately that it
              was not my first language — from the accent, from the pauses, from
              the grammar I was quietly mangling.
            </p>
            <p>
              What I did not expect was how much that did not matter. When
              people saw I was making an honest effort, they helped. They
              slowed down. They filled in the word I was reaching for. They
              forgave errors that, on a school worksheet, would have been marked
              in red and counted against me.
            </p>
            <p>
              I owe those people a great deal, and I do not think of them as my
              teachers — they were not running a lesson, they were getting on
              with their day and choosing to be generous inside it. But they
              taught me the thing I had most needed to learn:{" "}
              <strong>
                successful communication does not require correct grammar.
              </strong>{" "}
              Being understood and being accurate are two different
              achievements, and they do not arrive together.
            </p>
          </div>
        </section>

        <section aria-labelledby="ten-years" className="mt-14">
          <h2
            id="ten-years"
            className="font-display text-2xl text-ink-900 sm:text-3xl"
          >
            Speaking before thinking in Spanish
          </h2>
          <div className="copy mt-5">
            <p>
              There are three separate milestones in here, and I did not
              understand until much later that they are separate:
            </p>
            <ul>
              <li>
                <strong>Being able to communicate.</strong> Getting the meaning
                across, however roughly.
              </li>
              <li>
                <strong>Speaking accurately.</strong> Getting the grammar and
                the words actually right.
              </li>
              <li>
                <strong>Speaking without translating.</strong> The sentence
                arriving in Spanish, rather than being assembled in English
                first and converted.
              </li>
            </ul>
            <p>
              They did not happen at the same time, or anywhere near it. I could
              communicate long before I stopped translating everything in my
              head. I was functioning in Spanish — working, buying things,
              handling a day — while a running translation was still going on
              behind it.
            </p>
            <p>
              It took roughly <strong>ten years</strong> before I could speak
              Spanish without regularly translating first.
            </p>
            <p>
              I do not offer that as a discouraging number, and I do not think
              of it as ten years of failure. It is the opposite. Almost all of
              the usefulness arrived in the first stretch; the last thing to
              arrive was the ease. If I had waited to be fluent before I opened
              my mouth, I would have spent that decade silent and learned
              nothing.
            </p>
          </div>
        </section>

        <section aria-labelledby="what-it-teaches" className="mt-14">
          <p className="eyebrow">What it means for this project</p>
          <h2
            id="what-it-teaches"
            className="mt-2 font-display text-2xl text-ink-900 sm:text-3xl"
          >
            What Spanish is teaching me now
          </h2>
          <div className="copy mt-5">
            <p>
              I did not learn Spanish through one good method. That is the
              honest summary. There were early classes I resented, years of
              hearing the language without using it, and then a sudden, concrete
              need that made all of it matter at once.
            </p>
            <p>
              I suspect more of those early classes and years of hearing Spanish
              stayed with me than I realized. I cannot prove it, and I am not
              claiming it as a fact about how learning works — only that when I
              finally needed the language, some of it seemed to be waiting for
              me rather than starting from nothing. Necessity did not build the
              foundation so much as switch it on. Years of continued use turned
              deliberate translation into something closer to speech.
            </p>
            <p>
              That is why{" "}
              <Link href="/learn/russian" className="link-inline">
                the Russian lessons
              </Link>{" "}
              and{" "}
              <Link href="/learn/mandarin" className="link-inline">
                the Mandarin lessons
              </Link>{" "}
              are shaped the way they are. Phrases you would actually use, heard
              as often as you want to hear them, said out loud, tied to a real
              situation rather than a grammar table. A short check afterwards
              that costs nothing to get wrong. Explanations available when they
              help and skippable when they do not.
            </p>
            <p>
              Grammar, alphabets, tones and verb structures all matter — I am
              not pretending otherwise, and Russian and Mandarin both punish you
              for ignoring them. But they work best as an explanation for
              language you have already met, not as a gate you have to pass
              before you are allowed to say anything. The order matters.
            </p>
          </div>

          <blockquote className="mt-8 border-l-4 border-l-accent-500 bg-surface-tint py-5 pr-5 pl-6">
            <p className="font-display text-xl leading-snug text-ink-900">
              Communication before completeness. Independence before
              correctness.
            </p>
            <p className="mt-2 text-[0.97rem] text-muted-700">
              Both of those I learned from strangers in Mexico who were patient
              with a man counting his change out loud.
            </p>
          </blockquote>
        </section>
      </div>
    </>
  );
}
