import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { AgendarForm } from "@/components/agendar-form";

export const metadata: Metadata = {
  title: "Agendar higienização",
  description:
    "Escolhe o serviço, indica a data e confirma os teus dados. Entraremos em contacto para validar tudo.",
};

export default function AgendarPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
      <PageIntro
        eyebrow="Agendar"
        title="Marca a tua higienização em poucos segundos."
        description="Escolhe o serviço, indica a data e confirma os teus dados. A nossa equipa entra em contacto por WhatsApp ou SMS para validar tudo."
      />

      <div className="rounded-[32px] border border-[var(--border)] bg-[var(--surface)] p-8">
        <AgendarForm />
      </div>
    </div>
  );
}
