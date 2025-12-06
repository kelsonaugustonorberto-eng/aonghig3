import type { Metadata } from "next";
import Image from "next/image";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = {
  title: "Sobre a Ango Higiene",
  description:
    "A Ango Higiene é especialista em higienização profunda de estofos em Luanda, cuidando de casas, empresas e instituições com processos profissionais.",
};

const timeline = [
  { year: "2019", text: "Primeiras higienizações feitas para amigos e família." },
  {
    year: "2020",
    text: "Criação da marca Ango Higiene e investimento em equipamentos profissionais.",
  },
  {
    year: "2022",
    text: "Expansão para atendimento corporativo e início de registo fotográfico completo.",
  },
  {
    year: "2024",
    text: "Sistema de agendamento online e equipa dedicada para operações.",
  },
];

const missionHighlights = [
  {
    title: "Equipamentos e produtos certificados",
    description:
      "Usamos extratoras industriais, escovas rotativas e químicos homologados para eliminar sujidades sem desgastar o tecido ou prejudicar a saúde.",
  },
  {
    title: "Equipa treinada",
    description:
      "Técnicos formados em protocolos de atendimento, segurança e remoção de manchas para garantir resultados consistentes.",
  },
  {
    title: "Remoção profunda",
    description:
      "Processo que alcança camadas internas dos estofos, neutralizando ácaros, fungos, bactérias e odores impregnados.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
      <PageIntro
        eyebrow="Sobre"
        title="Quem somos"
        description="A Ango Higiene é uma empresa especializada em higienização profunda de estofos com atuação em toda Luanda. Atendemos residências, empresas e instituições, preservando a saúde, o bem-estar e o património dos nossos clientes."
      />

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-6 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8">
          <h2 className="text-2xl font-semibold">A nossa missão</h2>
          <p className="text-[var(--muted)]">
            Elevamos o padrão de higienização em Luanda com processos técnicos e
            acompanhamento fotográfico antes/depois para cada serviço.
          </p>
          <ul className="space-y-4">
            {missionHighlights.map((item) => (
              <li key={item.title}>
                <p className="font-semibold text-[var(--foreground)]">{item.title}</p>
                <p className="text-sm text-[var(--muted)]">{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface-muted)]">
          <Image
            src="/uploads/real/IMG_8113.jpg"
            alt="Equipa Ango Higiene"
            width={1100}
            height={800}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <div className="mt-16 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8">
        <h2 className="text-2xl font-semibold">Como começámos</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {timeline.map((item) => (
            <div key={item.year} className="rounded-2xl bg-[var(--surface-muted)] p-6">
              <p className="text-sm uppercase tracking-[0.3em] text-[var(--muted)]">
                {item.year}
              </p>
              <p className="mt-3 text-[var(--foreground)]">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
