import { Metadata } from "next";
import { listAgendamentos } from "@/lib/agendamentos";
import { StatusBadge } from "@/components/status-badge";
import { StatusUpdateForm } from "@/components/status-update-form";

export const metadata: Metadata = {
  title: "Admin | Agendamentos",
};

export default async function AdminDashboard() {
  const agendamentos = await listAgendamentos();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-[var(--foreground)]">
          Agendamentos
        </h2>
        <p className="text-sm text-[var(--muted)]">
          Consulta pedidos recebidos e altera o estado conforme o contacto com o
          cliente.
        </p>
      </div>

      {agendamentos.length === 0 ? (
        <p className="rounded-3xl border border-dashed border-[var(--border)] bg-[var(--surface-muted)] p-8 text-center text-[var(--muted)]">
          Ainda não existem pedidos registados.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wide text-[var(--muted)]">
              <tr>
                <th className="pb-3">ID</th>
                <th className="pb-3">Cliente</th>
                <th className="pb-3">Serviço</th>
                <th className="pb-3">Data preferida</th>
                <th className="pb-3">Estado</th>
                <th className="pb-3">Atualizar</th>
              </tr>
            </thead>
            <tbody>
              {agendamentos.map((item) => (
                <tr key={item.id} className="border-t border-[var(--border)]">
                  <td className="py-4 align-top font-mono text-xs text-[var(--muted)]">
                    {item.id}
                  </td>
                  <td className="py-4 align-top">
                    <p className="font-medium">{item.nome}</p>
                    <p className="text-xs text-[var(--muted)]">
                      {item.telefone}
                    </p>
                    {item.email ? (
                      <p className="text-xs text-[var(--muted)]">
                        {item.email}
                      </p>
                    ) : null}
                  </td>
                  <td className="py-4 align-top">
                    <p className="font-medium">{item.serviceType}</p>
                    <p className="text-xs text-[var(--muted)]">{item.detail}</p>
                    <p className="text-xs text-[var(--muted)]">
                      {item.municipio}, {item.bairro}
                    </p>
                  </td>
                  <td className="py-4 align-top text-xs text-[var(--muted)]">
                    {formatDate(item.preferredDate)} ({item.period})
                  </td>
                  <td className="py-4 align-top">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="py-4 align-top">
                    <StatusUpdateForm id={item.id} current={item.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function formatDate(value: string) {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString("pt-PT");
}
