import Link from "next/link";
import { navigation, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line bg-ink-900 text-brand-100">
      <div className="shell py-12">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr]">
          <div>
            <p className="font-display text-xl text-white">{site.name}</p>
            <p className="mt-3 max-w-md text-brand-200">{site.idea}</p>
          </div>

          <nav aria-label="Footer">
            <h2 className="text-sm font-semibold tracking-[0.11em] text-brand-300 uppercase">
              Explore
            </h2>
            <ul className="mt-4 space-y-2.5">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-brand-100 hover:text-white hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="mt-10 border-t border-ink-700 pt-6 text-sm text-brand-200">
          A personal learning record, written by a learner rather than a
          credentialed language or music teacher. Nothing here is medical
          advice.
        </p>
      </div>
    </footer>
  );
}
