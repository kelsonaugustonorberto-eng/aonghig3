import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pedido enviado",
};

type SuccessPageProps = {
  searchParams: { id?: string };
};

export default function AgendarSuccessPage({ searchParams }: SuccessPageProps) {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 py-24 text-center lg:px-8">
      <p className="text-sm uppercase tracking-[0.3em] text-[var(--muted)]">
        Pedido enviado
      </p>
      <h1 className="text-3xl font-semibold">
        Recebemos o teu pedido de agendamento.
      </h1>
      <p className="text-lg text-[var(--muted)]">
        A nossa equipa vai entrar em contacto via WhatsApp ou SMS para confirmar
        a data e hora.{" "}
        {searchParams.id ? (
          <span className="font-semibold text-[var(--foreground)]">
            ID: {searchParams.id}
          </span>
        ) : null}
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="rounded-full bg-[var(--ango-green)] px-6 py-3 text-sm font-semibold text-white"
        >
          Voltar à Home
        </Link>
        <Link
          href="/servicos"
          className="rounded-full border border-[var(--border)] px-6 py-3 text-sm font-semibold"
        >
          Ver serviços
        </Link>
      </div>
    </div>
  );
}
