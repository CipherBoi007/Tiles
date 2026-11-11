import { createClient, SupabaseClient } from '@supabase/supabase-js';
import fs from 'fs/promises';
import dotenv from 'dotenv';

dotenv.config();

const BUCKET = process.env.SUPABASE_STORAGE_BUCKET || 'catalogues';

let client: SupabaseClient | null = null;

// Created lazily so the server (and tests) can start without storage credentials.
const getClient = (): SupabaseClient => {
  if (!client) {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) {
      throw new Error('Supabase Storage is not configured (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY missing)');
    }
    client = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  }
  return client;
};

const sanitizeFilename = (name: string) => name.replace(/[^a-zA-Z0-9.-]/g, '_');

/** Uploads a PDF from local disk to the catalogues bucket and returns its public URL. */
export const uploadCataloguePdf = async (localPath: string, originalName: string): Promise<string> => {
  const storage = getClient().storage.from(BUCKET);
  const objectPath = `${Date.now()}-${sanitizeFilename(originalName)}`;
  const body = await fs.readFile(localPath);

  const { error } = await storage.upload(objectPath, body, {
    contentType: 'application/pdf',
    cacheControl: '31536000',
    upsert: false,
  });
  if (error) throw error;

  return storage.getPublicUrl(objectPath).data.publicUrl;
};

/**
 * Removes a catalogue PDF from the bucket if the URL points to it.
 * URLs for PDFs bundled with the frontend (e.g. "/catalogues/x.pdf") are ignored.
 */
export const deleteCataloguePdf = async (fileUrl: string): Promise<void> => {
  const marker = `/storage/v1/object/public/${BUCKET}/`;
  const index = fileUrl.indexOf(marker);
  if (index === -1) return;

  const objectPath = decodeURIComponent(fileUrl.slice(index + marker.length));
  const { error } = await getClient().storage.from(BUCKET).remove([objectPath]);
  if (error) throw error;
};
