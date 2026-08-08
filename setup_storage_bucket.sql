-- ==========================================================
-- SUPABASE STORAGE BUCKET SETUP: blog-images
-- Execute this SQL query in your Supabase Dashboard SQL Editor
-- ==========================================================

-- 1. Create public 'blog-images' bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'blog-images', 
    'blog-images', 
    true, 
    10485760, -- 10MB limit
    ARRAY['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif', 'image/svg+xml']
)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 2. Drop existing policies on storage.objects if re-running
DROP POLICY IF EXISTS "Public read access for blog-images" ON storage.objects;
DROP POLICY IF EXISTS "Allow upload for blog-images" ON storage.objects;
DROP POLICY IF EXISTS "Allow update for blog-images" ON storage.objects;
DROP POLICY IF EXISTS "Allow delete for blog-images" ON storage.objects;

-- 3. Public Read Access: Anyone can view blog cover images
CREATE POLICY "Public read access for blog-images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'blog-images');

-- 4. Upload / Write Access: Allow uploads to blog-images
-- Note: If user login/auth is enabled, change TO public to TO authenticated
CREATE POLICY "Allow upload for blog-images"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'blog-images');

-- 5. Update Access
CREATE POLICY "Allow update for blog-images"
ON storage.objects FOR UPDATE
TO public
USING (bucket_id = 'blog-images');

-- 6. Delete Access
CREATE POLICY "Allow delete for blog-images"
ON storage.objects FOR DELETE
TO public
USING (bucket_id = 'blog-images');
