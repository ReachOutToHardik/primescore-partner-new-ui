import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/app-shell";
import { leads } from "@/lib/data";
import { LeadsList } from "./leads-list";

export const metadata: Metadata = { title: "My Leads" };

const rupees = (s?: string) => Number((s ?? "").replace(/[^\d]/g, "")) || 0;

export default function LeadsPage() {
  const cases = leads.filter((l) => l.kind === "rectification");
  const active = cases.filter((l) => l.status === "in-progress" || l.status === "new").length;
  const closed = cases.filter((l) => l.scoreTo);
  const avgGain = closed.length ? Math.round(closed.reduce((s, l) => s + (l.scoreTo! - l.scoreFrom!), 0) / closed.length) : 0;
  const earned = leads.reduce((sum, l) => sum + rupees(l.payout), 0);

  const stats = [
    { v: active, l: "Active" },
    { v: closed.length, l: "Fixed" },
    { v: `+${avgGain}`, l: "Avg. gain" },
  ];

  return (
    <>
      <PageHeader
        title="My Leads"
        subtitle="Rectification cases and other referrals"
        actions={
          <Link href="/leads/new" className="pressable flex h-9 items-center gap-1 rounded-md bg-white pr-3.5 pl-2.5 text-sm font-medium text-brand-700 md:bg-brand-700 md:text-white md:hover:bg-brand-600">
            <Plus className="h-4 w-4" strokeWidth={2.5} /> Add case
          </Link>
        }
      >
        <div className="grid grid-cols-4 divide-x divide-white/15 border-t border-white/15 md:divide-line md:rounded-lg md:border md:border-line md:bg-white">
          <div className="px-4 py-3 md:px-5 md:py-4">
            <p className="text-base font-semibold text-score-green md:text-xl md:text-score-green-dark">₹{earned.toLocaleString("en-IN")}</p>
            <p className="text-[11px] text-white/60 md:text-xs md:text-muted">Earned</p>
          </div>
          {stats.map((s) => (
            <div key={s.l} className="px-4 py-3">
              <p className="text-base font-semibold md:text-xl">{s.v}</p>
              <p className="text-[11px] text-white/60 md:text-xs md:text-muted">{s.l}</p>
            </div>
          ))}
        </div>
      </PageHeader>

      <LeadsList />
    </>
  );
}
