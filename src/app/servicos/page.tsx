import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/page-intro";
import { serviceDetails } from "@/data/content";

export const metadata: Metadata = {
  title: "Serviços de higienização",
  description:
    "Higienização profissional de sofás, colchões, tapetes, viaturas e mais em Luanda.",
};

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
      <PageIntro
        eyebrow="Serviços"
        title="Serviços de higienização para casa, escritório e viaturas."
        description="Processos padronizados, equipamentos profissionais e produtos adequados para cada tecido."
      />

      <div className="space-y-6">
        {serviceDetails.map((service) => (
          <div
            key={service.id}
            className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8"
          >
            <div className="flex flex-col gap-2 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <h2 className="text-2xl font-semibold">{service.title}</h2>
                <p className="mt-2 text-[var(--muted)]">{service.description}</p>
              </div>
              <Link
                href={`/agendar?servico=${service.id}`}
                className="mt-4 inline-flex rounded-full bg-[var(--ango-green)] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[var(--ango-green-dark)] lg:mt-0"
              >
                Agendar este serviço
              </Link>
            </div>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-[var(--muted)]">
                  Inclui
                </p>
                <ul className="mt-3 space-y-2 text-[var(--muted)]">
                  {service.includes.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-[var(--muted)]">
                  Ideal para
                </p>
                <ul className="mt-3 space-y-2 text-[var(--muted)]">
                  {service.idealFor.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
