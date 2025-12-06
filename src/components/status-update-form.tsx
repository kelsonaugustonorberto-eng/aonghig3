"use client";

import { useFormState, useFormStatus } from "react-dom";
import { updateAgendamentoStatusAction } from "@/actions/admin";
import { AgendamentoStatus } from "@/types/agendamento";

const statuses: AgendamentoStatus[] = [
  "PENDENTE",
  "CONFIRMADO",
  "CONCLUIDO",
  "CANCELADO",
];

const initialState = { error: undefined as string | undefined };

type StatusUpdateFormProps = {
  id: string;
  current: AgendamentoStatus;
};

export function StatusUpdateForm({ id, current }: StatusUpdateFormProps) {
  const [state, formAction] = useFormState(
    updateAgendamentoStatusAction,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-2">
      <input type="hidden" name="id" value={id} />
      <select
        name="status"
        defaultValue={current}
        className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-3 py-2 text-sm"
      >
        {statuses.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
      {state?.error ? (
        <p className="text-xs text-red-600" role="alert">
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
      className="w-full rounded-full bg-[var(--ango-green)] px-3 py-2 text-xs font-semibold text-white disabled:opacity-60"
      disabled={pending}
    >
      {pending ? "A atualizar..." : "Guardar"}
    </button>
  );
}
