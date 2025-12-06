import { sql } from "@vercel/postgres";
import {
  AgendamentoPayload,
  AgendamentoRecord,
  AgendamentoStatus,
} from "@/types/agendamento";

type DbRow = {
  id: string;
  service_type: string;
  detail: string;
  municipio: string;
  bairro: string;
  endereco: string;
  preferred_date: string;
  period: string;
  nome: string;
  telefone: string;
  email: string | null;
  observacoes: string | null;
  status: AgendamentoStatus;
  created_at: Date;
};

const fallbackStore: AgendamentoRecord[] = [];
const hasDatabaseConnection =
  Boolean(process.env.POSTGRES_URL) ||
  Boolean(process.env.POSTGRES_URL_NON_POOLING) ||
  Boolean(process.env.DATABASE_URL);

let tableEnsured = false;

export async function saveAgendamento(
  payload: AgendamentoPayload,
): Promise<AgendamentoRecord> {
  const record: AgendamentoRecord = {
    ...payload,
    id: createPublicId(),
    status: "PENDENTE",
    createdAt: new Date().toISOString(),
  };

  if (!hasDatabaseConnection) {
    fallbackStore.unshift(record);
    console.warn(
      "Sem base de dados configurada. O agendamento foi guardado apenas em memória.",
    );
    return record;
  }

  await ensureTable();

  const inserted = await sql<DbRow>`
    INSERT INTO agendamentos (
      id,
      service_type,
      detail,
      municipio,
      bairro,
      endereco,
      preferred_date,
      period,
      nome,
      telefone,
      email,
      observacoes,
      status
    )
    VALUES (
      ${record.id},
      ${payload.serviceType},
      ${payload.detail},
      ${payload.municipio},
      ${payload.bairro},
      ${payload.endereco},
      ${payload.preferredDate},
      ${payload.period},
      ${payload.nome},
      ${payload.telefone},
      ${payload.email ?? null},
      ${payload.observacoes ?? null},
      ${record.status}
    )
    RETURNING *
  `;

  return mapDbRow(inserted.rows[0]);
}

export async function listAgendamentos(): Promise<AgendamentoRecord[]> {
  if (!hasDatabaseConnection) {
    return fallbackStore;
  }
  await ensureTable();
  const result =
    await sql<DbRow>`SELECT * FROM agendamentos ORDER BY created_at DESC`;
  return result.rows.map(mapDbRow);
}

export async function updateAgendamentoStatus(
  id: string,
  status: AgendamentoStatus,
): Promise<AgendamentoRecord | null> {
  if (!hasDatabaseConnection) {
    const agendamento = fallbackStore.find((item) => item.id === id);
    if (!agendamento) return null;
    agendamento.status = status;
    return agendamento;
  }

  await ensureTable();
  const updated = await sql<DbRow>`
    UPDATE agendamentos
    SET status = ${status}
    WHERE id = ${id}
    RETURNING *
  `;
  if (!updated.rows[0]) return null;
  return mapDbRow(updated.rows[0]);
}

function mapDbRow(row: DbRow): AgendamentoRecord {
  return {
    id: row.id,
    serviceType: row.service_type,
    detail: row.detail,
    municipio: row.municipio,
    bairro: row.bairro,
    endereco: row.endereco,
    preferredDate: row.preferred_date,
    period: row.period as AgendamentoRecord["period"],
    nome: row.nome,
    telefone: row.telefone,
    email: row.email || undefined,
    observacoes: row.observacoes || undefined,
    status: row.status,
    createdAt: row.created_at.toISOString(),
  };
}

function createPublicId() {
  const year = new Date().getFullYear();
  const randomSegment = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  return `AG-${year}-${randomSegment}`;
}

async function ensureTable() {
  if (tableEnsured) return;
  await sql`
    CREATE TABLE IF NOT EXISTS agendamentos (
      id TEXT PRIMARY KEY,
      service_type TEXT NOT NULL,
      detail TEXT,
      municipio TEXT NOT NULL,
      bairro TEXT NOT NULL,
      endereco TEXT NOT NULL,
      preferred_date TEXT NOT NULL,
      period TEXT NOT NULL,
      nome TEXT NOT NULL,
      telefone TEXT NOT NULL,
      email TEXT,
      observacoes TEXT,
      status TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  tableEnsured = true;
}
