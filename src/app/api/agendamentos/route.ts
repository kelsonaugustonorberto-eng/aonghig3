import { NextResponse } from "next/server";
import { z } from "zod";
import { saveAgendamento } from "@/lib/agendamentos";
import { notifyTelegram } from "@/lib/telegram";
import type { AgendamentoPayload } from "@/types/agendamento";

const AgendamentoSchema = z.object({
  serviceType: z.string().min(2),
  detail: z.string().max(140).optional(),
  municipio: z.string().min(2),
  bairro: z.string().min(2),
  endereco: z.string().min(3),
  preferredDate: z.string().refine(
    (val) => !Number.isNaN(Date.parse(val)),
    "Data inválida",
  ),
  period: z.enum(["Manhã", "Tarde"]),
  nome: z.string().min(2),
  telefone: z.string().min(6),
  email: z.string().email().optional(),
  observacoes: z.string().max(600).optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = AgendamentoSchema.parse(body);
    const payload: AgendamentoPayload = {
      ...parsed,
      detail: parsed.detail ?? "",
      email: parsed.email ?? undefined,
      observacoes: parsed.observacoes ?? undefined,
    };
    const record = await saveAgendamento(payload);
    await notifyTelegram(record);
    return NextResponse.json({ data: record });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: error.issues[0]?.message || "Dados inválidos." },
        { status: 400 },
      );
    }

    console.error("Erro ao criar agendamento", error);
    return NextResponse.json(
      { message: "Não foi possível criar o agendamento." },
      { status: 500 },
    );
  }
}
