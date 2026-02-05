import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.warn('Supabase credentials not configured - file uploads will fail');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

const BUCKET_NAME = 'desensitization-images';

export async function uploadImage(
  file: Buffer,
  filename: string,
  contentType: string
): Promise<string> {
  // Generate unique filename
  const uniqueFilename = `${Date.now()}-${filename}`;

  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(uniqueFilename, file, {
      contentType,
      upsert: false,
    });

  if (error) {
    throw new Error(`Failed to upload image: ${error.message}`);
  }

  // Get public URL
  const { data } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(uniqueFilename);

  return data.publicUrl;
}

export async function deleteImage(imageUrl: string): Promise<void> {
  // Extract filename from URL
  const urlParts = imageUrl.split('/');
  const filename = urlParts[urlParts.length - 1];

  if (!filename) return;

  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .remove([filename]);

  if (error) {
    console.error(`Failed to delete image: ${error.message}`);
  }
}
