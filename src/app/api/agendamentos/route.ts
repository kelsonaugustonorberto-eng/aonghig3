import { NextResponse } from "next/server";
import { z } from "zod";
import { saveAgendamento } from "@/lib/agendamentos";
import { notifyTelegram } from "@/lib/telegram";
import type { AgendamentoPayload } from "@/types/agendamento";

const AgendamentoSchema = z.object({
  serviceType: z
    .string()
    .trim()
    .min(2, { message: "Seleciona o tipo de serviço." }),
  detail: z
    .string()
    .trim()
    .max(140, { message: "Detalhes muito extensos." })
    .optional(),
  municipio: z
    .string()
    .trim()
    .min(2, { message: "Município é obrigatório." }),
  bairro: z
    .string()
    .trim()
    .min(2, { message: "Indica o bairro." }),
  endereco: z
    .string()
    .trim()
    .min(3, { message: "Endereço completo é obrigatório." }),
  preferredDate: z
    .string()
    .refine(
      (val) => !Number.isNaN(Date.parse(val)),
      "Data inválida",
    ),
  period: z.enum(["Manhã", "Tarde"]),
  nome: z
    .string()
    .trim()
    .min(2, { message: "O nome deve ter pelo menos 2 caracteres." }),
  telefone: z
    .string()
    .trim()
    .min(6, { message: "WhatsApp deve ter pelo menos 6 caracteres." }),
  email: z.string().email({ message: "Email inválido." }).optional(),
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
