import type { Metadata } from "next";
import Link from "next/link";
import { CourseExperience } from "@/components/course/course-experience";
import { russianCourse } from "@/lib/course/russian";

export const metadata: Metadata = {
  title: "Learn Russian",
  description:
    "Three beginner Russian lessons with Cyrillic, English meaning, stress-marked pronunciation guides, playback, and a knowledge check for each lesson.",
};

export default function RussianPage() {
  return (
    <>
      {/* The lesson interface starts here, in the first viewport. Context and
          commentary sit below it, not in front of it. */}
      <div className="shell pt-8 pb-16 sm:pt-10">
        <header className="max-w-3xl">
          <p className="eyebrow">
            Russian · {russianCourse.lessons.length} beginner lessons
          </p>
          <h1 className="mt-2 font-display text-3xl leading-tight text-ink-900 sm:text-[2.5rem]">
            Start speaking Russian, four phrases at a time
          </h1>
          <p className="mt-3 text-lg text-muted-700">
            Every phrase here is one you would actually use in a first
            conversation. Read it, hear it, say it aloud, then check yourself.
          </p>
        </header>

        <div className="mt-8">
          <CourseExperience course={russianCourse} />
        </div>
      </div>

      <section
        aria-labelledby="why-russian"
        className="border-t border-line bg-surface-tint"
      >
        <div className="shell-narrow py-14">
          <p className="eyebrow">Why Russian</p>
          <h2
            id="why-russian"
            className="mt-2 font-display text-2xl text-ink-900 sm:text-3xl"
          >
            A language that resets everything I thought I knew about learning
          </h2>
          <div className="copy mt-5">
            <p>
              Spanish was reachable. The alphabet was familiar, the vocabulary
              shared roots with English, and the grammar bent in directions I
              could anticipate. Russian offers none of that comfort. A new
              alphabet, a case system, and consonant clusters that take real
              physical practice to produce.
            </p>
            <p>
              That is the point. Learning something genuinely unfamiliar after
              60 is a different exercise from getting better at something I
              already do. These first three lessons are deliberately small:
              twelve phrases, learned properly, with the stress in the right
              place. Twelve phrases said well are worth more than a hundred
              recognised on a screen and forgotten.
            </p>
            <p>
              The lessons are written by a learner, not a certified instructor.
              They record what is working, in the order it worked.{" "}
              <Link href="/story/spanish" className="link-inline">
                What Spanish taught me
              </Link>{" "}
              explains why I am building the practice this way. If you would
              rather start somewhere with no alphabet to learn at all,{" "}
              <Link href="/learn/mandarin" className="link-inline">
                Mandarin begins here
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
