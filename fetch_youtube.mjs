import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://gogfugqzrpyxtbmbzcox.supabase.co', 'sb_publishable_36OY-7MGOeKsKPUscrAlhg_j7Nyhlbe'); // Public anon key is safe to use in insert if RLS allows it; if not, we generate SQL

async function fetchYoutubeRSS(channelId) {
    const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
    const response = await fetch(url);
    const text = await response.text();
    return text;
}

// Simple XML extraction
function extractTagList(xml, tagName) {
    const regex = new RegExp(`<${tagName}[^>]*>(.*?)</${tagName}>`, 'gs');
    const matches = [...xml.matchAll(regex)];
    return matches.map(m => m[1] ? m[1].replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1').trim() : '');
}

async function run() {
    // Try to find the channel ID from @ranaislek
    const handleUrl = 'https://www.youtube.com/@ranaislek';
    console.log('Fetching channel page to find ID...');
    const pageRes = await fetch(handleUrl);
    const pageHtml = await pageRes.text();

    const idMatch = pageHtml.match(/<meta itemprop="identifier" content="([^"]+)">/);
    const channelId = idMatch ? idMatch[1] : 'UCUu6XyI0sE81vE1r-_6X7Ew'; // Fallback if not found (need to verify)

    if (!idMatch) {
        console.log('Could not automatically determine channel ID from meta tag. Found:', pageHtml.substring(0, 500));
    }

    console.log(`Found Channel ID: ${channelId}`);
    console.log(`Fetching RSS feed...`);

    const rssXml = await fetchYoutubeRSS(channelId);

    // Parse entries
    const entriesRaw = rssXml.split('<entry>').slice(1);
    const entries = entriesRaw.map(e => ({
        videoId: extractTagList(e, 'yt:videoId')[0],
        title: extractTagList(e, 'title')[0],
        link: extractTagList(e, 'link').find(l => l.includes('v=')) ? extractTagList(e, 'link')[0] : `https://www.youtube.com/watch?v=${extractTagList(e, 'yt:videoId')[0]}`,
        published: extractTagList(e, 'published')[0],
        updated: extractTagList(e, 'updated')[0],
        description: extractTagList(e, 'media:description')[0],
    }));

    console.log(`Found ${entries.length} videos from RSS feed.`);

    // Format for Supabase SQL insert (fallback if RLS blocks api)
    const sqlValues = entries.map(video => {
        // Escape single quotes for SQL
        const e = (str) => String(str).replace(/'/g, "''");

        // Attempt basic duration/readTime parsing from description? No, just keep simple.
        // generate thumbnail URL
        const thumb = `https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`;

        return `(
      gen_random_uuid(),
      '${e(video.title)}',
      'vlog',
      '${e(video.published.split('T')[0])}',
      '${e((video.description || '').substring(0, 150))}...',
      '${e(video.description)}',
      '${e(video.link)}',
      '${thumb}',
      'published',
      'both',
      NOW()
    )`;
    });

    const sql = `
-- Generated SQL for YouTube Vlogs
-- Note: 'duration' or 'read_time' mapped to read_time or similar if exists.

DELETE FROM public.posts WHERE type = 'vlog';

INSERT INTO public.posts (
  id, title, type, date, excerpt, content, link, thumbnail, status, language, created_at
) VALUES 
${sqlValues.join(',\n')}
ON CONFLICT DO NOTHING;
  `;

    fs.writeFileSync('insert_youtube.sql', sql);
    console.log('Successfully wrote YouTube data to insert_youtube.sql');
}

run().catch(console.error);
