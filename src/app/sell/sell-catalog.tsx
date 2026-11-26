"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, SearchX } from "lucide-react";
import { ShareButton } from "@/components/share-button";
import { categories, categoryColor, products, recommended, type ProductCategory } from "@/lib/data";
import { Icon } from "@/components/icons";
import { ProductIconCell } from "@/components/cards";
import { Coin } from "@/components/brand";
import { ProductArt } from "@/components/product-art";
import { Section } from "@/components/ui";
import { RectificationCard } from "@/components/rectification";

export function SellCatalog() {
  const [cat, setCat] = useState<ProductCategory | "all">("all");
  const [q, setQ] = useState("");

  const list = useMemo(
    () =>
      products.filter(
        (p) => (cat === "all" || p.category === cat) && p.name.toLowerCase().includes(q.trim().toLowerCase())
      ),
    [cat, q]
  );

  return (
    <div className="space-y-7 pt-5 md:pt-0">
      <RectificationCard />

      <Section title="Recommended for you">
        <div className="rail px-4 pb-2 md:grid md:grid-cols-4 md:gap-4 md:overflow-visible md:px-0">
          {recommended.map((r) => (
            <Link
              key={r.slug}
              href={`/sell/${r.slug}`}
              className="pressable flex w-[210px] flex-col overflow-hidden rounded-lg border border-line bg-white md:w-auto md:hover:border-brand-200"
            >
              <div className={`relative grid h-28 place-items-center border-b border-line ${r.panel}`}>
                <span className="absolute top-2.5 left-2.5 rounded-md bg-white px-2 py-0.5 text-[11px] font-medium text-ink ring-1 ring-line">
                  {r.kind}
                </span>
                <ProductArt kind={r.art} className="mt-5 h-[78px] w-auto" />
              </div>
              <div className="flex flex-1 flex-col p-3.5">
                <span className="text-base leading-tight font-semibold">{r.title}</span>
                <span className="mt-0.5 text-xs text-muted">{r.lenders}</span>
                <div className="mt-3 flex items-end justify-between border-t border-dashed border-line pt-2.5">
                  <span className="leading-tight">
                    <span className="block text-[11px] text-muted">You earn</span>
                    <span className="text-base font-semibold text-score-green-dark">{r.payout}</span>
                  </span>
                  <span className="flex items-center gap-1 text-xs font-medium text-ink">
                    +<Coin className="h-4 w-4" /> {r.coins}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <Section title="Products">
        {/* search + filters, sticky on mobile under nothing (no app bar on this tab) */}
        <div className="sticky top-0 z-20 -mt-1 bg-surface/95 px-4 pt-1 pb-3 backdrop-blur-md md:static md:mt-0 md:flex md:items-center md:gap-3 md:bg-transparent md:px-0 md:pt-0 md:backdrop-blur-none">
          <label className="flex items-center gap-2 rounded-lg border border-line bg-white px-3.5 py-3 md:order-last md:ml-auto md:w-72 md:shrink-0 md:rounded-md md:py-2">
            <Search className="h-4 w-4 text-muted" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search loans, cards, insurance…"
              className="w-full bg-transparent text-base outline-none placeholder:text-muted md:text-sm"
            />
          </label>
          <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto md:mt-0 md:flex-1">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setCat(c.id)}
                className={`pressable shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  cat === c.id ? "bg-brand-700 text-white" : "border border-line bg-white text-ink/75"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {list.length ? (
          <>
            {/* phones: icon grid */}
            <div className="grid grid-cols-4 gap-y-2 border-y border-line bg-white px-1 py-3 sm:grid-cols-5 md:hidden">
              {list.map((p) => (
                <ProductIconCell key={p.slug} p={p} />
              ))}
            </div>
            {/* desktop: dense rows, 3 columns */}
            <div className="mt-4 hidden overflow-hidden rounded-lg border border-line bg-white md:grid md:grid-cols-3">
              {list.map((p) => (
                <Link
                  key={p.slug}
                  href={`/sell/${p.slug}`}
                  className="flex items-center gap-3 border-b border-line px-4 py-3.5 hover:bg-surface/60 [&:not(:nth-child(3n))]:border-r"
                >
                  <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${categoryColor[p.category].tile}`}>
                    <Icon name={p.icon} className="h-5 w-5" />
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
              ))}
            </div>
          </>
        ) : (
          <div className="mx-4 flex flex-col items-center rounded-lg bg-white py-10 text-center shadow-card md:mx-0">
            <SearchX className="h-10 w-10 text-muted" />
            <p className="mt-2 font-semibold">No products match &ldquo;{q}&rdquo;</p>
            <p className="text-sm text-muted">Try another name or category</p>
          </div>
        )}
      </Section>

      <div className="flex items-center gap-4 bg-brand-700 px-4 py-5 text-white md:rounded-lg md:px-5">
        <div className="flex-1">
          <p className="text-xl font-semibold">Share your partner store</p>
          <p className="text-sm text-white/70">One link with all products. Every application is tagged to you.</p>
        </div>
        <ShareButton label="Share" text="All PrimeScore products in one place" className="shrink-0 rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-brand-700" />
      </div>
    </div>
  );
}
