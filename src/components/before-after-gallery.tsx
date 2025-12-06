"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { getGalleryFilters } from "@/lib/gallery";
import { GalleryRecord } from "@/types/gallery";

const filters = getGalleryFilters();

type BeforeAfterGalleryProps = {
  items: GalleryRecord[];
};

export function BeforeAfterGallery({ items }: BeforeAfterGalleryProps) {
  const [filter, setFilter] = useState<string>("todos");

  const filteredItems = useMemo(() => {
    if (filter === "todos") return items;
    return items.filter((item) => item.category === filter);
  }, [filter, items]);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-3">
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setFilter(item)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              filter === item
                ? "border-transparent bg-[var(--ango-green)] text-white"
                : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--foreground)]"
            }`}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </button>
        ))}
      </div>

      {filteredItems.length === 0 ? (
        <p className="rounded-3xl border border-dashed border-[var(--border)] bg-[var(--surface)] p-8 text-center text-[var(--muted)]">
          Ainda não existem imagens para este filtro.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-4"
            >
              <p className="mb-3 text-sm font-medium text-[var(--muted)]">
                {item.label}
              </p>
              <div className="grid grid-cols-2 gap-3">
                {["Antes", "Depois"].map((label, index) => (
                  <div key={label} className="space-y-2">
                    <p className="text-xs uppercase text-[var(--muted)]">
                      {label}
                    </p>
                    <div className="relative h-48 w-full overflow-hidden rounded-2xl bg-[var(--surface-muted)]">
                      <Image
                        src={index === 0 ? item.beforeUrl : item.afterUrl}
                        alt={`${label} ${item.label}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 320px"
                        className="object-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
