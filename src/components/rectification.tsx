import Link from "next/link";
import { Plus } from "lucide-react";
import { ShareButton } from "./share-button";
import { FlatGauge } from "./rich-bg";
import { leads, rectification } from "@/lib/data";

/** The brand's red / yellow / green as a flat 3-segment bar (no gradient). */
export function GaugeStripe({ className = "h-1" }: { className?: string }) {
  return (
    <div className={`flex gap-0.5 ${className}`} aria-hidden>
      <span className="flex-[3] bg-score-red" />
      <span className="flex-[4] bg-score-yellow" />
      <span className="flex-[3] bg-score-green" />
    </div>
  );
}

/** Compact card for PrimeScore's main product. Used on Home and Sell. */
export function RectificationCard({ className = "" }: { className?: string }) {
  const active = leads.filter((l) => l.kind === "rectification" && (l.status === "new" || l.status === "in-progress")).length;
  return (
    <section className={`relative overflow-hidden border-y border-line bg-white md:rounded-lg md:border ${className}`}>
      <GaugeStripe />
      {/* dot pattern on the right, fading out towards the text */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-3/5"
        style={{
          backgroundImage: "radial-gradient(rgb(61 71 166 / 0.28) 1.2px, transparent 1.3px)",
          backgroundSize: "12px 12px",
          maskImage: "linear-gradient(to left, black 0%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to left, black 0%, transparent 100%)",
        }}
      />
      <div className="relative p-4 md:flex md:items-center md:gap-6 md:p-5">
        <div className="flex items-center gap-3 md:flex-1">
          <FlatGauge className="w-11 shrink-0 text-brand-700" />
          <div className="min-w-0 flex-1">
            <h2 className="text-base font-semibold text-ink">Credit Rectification</h2>
            <p className="text-sm text-muted">
              Earn <span className="font-semibold text-score-green-dark">{rectification.payout}</span> {rectification.payoutLabel}
            </p>
          </div>
          <Link href="/leads" className="shrink-0 rounded-lg bg-surface px-2.5 py-1 text-xs font-medium text-ink">
            {active} active
          </Link>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 md:mt-0 md:w-96 md:shrink-0">
          <Link href="/leads/new?product=credit-rectification" className="pressable flex items-center justify-center gap-1.5 rounded-lg bg-brand-700 py-2.5 text-sm font-medium text-white">
            <Plus className="h-4 w-4" /> Add case
          </Link>
          <ShareButton path="score" label="Share score link" className="rounded-lg border border-line bg-white py-2.5 text-sm font-medium text-brand-700" />
        </div>
      </div>
    </section>
  );
}
