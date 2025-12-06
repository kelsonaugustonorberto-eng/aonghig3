import Image from "next/image";
import { Metadata } from "next";
import { GalleryUploadForm } from "@/components/gallery-upload-form";
import { listManagedGalleryItems } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Admin | Galeria",
};

export default async function AdminGalleryPage() {
  const items = await listManagedGalleryItems(20);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-[var(--foreground)]">
          Galeria Antes & Depois
        </h2>
        <p className="text-sm text-[var(--muted)]">
          Carrega as novas fotos para alimentar a prova social do site.
        </p>
      </div>
      <GalleryUploadForm />
      <div>
        <h3 className="text-lg font-semibold">Últimos envios</h3>
        {items.length === 0 ? (
          <p className="mt-4 rounded-3xl border border-dashed border-[var(--border)] bg-[var(--surface-muted)] p-6 text-sm text-[var(--muted)]">
            Ainda não existem fotos guardadas na base de dados. Os exemplos da
            home continuam visíveis graças às imagens padrão.
          </p>
        ) : (
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-4"
              >
                <p className="text-sm font-semibold">{item.label}</p>
                {item.location ? (
                  <p className="text-xs text-[var(--muted)]">
                    {item.location}
                  </p>
                ) : null}
                <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-[var(--muted)]">
                  <div>
                    <p className="uppercase">Antes</p>
                    <div className="relative mt-2 h-32 w-full overflow-hidden rounded-2xl">
                      <Image
                        src={item.beforeUrl}
                        alt={`Antes - ${item.label}`}
                        fill
                        sizes="(max-width:768px) 100vw, 200px"
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="uppercase">Depois</p>
                    <div className="relative mt-2 h-32 w-full overflow-hidden rounded-2xl">
                      <Image
                        src={item.afterUrl}
                        alt={`Depois - ${item.label}`}
                        fill
                        sizes="(max-width:768px) 100vw, 200px"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
