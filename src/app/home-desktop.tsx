import Link from "next/link";
import { ArrowUpRight, BadgeCheck, ChevronRight, CircleAlert, FileClock, Gauge, Globe, Image as ImageIcon, MessageSquareText, Plus, UserPlus } from "lucide-react";
import { Coin } from "@/components/brand";
import { FlatGauge } from "@/components/rich-bg";
import { Icon } from "@/components/icons";
import { ShareButton } from "@/components/share-button";
import { Avatar } from "@/components/ui";
import { actions, categoryColor, leads, partner, products, rectification, rectificationStages, trainings } from "@/lib/data";

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

const toneStyle = {
  red: { tile: "bg-red-50 text-score-red", icon: CircleAlert },
  amber: { tile: "bg-amber-50 text-amber-700", icon: FileClock },
  navy: { tile: "bg-brand-50 text-brand-700", icon: MessageSquareText },
  green: { tile: "bg-lime-100 text-score-green-dark", icon: BadgeCheck },
} as const;

const tools = [
  { label: "Free score check", sub: "Find new rectification cases", href: "/sell/credit-report", icon: Gauge, tile: "bg-lime-100 text-score-green-dark" },
  { label: "Your website", sub: "All products, one link", href: "/soon", icon: Globe, tile: "bg-sky-50 text-sky-600" },
  { label: "Posters", sub: "Ready for WhatsApp", href: "/soon", icon: ImageIcon, tile: "bg-fuchsia-50 text-fuchsia-600" },
  { label: "Refer a partner", sub: "Earn up to ₹1,000 each", href: "/soon", icon: UserPlus, tile: "bg-amber-50 text-amber-600" },
];

function PanelHead({ title, href, action }: { title: string; href?: string; action?: string }) {
  return (
    <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
      <h2 className="text-sm font-semibold text-ink">{title}</h2>
      {href && (
        <Link href={href} className="flex items-center gap-0.5 text-sm font-medium text-brand-600 hover:text-brand-700">
          {action ?? "View all"} <ChevronRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}

/** Desktop-only dashboard. Phones use the stacked layout in page.tsx. */
export function HomeDesktop() {
  const e = partner.earnings;
  const pct = Math.min(100, Math.round((e.thisMonth / e.target) * 100));
  const growth = Math.round(((e.thisMonth - e.lastMonth) / e.lastMonth) * 100);
  const cases = leads.filter((l) => l.kind === "rectification");
  const activeCases = cases.filter((l) => l.status === "new" || l.status === "in-progress");
  const fixed = cases.filter((l) => l.scoreTo);
  const avgGain = fixed.length ? Math.round(fixed.reduce((s, l) => s + (l.scoreTo! - l.scoreFrom!), 0) / fixed.length) : 0;
  const others = products.filter((p) => p.category !== "rectification").slice(0, 8);
  const training = trainings.find((t) => t.live) ?? trainings[0];

  return (
    <div className="hidden space-y-6 md:block">
      {/* page header */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-ink">Hello, {partner.firstName}</h1>
          <p className="text-sm text-muted">Here&apos;s how your business is doing this month.</p>
        </div>
        <div className="flex gap-2">
          <ShareButton
            path="score"
            label="Share score link"
            className="rounded-md border border-line bg-white px-4 py-2 text-sm font-medium text-brand-700 hover:bg-surface"
          />
          <Link
            href="/leads/new?product=credit-rectification"
            className="flex items-center gap-1.5 rounded-md bg-brand-700 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600"
          >
            <Plus className="h-4 w-4" /> Add case
          </Link>
        </div>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-4 divide-x divide-line rounded-lg border border-line bg-white">
        <Link href="/earnings" className="px-5 py-4 hover:bg-surface/60">
          <p className="text-xs text-muted">Earnings · Nov</p>
          <p className="mt-1 text-2xl font-semibold text-ink">{inr(e.thisMonth)}</p>
          <div className="mt-2 h-1 overflow-hidden rounded-full bg-surface">
            <div className="h-full rounded-full bg-score-green" style={{ width: `${pct}%` }} />
          </div>
          <p className="mt-1.5 flex items-center justify-between text-xs text-muted">
            <span>
              {pct}% of {inr(e.target)}
            </span>
            <span className="inline-flex items-center gap-0.5 text-score-green-dark">
              <ArrowUpRight className="h-3.5 w-3.5" /> {growth}%
            </span>
          </p>
        </Link>
        <Link href="/earnings" className="px-5 py-4 hover:bg-surface/60">
          <p className="text-xs text-muted">Pending payout</p>
          <p className="mt-1 text-2xl font-semibold text-ink">{inr(e.pending)}</p>
          <p className="mt-3 text-xs text-muted">Lands in your bank on {e.nextPayout}</p>
        </Link>
        <Link href="/leads" className="px-5 py-4 hover:bg-surface/60">
          <p className="text-xs text-muted">Active cases</p>
          <p className="mt-1 text-2xl font-semibold text-ink">{activeCases.length}</p>
          <p className="mt-3 text-xs text-muted">{cases.length} rectification cases in total</p>
        </Link>
        <Link href="/leads" className="px-5 py-4 hover:bg-surface/60">
          <p className="text-xs text-muted">Scores fixed</p>
          <p className="mt-1 text-2xl font-semibold text-ink">{fixed.length}</p>
          <p className="mt-3 text-xs text-score-green-dark">Avg. +{avgGain} points</p>
        </Link>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* ---------- main column ---------- */}
        <div className="col-span-8 space-y-6">
          {/* rectification cases */}
          <section className="overflow-hidden rounded-lg border border-line bg-white">
            <div className="flex items-center gap-3 border-b border-line px-5 py-3.5">
              <FlatGauge className="w-8 text-brand-700" />
              <div className="flex-1">
                <h2 className="text-sm font-semibold text-ink">Credit Rectification cases</h2>
                <p className="text-xs text-muted">
                  You earn <span className="font-medium text-score-green-dark">{rectification.payout}</span> {rectification.payoutLabel}
                </p>
              </div>
              <Link href="/leads" className="flex items-center gap-0.5 text-sm font-medium text-brand-600 hover:text-brand-700">
                View all <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <table className="w-full">
              <thead className="bg-surface/60">
                <tr className="text-left text-xs text-muted">
                  <th className="px-5 py-2 font-medium">Customer</th>
                  <th className="px-5 py-2 font-medium">Score</th>
                  <th className="px-5 py-2 font-medium">Stage</th>
                  <th className="px-5 py-2 font-medium">Next step</th>
                  <th className="px-5 py-2" />
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {activeCases.map((l) => {
                  const stage = Math.min(l.stage ?? 0, rectificationStages.length);
                  return (
                    <tr key={l.id} className="text-sm">
                      <td className="px-5 py-3">
                        <Link href={`/leads/${l.id}`} className="flex items-center gap-3 hover:text-brand-700">
                          <Avatar name={l.name} className="h-8 w-8 text-xs" />
                          <span className="leading-tight">
                            <span className="block font-medium text-ink">{l.name}</span>
                            <span className="block text-xs text-muted">{l.id}</span>
                          </span>
                        </Link>
                      </td>
                      <td className="px-5 py-3 font-semibold text-ink">{l.scoreFrom}</td>
                      <td className="px-5 py-3">
                        <div className="flex w-32 gap-0.5">
                          {rectificationStages.map((s, i) => (
                            <span key={s} className={`h-1 flex-1 rounded-full ${i < stage ? "bg-score-green" : i === stage ? "bg-amber-400" : "bg-line"}`} />
                          ))}
                        </div>
                        <p className="mt-1 text-xs text-muted">{rectificationStages[stage]}</p>
                      </td>
                      <td className="px-5 py-3 text-ink">{l.step}</td>
                      <td className="px-5 py-3 text-right">
                        <Link href={`/leads/${l.id}`} className="text-sm font-medium text-brand-600 hover:text-brand-700">
                          Open
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>

          {/* other products: dense list, 2 columns */}
          <section className="overflow-hidden rounded-lg border border-line bg-white">
            <PanelHead title="Other products" href="/sell" action="All products" />
            <div className="grid grid-cols-2 divide-x divide-line">
              {[others.slice(0, 4), others.slice(4, 8)].map((col, ci) => (
                <ul key={ci} className="divide-y divide-line">
                  {col.map((p) => (
                    <li key={p.slug}>
                      <Link href={`/sell/${p.slug}`} className="flex items-center gap-3 px-5 py-3 hover:bg-surface/60">
                        <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${categoryColor[p.category].tile}`}>
                          <Icon name={p.icon} className="h-[18px] w-[18px]" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-medium text-ink">{p.name}</span>
                          <span className="block text-xs text-muted">{categoryColor[p.category].label}</span>
                        </span>
                        <span className="text-right">
                          <span className="block text-sm font-semibold text-score-green-dark">{p.payout}</span>
                          <span className="block text-[11px] text-muted">{p.payoutLabel ?? "per approval"}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </section>
        </div>

        {/* ---------- side column ---------- */}
        <div className="col-span-4 space-y-6">
          <section className="overflow-hidden rounded-lg border border-line bg-white">
            <PanelHead title="Needs your attention" />
            <ul className="divide-y divide-line">
              {actions.map((a) => {
                const t = toneStyle[a.tone];
                const I = t.icon;
                return (
                  <li key={a.id}>
                    <Link href={a.href} className="flex items-center gap-3 px-5 py-3 hover:bg-surface/60">
                      <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${t.tile}`}>
                        <I className="h-4 w-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-medium text-ink">{a.title}</span>
                        <span className="block truncate text-xs text-muted">{a.sub}</span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>

          <section className="overflow-hidden rounded-lg border border-line bg-white">
            <PanelHead title="Learn & Grow" href="/learn" action="See all" />
            <div className="px-5 py-4">
              <p className="flex items-center gap-1.5 text-xs font-medium text-score-red">
                <span className="h-1.5 w-1.5 rounded-full bg-score-red" /> Live now · {training.tag}
              </p>
              <p className="mt-1.5 text-sm font-medium text-ink">{training.title}</p>
              <p className="text-xs text-muted">{training.host}</p>
              <div className="mt-3 flex items-center justify-between">
                <Link href="/soon" className="rounded-md bg-brand-700 px-3.5 py-1.5 text-sm font-medium text-white hover:bg-brand-600">
                  Join now
                </Link>
                <span className="flex items-center gap-1 text-sm text-ink">
                  <Coin className="h-4 w-4" /> {training.coins}
                </span>
              </div>
            </div>
          </section>

          <section className="overflow-hidden rounded-lg border border-line bg-white">
            <PanelHead title="Grow your business" />
            <ul className="divide-y divide-line">
              {tools.map((t) => {
                const I = t.icon;
                return (
                  <li key={t.label}>
                    <Link href={t.href} className="flex items-center gap-3 px-5 py-3 hover:bg-surface/60">
                      <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${t.tile}`}>
                        <I className="h-4 w-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-medium text-ink">{t.label}</span>
                        <span className="block text-xs text-muted">{t.sub}</span>
                      </span>
                      <ChevronRight className="h-4 w-4 text-muted" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
