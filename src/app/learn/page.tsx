import Link from "next/link";
import type { Metadata } from "next";
import { Play } from "lucide-react";
import { PageHeader } from "@/components/app-shell";
import { Coin } from "@/components/brand";
import { LearnContent } from "./learn-content";

export const metadata: Metadata = { title: "Learn & Grow" };

const done = 2;
const total = 6;

export default function LearnPage() {
  return (
    <>
      <PageHeader
        title="Learn & Grow"
        subtitle="Short trainings to help you sell more"
        tone="dark"
        actions={
          <div className="flex items-center gap-1.5 rounded-lg bg-white/10 px-2.5 py-1.5 text-xs font-semibold md:bg-white md:ring-1 md:ring-line">
            <Coin className="h-4.5 w-4.5" /> 150
          </div>
        }
      />

      <section className="border-b border-line bg-white px-4 py-4 md:mb-6 md:rounded-lg md:border">
        <div className="flex items-center gap-3">
          <Link
            href="/soon"
            aria-label="Resume lesson"
            className="pressable grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-700 text-white"
          >
            <Play className="h-5 w-5 translate-x-px" fill="currentColor" strokeWidth={0} />
          </Link>
          <div className="min-w-0 flex-1">
            <p className="text-xs text-muted">
              Onboarding · Lesson {done + 1} of {total}
            </p>
            <p className="truncate text-base font-semibold text-ink">How your payouts are calculated</p>
          </div>
          <span className="hidden text-xs font-semibold text-brand-600 sm:block">Resume</span>
        </div>
        <div className="mt-3 flex items-center gap-3">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface">
            <div className="h-full rounded-full bg-score-green" style={{ width: `${(done / total) * 100}%` }} />
          </div>
          <span className="flex items-center gap-1 text-xs text-muted">
            Finish to earn <Coin className="h-3.5 w-3.5" /> <b className="font-semibold text-ink">1,000</b>
          </span>
        </div>
      </section>

      <LearnContent />
    </>
  );
}
