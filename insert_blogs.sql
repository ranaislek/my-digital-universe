-- Example Blogs with Explicit read_time overrides

INSERT INTO public.posts (
  id, title, type, date, excerpt, content, thumbnail, read_time, status, language, created_at
) VALUES 
(
  'navigating-tech-interviews-europe',
  'Code & Culture: Navigating Tech Interviews in Europe',
  'blog',
  'February 15, 2026',
  'My comprehensive guide on tackling technical interviews across different European hubs, from Barcelona startups to Amsterdam fintechs.',
  '<h2>The European Tech Landscape</h2><p>Interviewing across borders isn''t just about knowing your algorithms—it''s about cultural fluency...</p><p><i>(Full article content goes here...)</i></p>',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  '8 min read',
  'published',
  'both',
  NOW()
),
(
  'why-i-chose-data-engineering',
  'Why I Transitioned from Full-stack to Data Engineering',
  'blog',
  'January 22, 2026',
  'A personal reflection on my journey deeper into the backend, exploring why building scalable data pipelines became my true passion.',
  '<h2>Finding My Niche</h2><p>I loved building UIs, but there is something fundamentally satisfying about watching a perfectly orchestrated ETL pipeline run without a hitch...</p><p><i>(Full article content goes here...)</i></p>',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  '5 min read',
  'published',
  'both',
  NOW()
),
(
  'stay-tuned-more-coming',
  'Stay Tuned! More Blogs are Coming Soon ✍️',
  'blog',
  'March 10, 2026',
  'I am currently working on documenting a lot of my recent projects, travels, and technical deep-dives. Watch this space!',
  '<div style="text-align: center; padding: 40px; background-color: rgba(0,0,0,0.05); border-radius: 20px;"><h2>More content is brewing! ☕</h2><p>Check back soon for articles covering everything from advanced SQL optimization to my favorite cafes in Istanbul.</p></div>',
  'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  '1 min read',
  'published',
  'both',
  NOW()
)
ON CONFLICT (id) DO UPDATE SET 
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  content = EXCLUDED.content,
  read_time = EXCLUDED.read_time;
