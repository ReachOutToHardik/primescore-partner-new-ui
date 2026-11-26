import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Check, MessageCircle, Phone, X } from "lucide-react";
import { ActionBar, SubHeader } from "@/components/sub-header";
import { Avatar, Panel } from "@/components/ui";
import { leads, rectificationStages } from "@/lib/data";

export function generateStaticParams() {
  return leads.map((l) => ({ id: l.id }));
}

export async function generateMetadata({ params }: PageProps<"/leads/[id]">) {
  const { id } = await params;
  return { title: leads.find((l) => l.id === id)?.name ?? "Lead" };
}

const statusText: Record<string, string> = {
  new: "New",
  "in-progress": "In progress",
  approved: "Score updated",
  disbursed: "Paid out",
  rejected: "Not eligible",
};

// Reads the URL id inside <Suspense> so navigation stays instant (Cache Components).
export default function LeadPage({ params }: PageProps<"/leads/[id]">) {
  return (
    <Suspense fallback={<DetailSkeleton />}>
      <LeadContent params={params} />
    </Suspense>
  );
}

function DetailSkeleton() {
  return (
    <div aria-busy className="animate-pulse">
      <div className="h-14 border-b border-line bg-white md:mb-6 md:rounded-lg md:border" />
      <div className="h-48 border-b border-line bg-white md:rounded-lg md:border" />
      <div className="mt-2 h-40 border-y border-line bg-white md:mt-6 md:rounded-lg md:border" />
    </div>
  );
}

async function LeadContent({ params }: { params: PageProps<"/leads/[id]">["params"] }) {
  const { id } = await params;
  const l = leads.find((x) => x.id === id);
  if (!l) notFound();
  const isCase = l.kind === "rectification";
  const stage = Math.min(l.stage ?? 0, rectificationStages.length);
  const digits = l.phone.replace(/\D/g, "");

  return (
    <div className="pb-20 md:pb-0">
      <SubHeader title={l.name} subtitle={`${l.id} · ${l.product} · added ${l.date}`} backLabel="My Leads" fallback="/leads" />

      <div className="md:grid md:grid-cols-12 md:items-start md:gap-6">
        <aside className="md:sticky md:top-20 md:col-span-4 md:col-start-9 md:row-start-1 md:space-y-3">
        <section className="border-b border-line bg-white px-4 py-5 md:rounded-lg md:border">
          <div className="flex items-center gap-3">
            <Avatar name={l.name} className="h-12 w-12 text-base" />
            <div className="min-w-0 flex-1">
              <h2 className="text-xl font-semibold text-ink">{l.name}</h2>
              <p className="text-sm text-muted">
                {l.product} · {l.phone}
              </p>
            </div>
            <span className="rounded bg-surface px-2 py-1 text-xs font-medium text-ink">{statusText[l.status]}</span>
          </div>

          {isCase && l.scoreFrom ? (
            <div className="mt-5 grid grid-cols-3 divide-x divide-line border-y border-line">
              <div className="py-3 pr-3">
                <p className="text-xs text-muted">Score before</p>
                <p className="text-2xl font-semibold text-ink">{l.scoreFrom}</p>
              </div>
              <div className="px-4 py-3">
                <p className="text-xs text-muted">Score now</p>
                <p className={`text-2xl font-semibold ${l.scoreTo ? "text-score-green-dark" : "text-muted"}`}>{l.scoreTo ?? "–"}</p>
              </div>
              <div className="py-3 pl-4">
                <p className="text-xs text-muted">Gain</p>
                <p className="text-2xl font-semibold text-score-green-dark">{l.scoreTo ? `+${l.scoreTo - l.scoreFrom}` : "–"}</p>
              </div>
            </div>
          ) : l.amount ? (
            <p className="mt-4 text-sm text-ink">
              Amount: <span className="font-semibold">{l.amount}</span>
            </p>
          ) : null}

          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-muted">Your payout</span>
            <span className={`font-semibold ${l.payout ? "text-score-green-dark" : "text-muted"}`}>{l.payout ?? "After completion"}</span>
          </div>
        </section>
          <div className="hidden md:block">
            <ActionBar>
        <a
          href={`tel:${digits}`}
          className="pressable flex flex-1 items-center justify-center gap-1.5 rounded-md border border-line py-3 text-sm font-medium text-brand-700"
        >
          <Phone className="h-4 w-4" /> Call
        </a>
        <a
          href={`https://wa.me/91${digits}`}
          target="_blank"
          rel="noreferrer"
          className="pressable flex flex-1 items-center justify-center gap-1.5 rounded-md bg-[#128C4B] py-3 text-sm font-medium text-white"
        >
          <MessageCircle className="h-4 w-4" /> WhatsApp
        </a>
      </ActionBar>
          </div>
        </aside>

        <div className="mt-2 space-y-2 md:col-span-8 md:col-start-1 md:row-start-1 md:mt-0 md:columns-2 md:gap-6 md:space-y-0 md:*:mb-6 md:*:break-inside-avoid">

        {isCase && (
          <Panel title="Case progress">
            <ol>
              {rectificationStages.map((s, i) => {
                const failed = l.status === "rejected" && i === stage;
                const done = i < stage;
                const current = i === stage && !failed;
                return (
                  <li key={s} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <span
                        className={`grid h-6 w-6 place-items-center rounded-full text-xs font-semibold ${
                          failed ? "bg-score-red text-white" : done ? "bg-score-green text-white" : current ? "bg-amber-400 text-white" : "bg-surface text-muted"
                        }`}
                      >
                        {failed ? <X className="h-3.5 w-3.5" /> : done ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : i + 1}
                      </span>
                      {i < rectificationStages.length - 1 && <span className={`w-px flex-1 ${done ? "bg-score-green" : "bg-line"}`} />}
                    </div>
                    <div className="pb-5">
                      <p className={`text-sm font-medium ${done || current || failed ? "text-ink" : "text-muted"}`}>{s}</p>
                      {current && l.step && <p className="text-xs text-amber-700">{l.step}</p>}
                      {failed && <p className="text-xs text-score-red">{l.step}</p>}
                    </div>
                  </li>
                );
              })}
            </ol>
          </Panel>
        )}

        {isCase && l.issues && (
          <Panel title="Errors being fixed">
            <ul className="divide-y divide-line">
              {l.issues.map((i) => (
                <li key={i} className="flex items-center justify-between py-2.5 text-sm">
                  <span className="text-ink">{i}</span>
                  <span className={`text-xs ${l.scoreTo ? "text-score-green-dark" : "text-muted"}`}>{l.scoreTo ? "Fixed" : "Disputed"}</span>
                </li>
              ))}
            </ul>
          </Panel>
        )}

        {!isCase && (
          <Panel title="Status">
            <p className="text-sm text-ink">{l.step ?? statusText[l.status]}</p>
            <p className="mt-1 text-xs text-muted">Added on {l.date}</p>
          </Panel>
        )}
        </div>
      </div>

      <div className="md:hidden">
      <ActionBar>
        <a
          href={`tel:${digits}`}
          className="pressable flex flex-1 items-center justify-center gap-1.5 rounded-md border border-line py-3 text-sm font-medium text-brand-700"
        >
          <Phone className="h-4 w-4" /> Call
        </a>
        <a
          href={`https://wa.me/91${digits}`}
          target="_blank"
          rel="noreferrer"
          className="pressable flex flex-1 items-center justify-center gap-1.5 rounded-md bg-[#128C4B] py-3 text-sm font-medium text-white"
        >
          <MessageCircle className="h-4 w-4" /> WhatsApp
        </a>
      </ActionBar>
      </div>
    </div>
  );
}
