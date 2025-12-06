import { AgendamentoStatus } from "@/types/agendamento";

const colors: Record<AgendamentoStatus, string> = {
  PENDENTE: "bg-amber-100 text-amber-800",
  CONFIRMADO: "bg-emerald-100 text-emerald-700",
  CONCLUIDO: "bg-sky-100 text-sky-800",
  CANCELADO: "bg-rose-100 text-rose-700",
};

type StatusBadgeProps = {
  status: AgendamentoStatus;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${colors[status]}`}
    >
      {status}
    </span>
  );
}
