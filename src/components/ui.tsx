import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function Section({
  title,
  action,
  href = "#",
  children,
  className = "",
  dark,
  flush,
}: {
  title?: React.ReactNode;
  action?: string;
  href?: string;
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
  /** Parent already provides side padding. */
  flush?: boolean;
}) {
  return (
    <section className={className}>
      {title && (
        <div className={`mb-3 flex items-center justify-between gap-3 ${flush ? "" : "px-4 md:px-0"}`}>
          <h2 className={`text-base font-semibold ${dark ? "text-white" : "text-ink"}`}>{title}</h2>
          {action && <SeeAll href={href} label={action} dark={dark} />}
        </div>
      )}
      {children}
    </section>
  );
}

export function SeeAll({ href = "#", label = "See all", dark }: { href?: string; label?: string; dark?: boolean }) {
  return (
    <Link
      href={href}
      className={`inline-flex shrink-0 items-center gap-0.5 text-sm font-medium ${dark ? "text-white/85 hover:text-white" : "text-brand-600 hover:text-brand-700"}`}
    >
      {label}
      <ChevronRight className="h-4 w-4" />
    </Link>
  );
}

/**
 * Full-width white section on phones (edge to edge, thin top/bottom rule),
 * a panel with small corners on desktop. This replaces floating cards.
 */
export function Panel({
  title,
  action,
  href = "#",
  children,
  className = "",
  bodyClassName = "px-4 pb-4",
}: {
  title?: React.ReactNode;
  action?: string;
  href?: string;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <section className={`border-y border-line bg-white md:rounded-lg md:border ${className}`}>
      {title && (
        <div className="flex items-center justify-between gap-3 px-4 pt-4 pb-3">
          <h2 className="text-base font-semibold text-ink">{title}</h2>
          {action && <SeeAll href={href} label={action} />}
        </div>
      )}
      <div className={title ? bodyClassName : bodyClassName.replace("pb-4", "py-4")}>{children}</div>
    </section>
  );
}

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-lg border border-line bg-white ${className}`}>{children}</div>;
}

export function ListRow({
  icon,
  label,
  value,
  href = "/soon",
  danger,
}: {
  icon: React.ReactNode;
  label: string;
  value?: React.ReactNode;
  href?: string;
  danger?: boolean;
}) {
  return (
    <Link href={href} className="group flex items-center gap-3 px-4 py-3 transition-colors active:bg-surface md:hover:bg-surface">
      <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${danger ? "bg-red-50 text-score-red" : "bg-brand-50 text-brand-700"}`}>
        {icon}
      </span>
      <span className={`flex-1 text-sm font-medium ${danger ? "text-score-red" : "text-ink"}`}>{label}</span>
      {value && <span className="text-sm text-muted">{value}</span>}
      <ChevronRight className="h-4 w-4 text-muted" />
    </Link>
  );
}

export function Pill({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium ${className}`}>{children}</span>;
}

export function Avatar({ name, className = "h-10 w-10 text-sm" }: { name: string; className?: string }) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
  return (
    <span className={`grid shrink-0 place-items-center rounded-full bg-brand-100 font-semibold text-brand-700 ${className}`}>{initials}</span>
  );
}
