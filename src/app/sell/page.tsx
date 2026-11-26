import type { Metadata } from "next";
import { CirclePlay, CircleHelp } from "lucide-react";
import { IconButton, PageHeader } from "@/components/app-shell";
import { SellCatalog } from "./sell-catalog";

export const metadata: Metadata = { title: "Sell & Earn" };

export default function SellPage() {
  return (
    <>
      <PageHeader
        title="Sell and Earn"
        subtitle="Pick a product, share the link, earn on every approval"
        actions={
          <div className="flex">
            <IconButton label="How it works" light href="/learn"><CirclePlay className="h-6 w-6" /></IconButton>
            <IconButton label="Help" light><CircleHelp className="h-6 w-6" /></IconButton>
          </div>
        }
      />
      <SellCatalog />
    </>
  );
}
