import type { Metadata } from "next";
import Link from "next/link";
import { CourseExperience } from "@/components/course/course-experience";
import { mandarinCourse } from "@/lib/course/mandarin";

export const metadata: Metadata = {
  title: "Mandarin After 60",
  description:
    "Three beginner Mandarin Chinese lessons with Simplified characters, pinyin with tone marks, English meaning, playback, and a knowledge check for each lesson.",
};

export default function MandarinPage() {
  return (
    <>
      {/* Same shape as the Russian route: the lesson interface comes first, in
          the opening viewport. Context sits below it. */}
      <div className="shell pt-8 pb-16 sm:pt-10">
        <header className="max-w-3xl">
          <p className="eyebrow">
            Mandarin · {mandarinCourse.lessons.length} beginner lessons
          </p>
          <h1 className="mt-2 font-display text-3xl leading-tight text-ink-900 sm:text-[2.5rem]">
            Mandarin After 60, four phrases at a time
          </h1>
          <p className="mt-3 text-lg text-muted-700">
            Twelve phrases you would actually use in a first conversation. See
            it, hear it, say it aloud, then check yourself. Tones matter, but
            they are something to listen for — not a test to pass first.
          </p>
        </header>

        <div className="mt-8">
          <CourseExperience course={mandarinCourse} />
        </div>
      </div>

      <section
        aria-labelledby="why-mandarin"
        className="border-t border-line bg-surface-tint"
      >
        <div className="shell-narrow py-14">
          <p className="eyebrow">Why Mandarin</p>
          <h2
            id="why-mandarin"
            className="mt-2 font-display text-2xl text-ink-900 sm:text-3xl"
          >
            A language where the difficulty sits somewhere new
          </h2>
          <div className="copy mt-5">
            <p>
              This is a beginning, not a report from the far side. I am starting
              Mandarin, and these lessons record the first steps rather than
              teaching from experience I do not yet have.
            </p>
            <p>
              Every language puts its hardest problem in a different place.
              Russian puts it in the alphabet and the case endings. Mandarin
              puts almost none of it there — there are no verb conjugations to
              memorise, no genders, no plurals, no tenses to inflect. The
              sentence structure is often simpler than English.
            </p>
            <p>
              What it asks for instead is <strong>your ear</strong>. Pitch
              movement is part of the word, so the same syllable said with a
              different tone is a different word. For someone who has spent a
              life listening to music, that is an unusually inviting place for
              the difficulty to live — and a genuinely new one after Spanish and
              Russian.
            </p>
            <p>
              Characters come later. These first lessons show Simplified
              characters alongside pinyin so the writing becomes familiar by
              exposure, but nothing here asks you to write them from memory.
              Speaking and understanding come first.
            </p>
            <p>
              <Link href="/learn/russian" className="link-inline">
                The Russian lessons
              </Link>{" "}
              run on the same three-lesson shape, and{" "}
              <Link href="/story/spanish" className="link-inline">
                what Spanish taught me
              </Link>{" "}
              explains the method underneath both.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
