import Link from "next/link";
import {
  ArrowUpRight,
  BadgeCheck,
  ChevronDown,
  ChevronRight,
  CircleAlert,
  FileClock,
  Gauge,
  Globe,
  Image as ImageIcon,
  MessageSquareText,
  UserPlus,
} from "lucide-react";
import { HomeAppBar } from "@/components/app-shell";
import { HomeDesktop } from "./home-desktop";
import { Coin } from "@/components/brand";
import { RichBg } from "@/components/rich-bg";
import { ProductIconCell, TrainingCard } from "@/components/cards";
import { Panel } from "@/components/ui";
import { RectificationCard } from "@/components/rectification";
import { actions, partner, products, trainings } from "@/lib/data";

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

const toneStyle = {
  red: { tile: "bg-red-50 text-score-red", icon: CircleAlert },
  amber: { tile: "bg-amber-50 text-amber-700", icon: FileClock },
  navy: { tile: "bg-brand-50 text-brand-700", icon: MessageSquareText },
  green: { tile: "bg-lime-100 text-score-green-dark", icon: BadgeCheck },
} as const;

const tools = [
  { label: "Free score check", href: "/sell/credit-report", icon: Gauge, tile: "bg-lime-100 text-score-green-dark" },
  { label: "Your website", href: "/soon", icon: Globe, tile: "bg-sky-50 text-sky-600" },
  { label: "Posters", href: "/soon", icon: ImageIcon, tile: "bg-fuchsia-50 text-fuchsia-600" },
  { label: "Refer a partner", href: "/soon", icon: UserPlus, tile: "bg-amber-50 text-amber-600" },
];

export default function HomePage() {
  const e = partner.earnings;
  const pct = Math.min(100, Math.round((e.thisMonth / e.target) * 100));
  const growth = Math.round(((e.thisMonth - e.lastMonth) / e.lastMonth) * 100);
  const quick = ["credit-report", "personal-loan", "credit-card", "business-loan", "home-loan", "gold-loan", "savings", "health-insurance"]
    .map((s) => products.find((p) => p.slug === s)!)
    .filter(Boolean);
  const training = trainings.find((t) => t.live) ?? trainings[0];

  return (
    <>
      <HomeAppBar />

      {/* Phone: edge-to-edge sections in priority order, 8px grey gaps. Desktop: two columns of panels. */}
      <HomeDesktop />

      <div className="grid items-start gap-2 md:hidden">
        {/* Earnings */}
        <section className="relative overflow-hidden px-4 pt-5 pb-5 text-white md:col-span-7 md:col-start-1 md:row-start-1 md:rounded-lg md:p-6">
          <RichBg />
          <Link href="/earnings" className="absolute top-4 right-4 z-10 inline-flex items-center gap-1 rounded-md bg-white/10 px-2.5 py-1.5 text-xs font-medium text-white/90 ring-1 ring-white/15 hover:bg-white/15 md:top-5 md:right-5">
            Nov 2026 <ChevronDown className="h-3.5 w-3.5" />
          </Link>
          <div className="relative">
            <p className="text-sm text-white/70">Earnings this month</p>
            <p className="mt-1 text-[28px] leading-none font-semibold tracking-tight md:text-4xl">{inr(e.thisMonth)}</p>
            <p className="mt-2 inline-flex items-center gap-1 text-xs text-score-green">
              <ArrowUpRight className="h-3.5 w-3.5" /> {growth}% vs last month
            </p>

            <div className="mt-5 grid grid-cols-2 divide-x divide-white/15 border-y border-white/15">
              <div className="py-2.5 pr-3">
                <p className="text-xs text-white/60">Pending payout</p>
                <p className="text-base font-semibold">{inr(e.pending)}</p>
              </div>
              <div className="py-2.5 pl-4">
                <p className="text-xs text-white/60">Next payout</p>
                <p className="text-base font-semibold">{e.nextPayout}</p>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex justify-between text-xs text-white/70">
                <span>Monthly target {inr(e.target)}</span>
                <span>Unlock {inr(e.bonus)} bonus</span>
              </div>
              <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/15">
                <div className="h-full rounded-full bg-score-green" style={{ width: `${pct}%` }} />
              </div>
            </div>

            <div className="mt-5 flex gap-2">
              <Link href="/earnings" className="pressable rounded-md bg-white px-4 py-2.5 text-sm font-medium text-brand-700">
                Withdraw
              </Link>
              <Link href="/earnings" className="pressable rounded-md px-4 py-2.5 text-sm font-medium text-white ring-1 ring-white/25">
                Payout history
              </Link>
              <span className="ml-auto flex items-center gap-1 self-center text-sm">
                <Coin className="h-4 w-4" /> {partner.coins}
              </span>
            </div>
          </div>
        </section>

        {/* Main product */}
        <RectificationCard className="md:col-span-7 md:col-start-1 md:row-start-2" />

        {/* Needs attention */}
        <Panel title="Needs your attention" bodyClassName="" className="md:col-span-5 md:col-start-8 md:row-start-1">
          <ul className="divide-y divide-line border-t border-line">
            {actions.map((a) => {
              const t = toneStyle[a.tone];
              const I = t.icon;
              return (
                <li key={a.id}>
                  <Link href={a.href} className="flex items-center gap-3 px-4 py-3 active:bg-surface md:hover:bg-surface">
                    <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${t.tile}`}>
                      <I className="h-[18px] w-[18px]" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium text-ink">{a.title}</span>
                      <span className="block truncate text-xs text-muted">{a.sub}</span>
                    </span>
                    <ChevronRight className="h-4 w-4 text-muted" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </Panel>

        {/* Other products */}
        <Panel
          title="Other products"
          action="All products"
          href="/sell"
          bodyClassName="px-1 pb-3"
          className="md:col-span-7 md:col-start-1 md:row-start-3"
        >
          <div className="grid grid-cols-4 gap-y-2">
            {quick.map((p) => (
              <ProductIconCell key={p.slug} p={p} />
            ))}
          </div>
        </Panel>

        {/* One training */}
        <Panel title="Learn & Grow" action="See all" href="/learn" className="md:col-span-5 md:col-start-8 md:row-start-2">
          <TrainingCard t={training} plain className="w-full" />
        </Panel>

        {/* Growth tools */}
        <Panel title="Grow your business" bodyClassName="px-1 pb-3" className="md:col-span-5 md:col-start-8 md:row-start-3">
          <div className="grid grid-cols-4">
            {tools.map((t) => {
              const I = t.icon;
              return (
                <Link key={t.label} href={t.href} className="group flex flex-col items-center gap-1.5 rounded-md px-1 py-2 text-center md:hover:bg-surface">
                  <span className={`grid h-12 w-12 place-items-center rounded-full transition-transform group-active:scale-95 ${t.tile}`}>
                    <I className="h-5 w-5" />
                  </span>
                  <span className="line-clamp-2 text-xs leading-4 font-medium text-ink">{t.label}</span>
                </Link>
              );
            })}
          </div>
        </Panel>
      </div>
    </>
  );
}
