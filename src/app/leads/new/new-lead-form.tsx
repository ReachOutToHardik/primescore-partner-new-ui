"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CircleCheck, MessageCircle } from "lucide-react";
import { products } from "@/lib/data";

const field = "w-full rounded-md border border-line bg-white px-3.5 py-3 text-base text-ink outline-none focus:border-brand-400";
const labelCls = "mb-1.5 block text-sm font-medium text-ink";

export function NewLeadForm() {
  const params = useSearchParams();
  const initial = products.some((p) => p.slug === params.get("product")) ? params.get("product")! : "credit-rectification";

  const [product, setProduct] = useState(initial);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [pan, setPan] = useState("");
  const [city, setCity] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState<string | null>(null);

  const isRect = product === "credit-rectification" || product === "credit-report";

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (name.trim().length < 2) err.name = "Enter the customer's full name";
    if (!/^[6-9]\d{9}$/.test(mobile)) err.mobile = "Enter a valid 10-digit mobile number";
    if (pan && !/^[A-Z]{5}\d{4}[A-Z]$/.test(pan)) err.pan = "PAN looks wrong (e.g. ABCDE1234F)";
    if (isRect && !consent) err.consent = "The customer must agree before we pull their report";
    setErrors(err);
    if (Object.keys(err).length) return;
    // Mock: the backend will create the lead and return its ID.
    setDone(`${isRect ? "R" : "L"}-${Math.floor(1050 + Math.random() * 900)}`);
  }

  if (done) {
    return (
      <div className="flex flex-col items-center border-b border-line bg-white px-6 py-12 text-center md:rounded-lg md:border">
        <CircleCheck className="h-14 w-14 text-score-green-dark" strokeWidth={1.5} />
        <h2 className="mt-3 text-xl font-semibold text-ink">{isRect ? "Case created" : "Lead added"}</h2>
        <p className="mt-1 text-sm text-muted">
          {done} · {name}
        </p>
        <p className="mt-4 max-w-xs text-sm text-muted">
          {isRect
            ? "Send the consent link so we can pull their credit report and start the disputes."
            : "Send the application link so the customer can complete their details."}
        </p>
        <a
          href={`https://wa.me/91${mobile}`}
          target="_blank"
          rel="noreferrer"
          className="pressable mt-6 flex w-full max-w-xs items-center justify-center gap-1.5 rounded-md bg-[#128C4B] py-3 text-sm font-medium text-white"
        >
          <MessageCircle className="h-4 w-4" /> Send link on WhatsApp
        </a>
        <Link href="/leads" className="mt-3 text-sm font-medium text-brand-700">
          Back to my leads
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-5 border-b border-line bg-white px-4 py-5 md:rounded-lg md:border md:p-6">
      <div>
        <label className={labelCls} htmlFor="product">
          Product
        </label>
        <select id="product" value={product} onChange={(e) => setProduct(e.target.value)} className={field}>
          {products.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelCls} htmlFor="name">
          Customer name
        </label>
        <input id="name" value={name} onChange={(e) => setName(e.target.value)} className={field} placeholder="As on PAN card" autoComplete="off" />
        {errors.name && <p className="mt-1 text-xs text-score-red">{errors.name}</p>}
      </div>

      <div>
        <label className={labelCls} htmlFor="mobile">
          Mobile number
        </label>
        <div className="flex">
          <span className="grid place-items-center rounded-l-md border border-r-0 border-line bg-surface px-3 text-sm text-muted">+91</span>
          <input
            id="mobile"
            inputMode="numeric"
            maxLength={10}
            value={mobile}
            onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
            className={`${field} rounded-l-none`}
            placeholder="10-digit number"
          />
        </div>
        {errors.mobile && <p className="mt-1 text-xs text-score-red">{errors.mobile}</p>}
      </div>

      <div>
        <label className={labelCls} htmlFor="pan">
          PAN <span className="font-normal text-muted">(optional)</span>
        </label>
        <input
          id="pan"
          value={pan}
          maxLength={10}
          onChange={(e) => setPan(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ""))}
          className={`${field} uppercase`}
          placeholder="ABCDE1234F"
        />
        {errors.pan && <p className="mt-1 text-xs text-score-red">{errors.pan}</p>}
      </div>

      <div>
        <label className={labelCls} htmlFor="city">
          City <span className="font-normal text-muted">(optional)</span>
        </label>
        <input id="city" value={city} onChange={(e) => setCity(e.target.value)} className={field} placeholder="e.g. Jaipur" />
      </div>

      {isRect && (
        <label className="flex items-start gap-3 rounded-md bg-surface p-3.5">
          <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 h-4 w-4 accent-brand-700" />
          <span className="text-sm text-ink">
            The customer agreed to let PrimeScore pull and review their credit report.
            {errors.consent && <span className="mt-1 block text-xs text-score-red">{errors.consent}</span>}
          </span>
        </label>
      )}

      <button type="submit" className="pressable w-full rounded-md bg-brand-700 py-3 text-sm font-medium text-white">
        {isRect ? "Create case" : "Add lead"}
      </button>
    </form>
  );
}
