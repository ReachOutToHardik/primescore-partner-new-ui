import Link from "next/link";
import { Clock, PlayCircle } from "lucide-react";
import { Icon } from "./icons";
import { Coin } from "./brand";
import type { Product } from "@/lib/data";
import { categoryColor, courses, trainings } from "@/lib/data";

/** Icon + label cell used in product grids (Home "Other products", Sell). */
export function ProductIconCell({ p }: { p: Product }) {
  return (
    <Link
      id={p.slug}
      href={`/sell/${p.slug}`}
      className="group flex scroll-mt-32 flex-col items-center gap-1.5 rounded-lg px-1 py-2 text-center md:hover:bg-surface"
    >
      <span
        className={`grid h-12 w-12 place-items-center rounded-full transition-transform group-active:scale-95 ${categoryColor[p.category].tile}`}
      >
        <Icon name={p.icon} className="h-6 w-6" />
      </span>
      <span className="line-clamp-2 flex h-8 items-center text-xs leading-4 font-medium text-ink">{p.short}</span>
      <span className="rounded-md bg-emerald-50 px-1.5 py-0.5 text-[11px] font-semibold text-emerald-700">{p.payout}</span>
    </Link>
  );
}

export function TrainingCard({
  t,
  className = "w-[280px] md:w-auto",
  plain,
}: {
  t: (typeof trainings)[number];
  className?: string;
  /** No box: when it already sits inside a Panel. */
  plain?: boolean;
}) {
  return (
    <div className={`flex flex-col ${plain ? "" : "rounded-lg border border-line bg-white p-4"} ${className}`}>
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-muted">{t.tag}</span>
        {t.live ? (
          <span className="flex items-center gap-1.5 font-medium text-score-red">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-score-red opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-score-red" />
            </span>
            Live now
          </span>
        ) : (
          <span className="flex items-center gap-1 text-muted">
            <Clock className="h-3.5 w-3.5" /> {t.time}
          </span>
        )}
      </div>
      <p className="mt-2 line-clamp-2 min-h-[44px] text-base leading-snug font-medium text-ink">{t.title}</p>
      <p className="mt-1 text-xs text-muted">{t.host}</p>
      <div className="mt-4 flex items-center justify-between">
        <Link
          href="/soon"
          className={`pressable rounded-lg px-4 py-2 text-sm font-medium ${
            t.live ? "bg-brand-700 text-white" : "border border-line text-brand-700"
          }`}
        >
          {t.live ? "Join now" : "Remind me"}
        </Link>
        <span className="flex items-center gap-1 text-sm font-medium text-ink">
          <Coin className="h-4 w-4" /> {t.coins}
        </span>
      </div>
    </div>
  );
}

export function CourseCard({ c }: { c: (typeof courses)[number] }) {
  return (
    <Link href="/learn" className="pressable flex w-[240px] flex-col overflow-hidden rounded-lg border border-line bg-white md:w-auto">
      <div className={`relative grid aspect-[16/9] place-items-center ${c.color}`}>
        <PlayCircle className="h-10 w-10 text-white/90" strokeWidth={1.5} />
        <span className="absolute top-2.5 left-2.5 rounded-md bg-white px-1.5 py-0.5 text-[11px] font-medium text-brand-700">{c.badge}</span>
      </div>
      <div className="p-3.5">
        <p className="text-sm leading-snug font-medium text-ink">{c.title}</p>
        <p className="mt-1 text-xs text-muted">
          {c.lessons} lessons · {c.mins} min
        </p>
      </div>
    </Link>
  );
}
