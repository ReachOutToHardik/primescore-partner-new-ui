"use client";

import { useEffect, useState } from "react";
import { Phone, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { partner } from "@/lib/data";

/** Floating "talk to your relationship manager" button with a speech bubble. */
export function HelpFab() {
  const pathname = usePathname();
  const [bubble, setBubble] = useState(false);

  useEffect(() => {
    // Nudge once per session, only on Home
    let seen = false;
    try {
      seen = sessionStorage.getItem("ps-rm-nudge") === "1";
    } catch {}
    if (seen || pathname !== "/") return;
    const t = setTimeout(() => {
      setBubble(true);
      try {
        sessionStorage.setItem("ps-rm-nudge", "1");
      } catch {}
    }, 1800);
    const h = setTimeout(() => setBubble(false), 9000);
    return () => {
      clearTimeout(t);
      clearTimeout(h);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // On mobile the call button lives on Home & Sell only; on desktop it is always there.
  const mobileVisible = pathname === "/" || pathname === "/sell";

  return (
    <div className={`fixed right-4 ${mobileVisible ? "flex md:hidden" : "hidden"} bottom-24 z-40 items-center gap-3 md:right-8 md:bottom-8`}>
      {bubble && (
        <div className="relative max-w-[220px] animate-pop rounded-lg border border-line bg-white px-3.5 py-2.5 shadow-lift">
          <button
            onClick={() => setBubble(false)}
            aria-label="Close"
            className="absolute -top-2 -right-2 grid h-5 w-5 place-items-center rounded-full bg-ink text-white"
          >
            <X className="h-3 w-3" />
          </button>
          <p className="text-sm font-semibold text-ink">Hi {partner.firstName}! Baat karein?</p>
          <p className="text-xs leading-snug text-ink">
            Your RM will help you make your first sale
          </p>
        </div>
      )}
      <a
        href="tel:+910000000000"
        aria-label="Call your relationship manager"
        className="grid h-14 w-14 place-items-center rounded-full bg-brand-700 text-white shadow-lift transition-transform active:scale-95"
      >
        <Phone className="h-6 w-6" fill="currentColor" strokeWidth={0} />
      </a>
    </div>
  );
}
