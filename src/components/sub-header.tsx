"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

/**
 * Phones: white top bar with a back button.
 * Desktop: a plain page title with a small back link above it (no bar).
 */
export function SubHeader({
  title,
  subtitle,
  right,
  fallback = "/",
  backLabel = "Back",
}: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  fallback?: string;
  backLabel?: string;
}) {
  const router = useRouter();
  const back = () => (window.history.length > 1 ? router.back() : router.push(fallback));
  return (
    <header className="pt-safe sticky top-0 z-30 border-b border-line bg-white md:static md:mb-6 md:border-0 md:bg-transparent md:pt-0">
      <div className="flex h-14 items-center gap-2 px-2 md:h-auto md:items-end md:gap-4 md:px-0">
        <button aria-label="Back" onClick={back} className="grid h-10 w-10 place-items-center rounded-full text-ink hover:bg-surface md:hidden">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="min-w-0 flex-1">
          <button onClick={back} className="mb-1 hidden items-center gap-1 text-sm font-medium text-muted hover:text-brand-700 md:inline-flex">
            <ArrowLeft className="h-4 w-4" /> {backLabel}
          </button>
          <h1 className="truncate text-base font-semibold text-ink md:text-2xl">{title}</h1>
          {subtitle && <p className="hidden text-sm text-muted md:block">{subtitle}</p>}
        </div>
        {right}
      </div>
    </header>
  );
}

/** Action bar pinned above the bottom tab bar on phones; a plain button row on desktop. */
export function ActionBar({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="fixed inset-x-0 z-30 border-t border-line bg-white px-4 py-3 md:static md:border-0 md:bg-transparent md:p-0"
      style={{ bottom: "calc(68px + env(safe-area-inset-bottom))" }}
    >
      <div className="mx-auto flex max-w-lg gap-2 md:max-w-none">{children}</div>
    </div>
  );
}
