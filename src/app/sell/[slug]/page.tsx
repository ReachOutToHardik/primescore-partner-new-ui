import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, FileText, Plus } from "lucide-react";
import { ActionBar, SubHeader } from "@/components/sub-header";
import { ShareButton } from "@/components/share-button";
import { Icon } from "@/components/icons";
import { Coin } from "@/components/brand";
import { Panel } from "@/components/ui";
import { categoryColor, productInfo, products, rectification, rectificationStages } from "@/lib/data";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/sell/[slug]">) {
  const { slug } = await params;
  return { title: products.find((p) => p.slug === slug)?.name ?? "Product" };
}

// Reads the URL id inside <Suspense> so navigation stays instant (Cache Components).
export default function ProductPage({ params }: PageProps<"/sell/[slug]">) {
  return (
    <Suspense fallback={<DetailSkeleton />}>
      <ProductContent params={params} />
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

async function ProductContent({ params }: { params: PageProps<"/sell/[slug]">["params"] }) {
  const { slug } = await params;
  const p = products.find((x) => x.slug === slug);
  if (!p) notFound();
  const c = categoryColor[p.category];
  const info = productInfo[p.category];
  const isRect = p.category === "rectification";

  return (
    <div className="pb-20 md:pb-0">
      <SubHeader title={p.name} subtitle={c.label !== p.name ? c.label : "PrimeScore's main product"} backLabel="Sell & Earn" fallback="/sell" />

      <div className="md:grid md:grid-cols-12 md:items-start md:gap-6">
        <aside className="md:sticky md:top-20 md:col-span-4 md:col-start-9 md:row-start-1 md:space-y-3">
        <section className="border-b border-line bg-white px-4 py-5 md:rounded-lg md:border">
          <div className="flex items-center gap-3">
            <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-full ${c.tile}`}>
              <Icon name={p.icon} className="h-6 w-6" />
            </span>
            <div className="min-w-0 flex-1">
              {c.label !== p.name && <p className="text-xs text-muted">{c.label}</p>}
              <h2 className="text-xl font-semibold text-ink">{p.name}</h2>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 divide-x divide-line border-y border-line">
            <div className="py-3 pr-3">
              <p className="text-xs text-muted">You earn</p>
              <p className="text-xl font-semibold text-score-green-dark">{p.payout}</p>
              <p className="text-xs text-muted">{p.payoutLabel ?? "per approval"}</p>
            </div>
            <div className="py-3 pl-4">
              {isRect ? (
                <>
                  <p className="text-xs text-muted">Avg. score gain</p>
                  <p className="text-xl font-semibold text-ink">+{rectification.avgGain}</p>
                  <p className="text-xs text-muted">in about {rectification.avgDays} days</p>
                </>
              ) : (
                <>
                  <p className="text-xs text-muted">Bonus</p>
                  <p className="flex items-center gap-1 text-xl font-semibold text-ink">
                    <Coin className="h-5 w-5" /> {p.coins ?? 0}
                  </p>
                  <p className="text-xs text-muted">Prime Coins</p>
                </>
              )}
            </div>
          </div>
          <p className="mt-3 text-sm text-muted">{info.how}</p>
        </section>
          <div className="hidden md:block">
            <ActionBar>
        <ShareButton
          path={`p/${p.slug}`}
          text={isRect ? "Fix errors on your credit report with PrimeScore" : `Apply for ${p.name} with PrimeScore`}
          className="flex-1 rounded-md border border-line py-3 text-sm font-medium text-brand-700"
        />
        <Link
          href={`/leads/new?product=${p.slug}`}
          className="pressable flex flex-1 items-center justify-center gap-1.5 rounded-md bg-brand-700 py-3 text-sm font-medium text-white"
        >
          <Plus className="h-4 w-4" /> {isRect ? "Add case" : "Add lead"}
        </Link>
      </ActionBar>
          </div>
        </aside>

        <div className="mt-2 space-y-2 md:col-span-8 md:col-start-1 md:row-start-1 md:mt-0 md:columns-2 md:gap-6 md:space-y-0 md:*:mb-6 md:*:break-inside-avoid">

        {isRect && (
          <Panel title="What we fix">
            <ul className="space-y-2.5">
              {rectification.fixes.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-ink">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-score-green-dark" strokeWidth={2.5} /> {f}
                </li>
              ))}
            </ul>
          </Panel>
        )}

        {isRect && (
          <Panel title="How a case works">
            <ol className="space-y-3">
              {rectificationStages.map((s, i) => (
                <li key={s} className="flex items-center gap-3 text-sm text-ink">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-50 text-xs font-semibold text-brand-700">{i + 1}</span>
                  {s}
                </li>
              ))}
            </ol>
          </Panel>
        )}

        <Panel title="Who can apply">
          <ul className="space-y-2.5">
            {info.eligibility.map((e) => (
              <li key={e} className="flex items-start gap-2.5 text-sm text-ink">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-score-green-dark" strokeWidth={2.5} /> {e}
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Documents needed">
          <ul className="space-y-2.5">
            {info.docs.map((d) => (
              <li key={d} className="flex items-start gap-2.5 text-sm text-ink">
                <FileText className="mt-0.5 h-4 w-4 shrink-0 text-muted" /> {d}
              </li>
            ))}
          </ul>
        </Panel>
        </div>
      </div>

      <div className="md:hidden">
      <ActionBar>
        <ShareButton
          path={`p/${p.slug}`}
          text={isRect ? "Fix errors on your credit report with PrimeScore" : `Apply for ${p.name} with PrimeScore`}
          className="flex-1 rounded-md border border-line py-3 text-sm font-medium text-brand-700"
        />
        <Link
          href={`/leads/new?product=${p.slug}`}
          className="pressable flex flex-1 items-center justify-center gap-1.5 rounded-md bg-brand-700 py-3 text-sm font-medium text-white"
        >
          <Plus className="h-4 w-4" /> {isRect ? "Add case" : "Add lead"}
        </Link>
      </ActionBar>
      </div>
    </div>
  );
}
