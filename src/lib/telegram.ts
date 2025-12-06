import { AgendamentoRecord } from "@/types/agendamento";

export async function notifyTelegram(record: AgendamentoRecord) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn("Telegram não configurado. Mensagem não enviada.");
    return;
  }

  const message = buildTelegramMessage(record);
  const endpoint = `https://api.telegram.org/bot${token}/sendMessage`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: "HTML",
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Erro ao enviar mensagem para o Telegram:", errorText);
  }
}

function buildTelegramMessage(record: AgendamentoRecord) {
  const date = formatDate(record.preferredDate);
  return [
    "🧼 <b>NOVO AGENDAMENTO — ANGO HIGIENE</b>",
    "",
    `<b>Serviço:</b> ${record.serviceType} ${record.detail || ""}`.trim(),
    `<b>Data preferida:</b> ${date} (${record.period})`,
    `<b>Cliente:</b> ${record.nome}`,
    `<b>WhatsApp:</b> ${record.telefone}`,
    record.email ? `<b>Email:</b> ${record.email}` : null,
    "",
    `<b>Local:</b> ${record.municipio}, ${record.bairro}`,
    `<b>Endereço:</b> ${record.endereco}`,
    record.observacoes ? `<b>Observações:</b> ${record.observacoes}` : null,
    "",
    `<b>ID:</b> ${record.id}`,
    `<b>Estado:</b> ${record.status}`,
  ]
    .filter(Boolean)
    .join("\n");
}

function formatDate(value: string) {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return new Intl.DateTimeFormat("pt-PT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(parsed);
}
