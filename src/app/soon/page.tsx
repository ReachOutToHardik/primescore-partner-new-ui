import Link from "next/link";
import { Hammer } from "lucide-react";
import { SubHeader } from "@/components/sub-header";

export const metadata = { title: "Coming soon" };

/** Placeholder for features that aren't built yet, so no button is a dead end. */
export default function SoonPage() {
  return (
    <div className="md:max-w-3xl">
      <SubHeader title="Coming soon" />
      <div className="flex flex-col items-center border-b border-line bg-white px-6 py-14 text-center md:rounded-lg md:border">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-brand-50 text-brand-700">
          <Hammer className="h-6 w-6" />
        </span>
        <h2 className="mt-4 text-xl font-semibold text-ink">We&apos;re building this</h2>
        <p className="mt-1 max-w-xs text-sm text-muted">This feature is on its way. Your relationship manager can help in the meantime.</p>
        <Link href="/" className="pressable mt-6 rounded-md bg-brand-700 px-6 py-3 text-sm font-medium text-white">
          Back to home
        </Link>
      </div>
    </div>
  );
}
