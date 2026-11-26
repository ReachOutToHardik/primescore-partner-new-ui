import Link from "next/link";
import { SubHeader } from "@/components/sub-header";
import { notifications } from "@/lib/data";

export const metadata = { title: "Notifications" };

export default function NotificationsPage() {
  return (
    <div className="md:max-w-3xl">
      <SubHeader title="Notifications" subtitle="Updates on your cases, payouts and trainings" backLabel="Home" />
      <ul className="divide-y divide-line border-b border-line bg-white md:overflow-hidden md:rounded-lg md:border">
        {notifications.map((n) => (
          <li key={n.id}>
            <Link href={n.href} className={`flex gap-3 px-4 py-4 md:hover:bg-surface ${n.unread ? "bg-brand-50/50" : ""}`}>
              <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${n.unread ? "bg-brand-600" : "bg-transparent"}`} />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-ink">{n.title}</p>
                <p className="mt-0.5 text-sm text-muted">{n.body}</p>
                <p className="mt-1 text-xs text-muted">{n.time}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
