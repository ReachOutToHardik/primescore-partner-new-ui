import { Suspense } from "react";
import { SubHeader } from "@/components/sub-header";
import { SideHelp } from "@/components/side-help";
import { rectification } from "@/lib/data";
import { NewLeadForm } from "./new-lead-form";

export const metadata = { title: "Add case" };

export default function NewLeadPage() {
  return (
    <div>
      <SubHeader title="Add case or lead" subtitle="Enter the customer's details. We'll take it from there." backLabel="My Leads" fallback="/leads" />
      <div className="md:grid md:grid-cols-12 md:items-start md:gap-6">
        <div className="md:col-span-7">
          {/* the form reads ?product=…, which is only known at request time */}
          <Suspense fallback={<div className="h-96 bg-white md:rounded-lg md:border md:border-line" />}>
            <NewLeadForm />
          </Suspense>
        </div>
        <SideHelp
          title="What happens next"
          items={[
            { title: "Customer gets a consent link", body: "They approve on WhatsApp so we can pull their credit report." },
            { title: "Our experts review the report", body: "We find wrong late payments, duplicates and other errors." },
            { title: "Disputes are raised with the bureau", body: "You can track every step in My Leads." },
            { title: "You get paid", body: `${rectification.payout} ${rectification.payoutLabel} once the report is updated.` },
          ]}
          note="Never ask customers for their OTP or passwords. PrimeScore only needs consent on its own link."
        />
      </div>
    </div>
  );
}
