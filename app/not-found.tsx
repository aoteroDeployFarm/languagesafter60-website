import Link from "next/link";

export default function NotFound() {
  return (
    <div className="shell-narrow py-24 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 font-display text-3xl text-ink-900 sm:text-4xl">
        Nothing here yet
      </h1>
      <p className="mt-4 text-lg text-muted-700">
        This page does not exist. Two things definitely do.
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link href="/learn/russian" className="btn btn-primary">
          Start Russian
        </Link>
        <Link href="/music/piano" className="btn btn-secondary">
          Follow the piano journey
        </Link>
      </div>
    </div>
  );
}
