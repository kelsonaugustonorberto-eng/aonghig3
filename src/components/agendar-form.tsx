"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { agendarServiceOptions } from "@/data/content";

type FormState = {
  serviceType: string;
  detail: string;
  municipio: string;
  bairro: string;
  endereco: string;
  preferredDate: string;
  period: "Manhã" | "Tarde";
  nome: string;
  telefone: string;
  email: string;
  observacoes: string;
};

const municipios = [
  "Talatona",
  "Belas",
  "Luanda",
  "Kilamba Kiaxi",
  "Cacuaco",
  "Viana",
];

export function AgendarForm() {
  const params = useSearchParams();
  const requestedService = params?.get("servico") || "";
  const router = useRouter();

  const defaultService =
    agendarServiceOptions.find((option) => {
      const normalizedRequest = requestedService.trim().toLowerCase();
      if (!normalizedRequest) return false;
      return (
        option.id === normalizedRequest ||
        option.value.toLowerCase().includes(normalizedRequest)
      );
    }) || agendarServiceOptions[0];

  const [form, setForm] = useState<FormState>({
    serviceType: defaultService.value,
    detail: defaultService.details[0],
    municipio: "",
    bairro: "",
    endereco: "",
    preferredDate: "",
    period: "Manhã",
    nome: "",
    telefone: "",
    email: "",
    observacoes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const detailOptions = useMemo(() => {
    const selected = agendarServiceOptions.find(
      (option) => option.value === form.serviceType,
    );
    if (!selected || selected.id === "outro") return [];
    return selected.details;
  }, [form.serviceType]);

  useEffect(() => {
    if (!detailOptions.includes(form.detail)) {
      setForm((prev) => ({
        ...prev,
        detail: detailOptions[0] ?? "",
      }));
    }
  }, [detailOptions, form.detail]);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/agendamentos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceType: form.serviceType,
          detail: form.detail,
          municipio: form.municipio,
          bairro: form.bairro,
          endereco: form.endereco,
          preferredDate: form.preferredDate,
          period: form.period,
          nome: form.nome,
          telefone: form.telefone,
          email: form.email || undefined,
          observacoes: form.observacoes || undefined,
        }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.message || "Não foi possível enviar o pedido.");
      }

      const data = await response.json();
      const recordId = data?.data?.id;
      router.push(
        recordId ? `/agendar/sucesso?id=${encodeURIComponent(recordId)}` : "/agendar/sucesso",
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro inesperado.");
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Tipo de serviço</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {agendarServiceOptions.map((option) => {
            const isActive = form.serviceType === option.value;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() =>
                  setForm((prev) => ({
                    ...prev,
                    serviceType: option.value,
                    detail: option.details[0],
                  }))
                }
                className={`rounded-3xl border px-4 py-3 text-left transition ${
                  isActive
                    ? "border-transparent bg-[var(--ango-green)] text-white"
                    : "border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:border-[var(--foreground)]"
                }`}
              >
                <p className="font-semibold">{option.value}</p>
                <p
                  className={`text-sm ${
                    isActive ? "text-white/80" : "text-[var(--muted)]"
                  }`}
                >
                  {option.id === "outro"
                    ? "Descreve nas observações"
                    : option.details.slice(0, 2).join(" • ")}
                </p>
              </button>
            );
          })}
        </div>
        {detailOptions.length ? (
          <div>
            <label className="text-sm font-medium">
              Detalhes do item
              <select
                className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3"
                value={form.detail}
                onChange={(event) => updateField("detail", event.target.value)}
              >
                {detailOptions.map((detail) => (
                  <option key={detail}>{detail}</option>
                ))}
              </select>
            </label>
          </div>
        ) : null}
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Localização</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-sm font-medium">
            Município
            <select
              required
              className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3"
              value={form.municipio}
              onChange={(event) => updateField("municipio", event.target.value)}
            >
              <option value="">Seleciona o município</option>
              {municipios.map((municipio) => (
                <option key={municipio}>{municipio}</option>
              ))}
            </select>
          </label>
          <label className="text-sm font-medium">
            Bairro
            <input
              required
              type="text"
              className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3"
              value={form.bairro}
              onChange={(event) => updateField("bairro", event.target.value)}
            />
          </label>
        </div>
        <label className="text-sm font-medium">
          Endereço completo
          <input
            required
            type="text"
            className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3"
            value={form.endereco}
            onChange={(event) => updateField("endereco", event.target.value)}
          />
        </label>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Data e horário preferidos</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-sm font-medium">
            Data
            <input
              required
              type="date"
              className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3"
              value={form.preferredDate}
              onChange={(event) =>
                updateField("preferredDate", event.target.value)
              }
            />
          </label>
          <label className="text-sm font-medium">
            Período
            <select
              required
              className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3"
              value={form.period}
              onChange={(event) =>
                updateField("period", event.target.value as FormState["period"])
              }
            >
              <option value="Manhã">Manhã (08:00 – 12:00)</option>
              <option value="Tarde">Tarde (12:00 – 17:00)</option>
            </select>
          </label>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Dados pessoais</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-sm font-medium">
            Nome completo
            <input
              required
              type="text"
              className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3"
              value={form.nome}
              onChange={(event) => updateField("nome", event.target.value)}
            />
          </label>
          <label className="text-sm font-medium">
            WhatsApp
            <input
              required
              type="tel"
              minLength={6}
              className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3"
              value={form.telefone}
              onChange={(event) => updateField("telefone", event.target.value)}
            />
            </label>
        </div>
        <label className="text-sm font-medium">
          Email (opcional)
          <input
            type="email"
            className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
          />
        </label>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Observações</h2>
        <textarea
          rows={4}
          placeholder="Ex.: manchas de vinho, tenho animais em casa, colchão com odores fortes..."
          className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3"
          value={form.observacoes}
          onChange={(event) => updateField("observacoes", event.target.value)}
        />
      </section>

      {error ? (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-[var(--ango-green)] px-6 py-4 text-base font-semibold text-white transition hover:bg-[var(--ango-green-dark)] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "A enviar..." : "Confirmar pedido de higienização"}
      </button>
    </form>
  );
}
