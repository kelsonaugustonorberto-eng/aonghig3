export type GalleryCategory = "sofás" | "colchões" | "tapetes" | "viaturas";

export type GalleryInput = {
  label: string;
  category: GalleryCategory;
  serviceType?: string;
  location?: string;
  beforeUrl: string;
  afterUrl: string;
};

export type GalleryRecord = GalleryInput & {
  id: string;
  createdAt: string;
};
