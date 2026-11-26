"use client";

import { useState } from "react";
import { Check, Share2 } from "lucide-react";
import { partner } from "@/lib/data";

/** Shares the partner's tracked link (native share sheet, or copies it). */
export function ShareButton({
  path = "",
  text = "Check your credit score for free with PrimeScore",
  label = "Share link",
  className = "",
}: {
  path?: string;
  text?: string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = `https://www.primescore.in/${path}?ref=${partner.code}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "PrimeScore", text, url });
        return;
      }
      await navigator.clipboard.writeText(`${text}: ${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* user closed the share sheet */
    }
  }

  return (
    <button onClick={share} className={`pressable flex items-center justify-center gap-1.5 ${className}`}>
      {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
      {copied ? "Link copied" : label}
    </button>
  );
}
