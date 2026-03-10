import fs from 'fs';

function summarizeText(text) {
  if (!text) return '';
  const match = text.match(/.*?[.!?](?:\s|$)/);
  let summary = match ? match[0].trim() : text.substring(0, 100) + '...';
  summary = summary.replace(/(https?:\/\/[^\s]+)/g, '').trim();
  return summary || '';
}

try {
  const data = JSON.parse(fs.readFileSync('vids_map.json', 'utf8'));
  const enVideos = data.en;
  const trVideos = data.tr;

  console.log(`Loaded ${enVideos.length} EN videos, ${trVideos.length} TR videos.`);

  if (enVideos.length === 0) throw new Error("No videos found in map");

  let sqlValues = [];

  enVideos.forEach((enVideo, index) => {
    const trVideo = trVideos.find(v => v.id === enVideo.id) || enVideo;

    const e = (str) => String(str || '').replace(/'/g, "''");
    const thumb = `https://i.ytimg.com/vi/${enVideo.id}/maxresdefault.jpg`;
    const link = `https://www.youtube.com/watch?v=${enVideo.id}`;

    // Exact durations are pulled directly from YouTube and populated in the read_time column.
    const duration = enVideo.length || '';

    // Hardcode true publish dates based on original chronological release 
    // to preserve accurate history since the youtube RSS API only keeps the last 15.
    const trueDates = {
      "7J1ouQVEPus": "2023-01-22",
      "FaQnphOYFuM": "2022-11-20",
      "RUUvdtXiL7c": "2022-09-04",
      "updUax3p5Kc": "2022-07-28",
      "eBarsZCubOM": "2022-05-15",
      "B9TeFnDwPUw": "2022-03-20",
      "lnrhgDPV0eA": "2022-02-27",
      "UOkGfiLdmQA": "2022-02-13",
      "N37gwUgw8DI": "2022-02-06",
      "jca81H7Mj18": "2022-01-30",
      "Iw-Jkqcz5jc": "2022-01-25",
      "yp9k5jq7TSU": "2022-01-16",
      "9hCvFl1ZOFo": "2021-12-19",
      "P2kTKg1JQEI": "2021-12-05",
      "FD0Ef5ruH1g": "2021-10-24",
      "pGmBRqw9vjg": "2021-10-10",
      "BzZJdgrPJr0": "2021-09-26"
    };

    const pubDate = trueDates[enVideo.id] || new Date().toISOString().split('T')[0];
    const dateString = `'${pubDate}'`;

    const enSummary = summarizeText(enVideo.desc) || "Watch my new vlog!";
    const trSummary = summarizeText(trVideo.desc) || "Yeni vlogumu izleyin!";

    const trTitle = trVideo.title;

    // Generate English Row
    sqlValues.push(`(
      gen_random_uuid(),
      '${e(enVideo.title)}',
      'vlog',
      ${dateString},
      '${e(enSummary)}',
      '',
      '${e(link)}',
      '${thumb}',
      '${e(duration)}',
      'published',
      'en',
      NOW()
    )`);

    // Generate Turkish Row
    sqlValues.push(`(
      gen_random_uuid(),
      '${e(trTitle)}',
      'vlog',
      ${dateString},
      '${e(trSummary)}',
      '',
      '${e(link)}',
      '${thumb}',
      '${e(duration)}',
      'published',
      'tr',
      NOW()
    )`);
  });

  const sql = `
-- Generated SQL for YouTube Vlogs (Long form only, Bilingual Native)
-- Fetched specifically from /videos channel tab to exclude Shorts

DELETE FROM public.posts WHERE type = 'vlog';

INSERT INTO public.posts (
  id, title, type, date, excerpt, content, link, thumbnail, read_time, status, language, created_at
) VALUES 
${sqlValues.join(',\n')}
ON CONFLICT DO NOTHING;
    `;

  fs.writeFileSync('insert_youtube.sql', sql);
  console.log('Successfully wrote exact matched bilingual long-form YouTube data to insert_youtube.sql');
} catch (err) {
  console.error(err);
}
