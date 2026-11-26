import { CalendarClock, ShieldCheck, Wallet } from "lucide-react";
import { SubHeader } from "@/components/sub-header";
import { RichBg } from "@/components/rich-bg";
import { Panel } from "@/components/ui";
import { partner, payouts } from "@/lib/data";
import { WithdrawButton } from "./withdraw";

export const metadata = { title: "Earnings" };

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export default function EarningsPage() {
  const e = partner.earnings;
  const paid = payouts.filter((p) => p.status === "paid").reduce((s, p) => s + p.amount, 0);
  const processing = payouts.filter((p) => p.status === "processing").reduce((s, p) => s + p.amount, 0);

  return (
    <div>
      <SubHeader title="Earnings & payouts" subtitle="Everything you've earned and when it reaches your bank" backLabel="Home" />

      <div className="space-y-2 md:grid md:grid-cols-12 md:items-start md:gap-6 md:space-y-0">
        {/* balance: top on phones, right column on desktop */}
        <aside className="md:sticky md:top-20 md:col-span-4 md:col-start-9 md:row-start-1 md:space-y-6">
          <section className="relative overflow-hidden px-4 py-5 text-white md:rounded-lg md:p-5">
            <RichBg />
            <div className="relative">
              <p className="text-sm text-white/70">Available to withdraw</p>
              <p className="mt-1 text-[28px] leading-none font-semibold">{inr(partner.wallet)}</p>
              <div className="mt-5 grid grid-cols-3 divide-x divide-white/15 border-y border-white/15">
                <div className="py-2.5 pr-3">
                  <p className="text-[11px] text-white/60">This month</p>
                  <p className="text-base font-semibold">{inr(e.thisMonth)}</p>
                </div>
                <div className="px-3 py-2.5">
                  <p className="text-[11px] text-white/60">Processing</p>
                  <p className="text-base font-semibold">{inr(processing)}</p>
                </div>
                <div className="py-2.5 pl-3">
                  <p className="text-[11px] text-white/60">Paid so far</p>
                  <p className="text-base font-semibold">{inr(paid)}</p>
                </div>
              </div>
              <WithdrawButton balance={partner.wallet} kycDone={partner.kycDone} />
            </div>
          </section>

          <section className="hidden rounded-lg border border-line bg-white md:block">
            <h2 className="border-b border-line px-5 py-3.5 text-sm font-semibold text-ink">How payouts work</h2>
            <ul className="space-y-3.5 px-5 py-4 text-sm">
              <li className="flex gap-3">
                <CalendarClock className="h-4 w-4 shrink-0 text-brand-600" />
                <span className="text-ink">
                  Paid every Friday. Next payout on <b className="font-semibold">{e.nextPayout}</b>.
                </span>
              </li>
              <li className="flex gap-3">
                <Wallet className="h-4 w-4 shrink-0 text-brand-600" />
                <span className="text-ink">Rectification pays when the bureau updates the report. Loans pay after disbursal.</span>
              </li>
              <li className="flex gap-3">
                <ShieldCheck className="h-4 w-4 shrink-0 text-brand-600" />
                <span className="text-ink">Complete KYC to receive payouts in your bank.</span>
              </li>
            </ul>
          </section>
        </aside>

        {/* history */}
        <div className="md:col-span-8 md:col-start-1 md:row-start-1">
          {/* phones: list */}
          <Panel title="Payout history" bodyClassName="" className="md:hidden">
            <ul className="divide-y divide-line border-t border-line">
              {payouts.map((p) => (
                <li key={p.id} className="flex items-center gap-3 px-4 py-3">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-ink">{p.title}</p>
                    <p className="text-xs text-muted">
                      {p.date} · {p.id}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-ink">+{inr(p.amount)}</p>
                    <p className={`text-xs ${p.status === "paid" ? "text-score-green-dark" : "text-amber-700"}`}>
                      {p.status === "paid" ? "Paid" : "Processing"}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Panel>

          {/* desktop: table */}
          <section className="hidden overflow-hidden rounded-lg border border-line bg-white md:block">
            <h2 className="border-b border-line px-5 py-3.5 text-sm font-semibold text-ink">Payout history</h2>
            <table className="w-full text-sm">
              <thead className="bg-surface/60">
                <tr className="text-left text-xs text-muted">
                  <th className="px-5 py-2.5 font-medium">Date</th>
                  <th className="px-5 py-2.5 font-medium">Description</th>
                  <th className="px-5 py-2.5 font-medium">Payout ID</th>
                  <th className="px-5 py-2.5 font-medium">Status</th>
                  <th className="px-5 py-2.5 text-right font-medium">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {payouts.map((p) => (
                  <tr key={p.id}>
                    <td className="px-5 py-3 text-muted">{p.date}</td>
                    <td className="px-5 py-3 font-medium text-ink">{p.title}</td>
                    <td className="px-5 py-3 text-muted">{p.id}</td>
                    <td className="px-5 py-3">
                      <span
                        className={`rounded-md px-2 py-0.5 text-xs font-medium ${
                          p.status === "paid" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {p.status === "paid" ? "Paid" : "Processing"}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right font-semibold text-ink">+{inr(p.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </div>
    </div>
  );
}
