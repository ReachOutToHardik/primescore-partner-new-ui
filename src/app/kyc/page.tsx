import { SubHeader } from "@/components/sub-header";
import { SideHelp } from "@/components/side-help";
import { KycFlow } from "./kyc-flow";

export const metadata = { title: "KYC" };

export default function KycPage() {
  return (
    <div>
      <SubHeader title="Complete KYC" subtitle="Needed once, so we can send payouts to your bank" backLabel="Account" fallback="/account" />
      <div className="md:grid md:grid-cols-12 md:items-start md:gap-6">
        <div className="md:col-span-7">
          <KycFlow />
        </div>
        <SideHelp
          title="Why we need this"
          items={[
            { title: "PAN", body: "Required by law for commission payouts and TDS." },
            { title: "Aadhaar", body: "Confirms your identity with a one-time OTP." },
            { title: "Bank account", body: "Where your weekly payouts are sent." },
            { title: "Partner agreement", body: "Payout terms and how to handle customer data." },
          ]}
          note="Your details are encrypted and only used for verification and payouts."
        />
      </div>
    </div>
  );
}
