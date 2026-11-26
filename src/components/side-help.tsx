/** Desktop-only help panel shown beside forms. */
export function SideHelp({ title, items, note }: { title: string; items: { title: string; body: string }[]; note?: string }) {
  return (
    <aside className="hidden md:sticky md:top-20 md:col-span-5 md:block">
      <section className="rounded-lg border border-line bg-white">
        <h2 className="border-b border-line px-5 py-3.5 text-sm font-semibold text-ink">{title}</h2>
        <ol className="space-y-4 px-5 py-4">
          {items.map((it, i) => (
            <li key={it.title} className="flex gap-3">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-50 text-xs font-semibold text-brand-700">{i + 1}</span>
              <div>
                <p className="text-sm font-medium text-ink">{it.title}</p>
                <p className="text-sm text-muted">{it.body}</p>
              </div>
            </li>
          ))}
        </ol>
        {note && <p className="border-t border-line bg-surface/60 px-5 py-3 text-xs text-muted">{note}</p>}
      </section>
    </aside>
  );
}
