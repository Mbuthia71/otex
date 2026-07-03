import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";

export const Route = createFileRoute("/pipelines")({
  component: PipelinesPage,
  head: () => ({
    meta: [
      { title: "Pipelines — Savannah Cloud" },
      { name: "description", content: "Durable background jobs, cron, and queues. Built-in retries, DLQs, and real-time logs." },
      { property: "og:title", content: "Pipelines — Savannah Cloud" },
      { property: "og:description", content: "Background jobs that don't keep you up at night." },
    ],
    links: [{ rel: "canonical", href: "https://savannahcloud.com/pipelines/" }],
  }),
});

function PipelinesPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Pipelines"
        title={<>Background jobs that <span className="font-serif-italic">don't keep you up.</span></>}
        lede="Queue work, schedule cron, fan out to workers. Built-in retries, dead-letter queues, and real-time logs — without standing up Redis."
      />

      <section className="mx-auto max-w-5xl px-6 pb-24 grid lg:grid-cols-2 gap-12 items-start">
        <ul className="space-y-5">
          {[
            "Durable queues with at-least-once delivery",
            "Cron triggers down to the minute",
            "Auto-scaling workers, scale-to-zero",
            "Webhooks in, side effects out",
            "Full execution timeline and replay",
            "Per-pipeline secrets and scoped keys",
          ].map((x) => (
            <li key={x} className="flex items-start gap-3 text-[15px]">
              <Check className="h-4 w-4 mt-1 text-[var(--herb)] shrink-0" />
              <span className="text-foreground/80">{x}</span>
            </li>
          ))}
        </ul>

        <div className="rounded-2xl border border-border bg-[#15151a] text-[#e8e6e1] p-5 font-mono text-[13px] overflow-hidden shadow-sm">
          <div className="flex items-center gap-1.5 pb-4 border-b border-white/10 mb-4">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-3 text-white/40 text-xs">send-welcome.ts</span>
          </div>
          <pre className="leading-relaxed overflow-x-auto">
{`import { pipeline } from "@savannah/sdk";

export default pipeline({
  name: "send-welcome",
  retries: 5,
  async run({ email }) {
    await sc.email.send({
      to: email,
      template: "welcome",
    });
  },
});`}
          </pre>
        </div>
      </section>
    </SiteLayout>
  );
}
