"use client";

import { useFormState, useFormStatus } from "react-dom";
import { adminLoginAction } from "@/actions/admin";

const initialState = { error: "" };

export function AdminLoginForm() {
  const [state, formAction] = useFormState(adminLoginAction, initialState);
  return (
    <form
      action={formAction}
      className="w-full max-w-md space-y-4 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8"
    >
      <div className="space-y-1 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-[var(--muted)]">
          Admin
        </p>
        <h1 className="text-2xl font-semibold">Entrar no painel</h1>
        <p className="text-sm text-[var(--muted)]">
          Introduz a chave de acesso definida no .env.
        </p>
      </div>
      <label className="text-sm font-medium">
        Chave de acesso
        <input
          type="password"
          name="accessKey"
          required
          className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3"
          placeholder="********"
        />
      </label>
      {state?.error ? (
        <p className="text-sm text-red-600" role="alert">
          {state.error}
        </p>
      ) : null}
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="w-full rounded-full bg-[var(--ango-green)] px-6 py-3 text-sm font-semibold text-white disabled:opacity-70"
      disabled={pending}
    >
      {pending ? "A validar..." : "Entrar"}
    </button>
  );
}
