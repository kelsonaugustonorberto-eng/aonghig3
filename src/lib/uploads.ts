"use server";

import { mkdir, writeFile } from "fs/promises";
import path from "path";
import crypto from "crypto";

const defaultUploadDir = path.join(process.cwd(), "public/uploads");

function getUploadDir() {
  return process.env.UPLOAD_DIR || defaultUploadDir;
}

export async function saveUpload(file: File, prefix: string) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const ext = getExtension(file.name);
  const uploadDir = getUploadDir();
  await mkdir(uploadDir, { recursive: true });
  const filename = `${prefix}-${Date.now()}-${crypto.randomUUID()}${ext}`;
  const filepath = path.join(uploadDir, filename);
  await writeFile(filepath, buffer);
  const publicBase = process.env.UPLOAD_PUBLIC_BASE ?? "/uploads";
  return `${publicBase}/${filename}`;
}

function getExtension(name: string) {
  const ext = path.extname(name);
  if (ext) return ext.toLowerCase();
  return ".jpg";
}
