"use client";

import { useState } from "react";
import Link from "next/link";
import { PlayCircle, Search } from "lucide-react";
import { courses, trainings } from "@/lib/data";
import { CourseCard, TrainingCard } from "@/components/cards";
import { Section } from "@/components/ui";

const topics = ["All", "Rectification", "Loans", "Growth"] as const;
type Topic = (typeof topics)[number];

const videos = [
  { title: "What is a credit score?", mins: "3:12", tag: "Rectification" },
  { title: "Finding errors on a CIBIL report", mins: "4:45", tag: "Rectification" },
  { title: "Collecting loan documents", mins: "6:02", tag: "Loans" },
  { title: "Tracking your payouts", mins: "2:30", tag: "Growth" },
];

function Empty({ what }: { what: string }) {
  return <p className="mx-4 rounded-lg border border-dashed border-line px-4 py-6 text-center text-sm text-muted md:mx-0">No {what} in this topic yet.</p>;
}

export function LearnContent() {
  const [topic, setTopic] = useState<Topic>("All");
  const pick = <T extends { tag: string }>(list: T[]) => (topic === "All" ? list : list.filter((x) => x.tag === topic));

  const t = pick(trainings);
  const c = pick(courses);
  const v = pick(videos);

  return (
    <div className="space-y-7">
      {/* topic tabs: filter every section below */}
      <div className="sticky top-0 z-20 flex items-center border-b border-line bg-white pr-2 md:top-[65px] md:rounded-t-lg">
        <div className="no-scrollbar flex flex-1 gap-6 overflow-x-auto px-4">
          {topics.map((s) => (
            <button
              key={s}
              onClick={() => setTopic(s)}
              aria-pressed={topic === s}
              className={`relative shrink-0 py-3 text-sm transition-colors ${
                topic === s ? "font-semibold text-brand-700" : "font-medium text-muted hover:text-ink"
              }`}
            >
              {s}
              {topic === s && <span className="absolute inset-x-0 -bottom-px h-[2.5px] rounded-full bg-brand-700" />}
            </button>
          ))}
        </div>
        <Link href="/soon" aria-label="Search lessons" className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-ink/70 hover:bg-surface">
          <Search className="h-[18px] w-[18px]" />
        </Link>
      </div>

      <Section title="Live & upcoming trainings">
        {t.length ? (
          <div className="rail px-4 pb-1 md:grid md:grid-cols-2 md:gap-4 md:overflow-visible md:px-0 lg:grid-cols-4">
            {t.map((x) => (
              <TrainingCard key={x.title} t={x} />
            ))}
          </div>
        ) : (
          <Empty what="trainings" />
        )}
      </Section>

      <Section title="Courses">
        {c.length ? (
          <div className="rail px-4 pb-1 md:grid md:grid-cols-2 md:gap-4 md:overflow-visible md:px-0 lg:grid-cols-4">
            {c.map((x) => (
              <CourseCard key={x.title} c={x} />
            ))}
          </div>
        ) : (
          <Empty what="courses" />
        )}
      </Section>

      <Section title="Quick videos">
        {v.length ? (
          <div className="grid grid-cols-2 gap-3 px-4 md:grid-cols-4 md:px-0">
            {v.map((x) => (
              <Link href="/soon" key={x.title} className="pressable block overflow-hidden rounded-lg border border-line bg-white text-left">
                <div className="relative grid aspect-video place-items-center bg-brand-700">
                  <PlayCircle className="h-10 w-10 text-white" strokeWidth={1.5} />
                  <span className="absolute right-2 bottom-2 rounded bg-black/50 px-1.5 text-[11px] font-medium text-white">{x.mins}</span>
                </div>
                <p className="p-3 text-sm leading-snug font-medium">{x.title}</p>
              </Link>
            ))}
          </div>
        ) : (
          <Empty what="videos" />
        )}
      </Section>
    </div>
  );
}
