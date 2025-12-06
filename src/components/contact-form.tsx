"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success">("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("success");
    event.currentTarget.reset();
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium">
          Nome
          <input
            type="text"
            name="nome"
            required
            className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 text-[var(--foreground)] focus:border-[var(--ango-green)] focus:outline-none"
          />
        </label>
        <label className="text-sm font-medium">
          Telefone
          <input
            type="tel"
            name="telefone"
            required
            className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 text-[var(--foreground)] focus:border-[var(--ango-green)] focus:outline-none"
          />
        </label>
      </div>
      <label className="text-sm font-medium">
        Email
        <input
          type="email"
          name="email"
          className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 text-[var(--foreground)] focus:border-[var(--ango-green)] focus:outline-none"
          placeholder="opcional"
        />
      </label>
      <label className="text-sm font-medium">
        Mensagem
        <textarea
          name="mensagem"
          rows={4}
          required
          className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 text-[var(--foreground)] focus:border-[var(--ango-green)] focus:outline-none"
        />
      </label>
      <button
        type="submit"
        className="w-full rounded-full bg-[var(--ango-green)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--ango-green-dark)]"
      >
        Enviar mensagem
      </button>
      {status === "success" ? (
        <p className="text-center text-sm text-[var(--ango-green)]">
          Obrigado! Vamos responder o mais rápido possível.
        </p>
      ) : null}
    </form>
  );
}
