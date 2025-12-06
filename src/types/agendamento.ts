export type AgendamentoStatus =
  | "PENDENTE"
  | "CONFIRMADO"
  | "CONCLUIDO"
  | "CANCELADO";

export type AgendamentoPayload = {
  serviceType: string;
  detail: string;
  municipio: string;
  bairro: string;
  endereco: string;
  preferredDate: string;
  period: "Manhã" | "Tarde";
  nome: string;
  telefone: string;
  email?: string;
  observacoes?: string;
};

export type AgendamentoRecord = AgendamentoPayload & {
  id: string;
  status: AgendamentoStatus;
  createdAt: string;
};
