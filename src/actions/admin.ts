"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createGalleryItem } from "@/lib/gallery";
import { updateAgendamentoStatus } from "@/lib/agendamentos";
import { AgendamentoStatus } from "@/types/agendamento";
import { GalleryCategory } from "@/types/gallery";
import { saveUpload } from "@/lib/uploads";

type ActionState = {
  error?: string;
  success?: boolean;
};

const ADMIN_COOKIE = "admin_session";

export async function adminLoginAction(
  _state: ActionState | undefined,
  formData: FormData,
): Promise<ActionState> {
  const providedKey = formData.get("accessKey")?.toString() ?? "";
  const expectedKey = process.env.ADMIN_ACCESS_KEY;

  if (!expectedKey) {
    return { error: "Define a variável ADMIN_ACCESS_KEY no .env" };
  }

  if (providedKey !== expectedKey) {
    return { error: "Chave inválida. Tenta novamente." };
  }

  cookies().set(ADMIN_COOKIE, expectedKey, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  redirect("/admin");
}

export async function adminLogoutAction() {
  cookies().delete(ADMIN_COOKIE);
  redirect("/admin");
}

export async function updateAgendamentoStatusAction(
  _state: ActionState | undefined,
  formData: FormData,
): Promise<ActionState> {
  const id = formData.get("id")?.toString();
  const status = formData.get("status")?.toString() as AgendamentoStatus | undefined;

  if (!id || !status) {
    return { error: "Seleciona o estado" };
  }

  const updated = await updateAgendamentoStatus(id, status);
  if (!updated) {
    return { error: "Agendamento não encontrado." };
  }

  revalidatePath("/admin");
  revalidatePath("/");
  return { success: true };
}

export async function uploadGalleryAction(
  _state: ActionState | undefined,
  formData: FormData,
): Promise<ActionState> {
  const label = formData.get("label")?.toString();
  const category = formData.get("category")?.toString();
  const serviceType = formData.get("serviceType")?.toString() || undefined;
  const location = formData.get("location")?.toString() || undefined;
  const beforeFile = formData.get("before") as File | null;
  const afterFile = formData.get("after") as File | null;

  if (!label || !category || !beforeFile || !afterFile) {
    return { error: "Preenche todos os campos obrigatórios." };
  }

  if (beforeFile.size === 0 || afterFile.size === 0) {
    return { error: "Seleciona ficheiros válidos para antes e depois." };
  }

  try {
    const [beforeUrl, afterUrl] = await Promise.all([
      saveUpload(beforeFile, "antes"),
      saveUpload(afterFile, "depois"),
    ]);

    await createGalleryItem({
      label,
      category: category as GalleryCategory,
      serviceType,
      location,
      beforeUrl,
      afterUrl,
    });

    revalidatePath("/antes-depois");
    revalidatePath("/");
    revalidatePath("/admin/galeria");
    return { success: true };
  } catch (error) {
    console.error("Erro ao guardar as fotos", error);
    return {
      error:
        "Não foi possível guardar as imagens. Garante que o diretório de uploads tem permissão de escrita.",
    };
  }
}
