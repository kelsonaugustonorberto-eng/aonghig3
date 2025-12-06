"use client";

import { useFormState, useFormStatus } from "react-dom";
import { uploadGalleryAction } from "@/actions/admin";
import { getGalleryFilters } from "@/lib/gallery";

const initialState = { error: undefined as string | undefined, success: false };
const categories = getGalleryFilters().filter((filter) => filter !== "todos");

export function GalleryUploadForm() {
  const [state, formAction] = useFormState(uploadGalleryAction, initialState);

  return (
    <form
      action={formAction}
      className="space-y-4 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6"
    >
      <div>
        <p className="text-lg font-semibold">Adicionar fotos</p>
        <p className="text-sm text-[var(--muted)]">
          Preenche detalhes e faz upload do antes e depois.
        </p>
      </div>
      <label className="text-sm font-medium">
        Legenda
        <input
          type="text"
          name="label"
          required
          className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3"
          placeholder="Ex.: Sofá de 3 lugares – Talatona"
        />
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm font-medium">
          Categoria
          <select
            name="category"
            required
            className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium">
          Serviço / item
          <input
            type="text"
            name="serviceType"
            className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3"
            placeholder="Opcional"
          />
        </label>
      </div>
      <label className="text-sm font-medium">
        Localização
        <input
          type="text"
          name="location"
          className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3"
          placeholder="Opcional"
        />
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm font-medium">
          Foto antes
          <input
            type="file"
            name="before"
            accept="image/*"
            required
            className="mt-2 block w-full text-sm text-[var(--muted)] file:mr-4 file:rounded-full file:border-0 file:bg-[var(--ango-green)] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
          />
        </label>
        <label className="text-sm font-medium">
          Foto depois
          <input
            type="file"
            name="after"
            accept="image/*"
            required
            className="mt-2 block w-full text-sm text-[var(--muted)] file:mr-4 file:rounded-full file:border-0 file:bg-[var(--ango-green)] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
          />
        </label>
      </div>
      {state?.error ? (
        <p className="text-sm text-red-600" role="alert">
          {state.error}
        </p>
      ) : null}
      {state?.success ? (
        <p className="text-sm text-[var(--ango-green)]">
          Fotos guardadas com sucesso.
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
      className="w-full rounded-full bg-[var(--ango-green)] px-6 py-3 text-sm font-semibold text-white disabled:opacity-60"
      disabled={pending}
    >
      {pending ? "A carregar fotos..." : "Guardar na galeria"}
    </button>
  );
}
