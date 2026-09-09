"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { navigation, site, utilityNavItem } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelId = useId();

  // Close the mobile panel on navigation.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface-page/95 backdrop-blur-sm">
      <div className="shell flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="font-display text-lg leading-tight font-semibold text-ink-900 sm:text-xl"
        >
          Languages<span className="text-accent-600"> After </span>60
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`inline-block rounded-md px-3 py-2 text-[0.97rem] font-medium transition-colors ${
                    isActive(item.href)
                      ? "bg-brand-50 text-brand-800"
                      : "text-muted-700 hover:bg-surface-tint hover:text-ink-900"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            {/* The learner's own workspace, set apart from the content links
                by a rule so six items do not read as one long row. */}
            <li className="ml-2 border-l border-line pl-2">
              <Link
                href={utilityNavItem.href}
                aria-current={isActive(utilityNavItem.href) ? "page" : undefined}
                className={`inline-block rounded-md px-3 py-2 text-[0.97rem] font-semibold whitespace-nowrap transition-colors ${
                  isActive(utilityNavItem.href)
                    ? "bg-brand-50 text-brand-800"
                    : "text-brand-700 hover:bg-brand-50 hover:text-brand-800"
                }`}
              >
                {utilityNavItem.label}
              </Link>
            </li>
          </ul>
        </nav>

        <button
          type="button"
          className="btn btn-secondary md:hidden"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
        >
          <span aria-hidden="true">{open ? "✕" : "☰"}</span>
          <span>Menu</span>
        </button>
      </div>

      <div
        id={panelId}
        hidden={!open}
        className="border-t border-line bg-surface-raised md:hidden"
      >
        <nav aria-label="Main, mobile" className="shell py-3">
          <ul className="divide-y divide-line-soft">
            <li>
              <Link
                href={utilityNavItem.href}
                aria-current={
                  isActive(utilityNavItem.href) ? "page" : undefined
                }
                className="block py-3"
              >
                <span
                  className={`block font-semibold ${
                    isActive(utilityNavItem.href)
                      ? "text-brand-800"
                      : "text-brand-700"
                  }`}
                >
                  {utilityNavItem.label}
                </span>
                <span className="block text-sm text-muted-600">
                  {utilityNavItem.hint}
                </span>
              </Link>
            </li>
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="block py-3"
                >
                  <span
                    className={`block font-semibold ${
                      isActive(item.href) ? "text-brand-800" : "text-ink-900"
                    }`}
                  >
                    {item.label}
                  </span>
                  <span className="block text-sm text-muted-600">
                    {item.hint}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-3 border-t border-line-soft pt-3 text-sm text-muted-600">
            {site.tagline}
          </p>
        </nav>
      </div>
    </header>
  );
}
