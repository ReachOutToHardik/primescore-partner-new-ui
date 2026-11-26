"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Banknote, CircleCheck, CircleX, Clock, Inbox, MessageCircle, Phone, Search, Sparkles } from "lucide-react";
import { leads, rectificationStages, type Lead, type LeadStatus } from "@/lib/data";
import { Avatar } from "@/components/ui";

const statusMeta: Record<LeadStatus, { label: string; cls: string; icon: React.ElementType }> = {
  new: { label: "New", cls: "bg-brand-50 text-brand-700", icon: Sparkles },
  "in-progress": { label: "In progress", cls: "bg-amber-50 text-amber-700", icon: Clock },
  approved: { label: "Score updated", cls: "bg-emerald-50 text-emerald-700", icon: CircleCheck },
  disbursed: { label: "Paid out", cls: "bg-emerald-50 text-emerald-700", icon: Banknote },
  rejected: { label: "Not eligible", cls: "bg-red-50 text-score-red", icon: CircleX },
};

const productStatus: Partial<Record<LeadStatus, string>> = { approved: "Approved", rejected: "Rejected" };
const productFilterLabel: Partial<Record<LeadStatus | "all", string>> = { approved: "Approved", rejected: "Rejected" };

type Tab = "rectification" | "product";

const filters: { id: LeadStatus | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "new", label: "New" },
  { id: "in-progress", label: "In progress" },
  { id: "approved", label: "Done" },
  { id: "disbursed", label: "Paid out" },
  { id: "rejected", label: "Not eligible" },
];

export function LeadsList() {
  const [tab, setTab] = useState<Tab>("rectification");
  const [f, setF] = useState<LeadStatus | "all">("all");
  const [q, setQ] = useState("");

  const inTab = useMemo(() => leads.filter((l) => l.kind === tab), [tab]);
  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return inTab.filter(
      (l) =>
        (f === "all" || l.status === f) &&
        (!s || l.name.toLowerCase().includes(s) || l.product.toLowerCase().includes(s) || l.id.toLowerCase().includes(s))
    );
  }, [inTab, f, q]);

  const tabs = [
    ["rectification", "Rectification cases"],
    ["product", "Other products"],
  ] as const;
  const switchTab = (id: Tab) => {
    setTab(id);
    setF("all");
  };
  const visibleFilters = filters
    .map((x) => ({ ...x, count: x.id === "all" ? inTab.length : inTab.filter((l) => l.status === x.id).length }))
    .filter((x) => x.id === "all" || x.count > 0);
  const filterLabel = (id: LeadStatus | "all", label: string) => (tab === "product" ? (productFilterLabel[id] ?? label) : label);

  const empty = (
    <div className="flex flex-col items-center py-12 text-center">
      <Inbox className="h-10 w-10 text-muted" />
      <p className="mt-2 font-semibold">No leads match</p>
      <p className="text-sm text-muted">Try another filter, or run a free score check to find your next case</p>
    </div>
  );

  return (
    <>
      {/* ---------- phones ---------- */}
      <div className="md:hidden">
        <div className="sticky top-0 z-20 space-y-3 border-b border-line bg-white px-4 pt-3 pb-3">
          <div className="grid grid-cols-2 rounded-md bg-surface p-1">
            {tabs.map(([id, label]) => (
              <button
                key={id}
                onClick={() => switchTab(id)}
                className={`rounded py-2 text-sm font-medium transition-colors ${tab === id ? "bg-white text-brand-700 shadow-sm" : "text-muted"}`}
              >
                {label}
                <span className="ml-1.5 text-xs text-muted">{leads.filter((l) => l.kind === id).length}</span>
              </button>
            ))}
          </div>
          <label className="flex items-center gap-2 rounded-md bg-surface px-3.5 py-2.5">
            <Search className="h-4 w-4 text-muted" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name or case ID"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
            />
          </label>
          <div className="no-scrollbar flex gap-2 overflow-x-auto">
            {visibleFilters.map((x) => (
              <button
                key={x.id}
                onClick={() => setF(x.id)}
                className={`pressable flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${
                  f === x.id ? "bg-brand-700 text-white" : "border border-line text-ink/75"
                }`}
              >
                {filterLabel(x.id, x.label)}
                <span className={`text-xs ${f === x.id ? "text-white/70" : "text-muted"}`}>{x.count}</span>
              </button>
            ))}
          </div>
        </div>
        {list.length === 0 ? (
          <div className="border-b border-line bg-white">{empty}</div>
        ) : (
          <ul className="divide-y divide-line border-b border-line bg-white">
            {list.map((l) => (
              <LeadCard key={l.id} l={l} />
            ))}
          </ul>
        )}
      </div>

      {/* ---------- desktop: one panel = tabs + toolbar + table ---------- */}
      <section className="mt-6 hidden overflow-hidden rounded-lg border border-line bg-white md:block">
        <div className="flex gap-6 border-b border-line px-5">
          {tabs.map(([id, label]) => (
            <button
              key={id}
              onClick={() => switchTab(id)}
              className={`relative flex items-center gap-2 py-3.5 text-sm transition-colors ${
                tab === id ? "font-semibold text-brand-700" : "font-medium text-muted hover:text-ink"
              }`}
            >
              {label}
              <span className={`rounded-full px-1.5 text-xs ${tab === id ? "bg-brand-50 text-brand-700" : "bg-surface text-muted"}`}>
                {leads.filter((l) => l.kind === id).length}
              </span>
              {tab === id && <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-brand-700" />}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 border-b border-line px-5 py-3">
          <label className="flex w-80 items-center gap-2 rounded-md border border-line bg-white px-3 py-2 focus-within:border-brand-400">
            <Search className="h-4 w-4 text-muted" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name or case ID"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
            />
          </label>
          <div className="ml-auto flex items-center gap-1 rounded-md bg-surface p-1">
            {visibleFilters.map((x) => (
              <button
                key={x.id}
                onClick={() => setF(x.id)}
                className={`flex items-center gap-1.5 rounded px-2.5 py-1 text-sm transition-colors ${
                  f === x.id ? "bg-white font-medium text-ink shadow-sm" : "text-muted hover:text-ink"
                }`}
              >
                {filterLabel(x.id, x.label)}
                <span className="text-xs text-muted">{x.count}</span>
              </button>
            ))}
          </div>
        </div>

        {list.length === 0 ? empty : <LeadsTable list={list} kind={tab} />}
      </section>
    </>
  );
}

function LeadCard({ l }: { l: Lead }) {
  const m = statusMeta[l.status];
  const S = m.icon;
  const label = l.kind === "product" ? (productStatus[l.status] ?? m.label) : m.label;
  const isCase = l.kind === "rectification" && l.scoreFrom;
  const stage = Math.min(l.stage ?? 0, rectificationStages.length);
  const stageName = stage >= rectificationStages.length ? "Closed" : rectificationStages[stage];

  return (
    <li className="px-4 py-4">
      <Link href={`/leads/${l.id}`} className="block">
      {/* who + status */}
      <div className="flex items-center gap-3">
        <Avatar name={l.name} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-base font-medium text-ink">{l.name}</p>
          <p className="text-xs text-muted">
            {l.id} · {l.date}
            {l.kind === "product" && <> · {l.product}</>}
          </p>
        </div>
        <span className={`inline-flex shrink-0 items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium ${m.cls}`}>
          <S className="h-3.5 w-3.5" /> {label}
        </span>
      </div>

      {isCase ? (
        <div className="mt-4 space-y-3">
          {/* score */}
          <div className="flex items-baseline gap-2">
            <span className="text-xs text-muted">Score</span>
            <span className="text-xl font-semibold text-ink">{l.scoreFrom}</span>
            {l.scoreTo ? (
              <>
                <span className="text-muted">→</span>
                <span className="text-xl font-semibold text-score-green-dark">{l.scoreTo}</span>
                <span className="text-xs font-medium text-score-green-dark">+{l.scoreTo - l.scoreFrom!}</span>
              </>
            ) : null}
          </div>

          {/* stage */}
          <div>
            <div className="flex gap-1">
              {rectificationStages.map((s, i) => (
                <span
                  key={s}
                  className={`h-1 flex-1 rounded-full ${
                    l.status === "rejected" && i === stage
                      ? "bg-score-red"
                      : i < stage
                        ? "bg-score-green"
                        : i === stage
                          ? "bg-amber-400"
                          : "bg-line"
                  }`}
                />
              ))}
            </div>
            <p className="mt-1.5 text-xs text-muted">
              {stage >= rectificationStages.length ? "All steps done" : `Step ${stage + 1} of ${rectificationStages.length} · ${stageName}`}
            </p>
          </div>

          {l.issues && <p className="text-xs text-muted">Fixing: <span className="text-ink">{l.issues.join(", ")}</span></p>}
        </div>
      ) : l.amount ? (
        <p className="mt-3 text-sm text-ink">{l.amount}</p>
      ) : null}

      </Link>

      {/* next step + contact */}
      <div className="mt-3 flex items-center gap-2">
        <div className="min-w-0 flex-1">
          {l.payout ? (
            <p className="text-sm font-semibold text-score-green-dark">+{l.payout} earned</p>
          ) : (
            <p className={`truncate text-sm ${l.status === "rejected" ? "text-score-red" : "text-ink"}`}>{l.step}</p>
          )}
        </div>
        <a href={`tel:${l.phone.replace(/\D/g, "")}`} aria-label={`Call ${l.name}`} className="pressable grid h-9 w-9 place-items-center rounded-full bg-brand-50 text-brand-700">
          <Phone className="h-4 w-4" />
        </a>
        <a href={`https://wa.me/91${l.phone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" aria-label={`WhatsApp ${l.name}`} className="pressable grid h-9 w-9 place-items-center rounded-full bg-emerald-50 text-[#128C4B]">
          <MessageCircle className="h-4 w-4" />
        </a>
      </div>
    </li>
  );
}

function StageMini({ l }: { l: Lead }) {
  const stage = Math.min(l.stage ?? 0, rectificationStages.length);
  return (
    <div className="w-36">
      <div className="flex gap-0.5">
        {rectificationStages.map((s, i) => (
          <span
            key={s}
            className={`h-1 flex-1 rounded-full ${
              l.status === "rejected" && i === stage ? "bg-score-red" : i < stage ? "bg-score-green" : i === stage ? "bg-amber-400" : "bg-line"
            }`}
          />
        ))}
      </div>
      <p className="mt-1 truncate text-xs text-muted">{stage >= rectificationStages.length ? "All steps done" : rectificationStages[stage]}</p>
    </div>
  );
}

/** Desktop table: one row per lead, the whole row opens the lead. */
function LeadsTable({ list, kind }: { list: Lead[]; kind: Tab }) {
  const router = useRouter();
  const isCase = kind === "rectification";
  const th = "px-4 py-2.5 text-left text-xs font-medium text-muted";
  return (
    <div>
      <table className="w-full">
        <thead className="border-b border-line bg-surface/60">
          <tr>
            <th className={th}>Customer</th>
            <th className={th}>{isCase ? "Score" : "Product"}</th>
            <th className={th}>{isCase ? "Progress" : "Amount"}</th>
            <th className={th}>Status</th>
            <th className={th}>Next step</th>
            <th className={`${th} text-right`}>Payout</th>
            <th className={th}>
              <span className="sr-only">Contact</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {list.map((l) => {
            const m = statusMeta[l.status];
            const S = m.icon;
            const label = l.kind === "product" ? (productStatus[l.status] ?? m.label) : m.label;
            const digits = l.phone.replace(/\D/g, "");
            return (
              <tr key={l.id} onClick={() => router.push(`/leads/${l.id}`)} className="cursor-pointer hover:bg-surface/70">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar name={l.name} className="h-8 w-8 text-xs" />
                    <div className="leading-tight">
                      <Link href={`/leads/${l.id}`} onClick={(e) => e.stopPropagation()} className="text-sm font-medium text-ink hover:text-brand-700">
                        {l.name}
                      </Link>
                      <p className="text-xs text-muted">
                        {l.id} · {l.date}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm">
                  {isCase ? (
                    <span className="font-semibold text-ink">
                      {l.scoreFrom}
                      {l.scoreTo && (
                        <>
                          <span className="mx-1 font-normal text-muted">→</span>
                          <span className="text-score-green-dark">{l.scoreTo}</span>
                          <span className="ml-1 text-xs font-medium text-score-green-dark">+{l.scoreTo - l.scoreFrom!}</span>
                        </>
                      )}
                    </span>
                  ) : (
                    <span className="text-ink">{l.product}</span>
                  )}
                </td>
                <td className="px-4 py-3 text-sm">{isCase ? <StageMini l={l} /> : <span className="text-ink">{l.amount ?? "–"}</span>}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium whitespace-nowrap ${m.cls}`}>
                    <S className="h-3.5 w-3.5" /> {label}
                  </span>
                </td>
                <td className={`max-w-48 truncate px-4 py-3 text-sm ${l.status === "rejected" ? "text-score-red" : "text-ink"}`}>
                  {l.payout ? <span className="text-muted">Completed</span> : l.step}
                </td>
                <td className="px-4 py-3 text-right text-sm font-semibold">
                  {l.payout ? <span className="text-score-green-dark">+{l.payout}</span> : <span className="font-normal text-muted">–</span>}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                    <a href={`tel:${digits}`} aria-label={`Call ${l.name}`} className="grid h-8 w-8 place-items-center rounded-full bg-brand-50 text-brand-700 hover:bg-brand-100">
                      <Phone className="h-3.5 w-3.5" />
                    </a>
                    <a
                      href={`https://wa.me/91${digits}`}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`WhatsApp ${l.name}`}
                      className="grid h-8 w-8 place-items-center rounded-full bg-emerald-50 text-[#128C4B] hover:bg-emerald-100"
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
