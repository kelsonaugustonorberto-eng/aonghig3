import crypto from "crypto";
import { sql } from "@vercel/postgres";
import {
  beforeAfterFilters,
  beforeAfterGallery as gallerySeeds,
} from "@/data/content";
import {
  GalleryCategory,
  GalleryInput,
  GalleryRecord,
} from "@/types/gallery";

type GalleryRow = {
  id: string;
  label: string;
  category: GalleryCategory;
  service_type: string | null;
  location: string | null;
  before_url: string;
  after_url: string;
  created_at: Date;
};

const galleryFallback: GalleryRecord[] = [];
const hasDatabaseConnection =
  Boolean(process.env.POSTGRES_URL) ||
  Boolean(process.env.POSTGRES_URL_NON_POOLING) ||
  Boolean(process.env.DATABASE_URL);
let galleryTableEnsured = false;

export function getGalleryFilters() {
  return beforeAfterFilters;
}

export async function listGalleryItems(limit?: number) {
  const seeds = gallerySeeds.map((item) => ({
    id: item.id,
    label: item.label,
    category: item.category as GalleryCategory,
    beforeUrl: item.before,
    afterUrl: item.after,
    serviceType: item.category,
    location: undefined,
    createdAt: new Date().toISOString(),
  }));

  const stored = hasDatabaseConnection
    ? await listFromDatabase(limit)
    : galleryFallback;

  const combined = [...stored, ...seeds];
  if (limit) {
    return combined.slice(0, limit);
  }
  return combined;
}

export async function createGalleryItem(
  payload: GalleryInput,
): Promise<GalleryRecord> {
  const record: GalleryRecord = {
    ...payload,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  if (!hasDatabaseConnection) {
    galleryFallback.unshift(record);
    return record;
  }

  await ensureGalleryTable();
  const inserted = await sql<GalleryRow>`
    INSERT INTO gallery_items (
      id,
      label,
      category,
      service_type,
      location,
      before_url,
      after_url
    ) VALUES (
      ${record.id},
      ${record.label},
      ${record.category},
      ${record.serviceType ?? null},
      ${record.location ?? null},
      ${record.beforeUrl},
      ${record.afterUrl}
    )
    RETURNING *
  `;

  return mapRow(inserted.rows[0]);
}

export async function listManagedGalleryItems(limit?: number) {
  if (!hasDatabaseConnection) {
    return typeof limit === "number"
      ? galleryFallback.slice(0, limit)
      : galleryFallback;
  }
  return listFromDatabase(limit);
}

async function listFromDatabase(limit?: number) {
  await ensureGalleryTable();
  const query = limit
    ? sql<GalleryRow>`SELECT * FROM gallery_items ORDER BY created_at DESC LIMIT ${limit}`
    : sql<GalleryRow>`SELECT * FROM gallery_items ORDER BY created_at DESC`;
  return query.rows.map(mapRow);
}

function mapRow(row: GalleryRow): GalleryRecord {
  return {
    id: row.id,
    label: row.label,
    category: row.category,
    serviceType: row.service_type ?? undefined,
    location: row.location ?? undefined,
    beforeUrl: row.before_url,
    afterUrl: row.after_url,
    createdAt: row.created_at.toISOString(),
  };
}

async function ensureGalleryTable() {
  if (galleryTableEnsured) return;
  await sql`
    CREATE TABLE IF NOT EXISTS gallery_items (
      id TEXT PRIMARY KEY,
      label TEXT NOT NULL,
      category TEXT NOT NULL,
      service_type TEXT,
      location TEXT,
      before_url TEXT NOT NULL,
      after_url TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  galleryTableEnsured = true;
}
