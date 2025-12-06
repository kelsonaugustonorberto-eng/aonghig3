import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { faqItems } from "@/data/content";

export const metadata: Metadata = {
  title: "FAQ | Perguntas frequentes",
  description: "Perguntas frequentes sobre higienização profissional e o nosso processo.",
};

export default function FAQPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
      <PageIntro
        eyebrow="FAQ"
        title="Perguntas frequentes"
        description="Respostas diretas para as dúvidas mais comuns sobre o serviço de higienização."
      />

      <div className="space-y-4">
        {faqItems.map((item) => (
          <details
            key={item.question}
            className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6"
          >
            <summary className="cursor-pointer text-lg font-semibold text-[var(--foreground)]">
              {item.question}
            </summary>
            <p className="mt-3 text-[var(--muted)]">{item.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
