import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { BeforeAfterGallery } from "@/components/before-after-gallery";
import { listGalleryItems } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Antes & Depois",
  description:
    "Veja resultados reais da higienização de sofás, colchões, tapetes e viaturas.",
};

export default async function BeforeAfterPage() {
  const items = await listGalleryItems();
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
      <PageIntro
        eyebrow="Antes & Depois"
        title="A prova está nos resultados."
        description="Cada limpeza é uma transformação. Escolhe o filtro para ver exemplos específicos de sofás, colchões, tapetes e interiores de viatura."
      />
      <BeforeAfterGallery items={items} />
    </div>
  );
}
