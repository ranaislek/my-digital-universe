-- ==========================================================
-- INSERT TRENDYOL GROUP EXPERIENCES & UPDATE NGN END DATE
-- Run this query in Supabase Dashboard SQL Editor
-- ==========================================================

-- 1. Update NGN role end date
UPDATE experiences 
SET date = 'Oct 2025 – Mar 2026'
WHERE company ILIKE '%NGN%' AND (title ILIKE '%Data%' OR title ILIKE '%Veri%');

UPDATE experiences 
SET date = 'Eki 2025 – Mar 2026'
WHERE company ILIKE '%NGN%' AND (title ILIKE '%Veri%' OR language = 'tr');

-- 2. Insert Trendyol Group (English)
INSERT INTO experiences (
    id, title, category, company, date, excerpt, description, 
    features, tags, tech_stack, status, featured, pinned, language
) VALUES (
    'trendyol-en-2026',
    'CRM Data Analyst, Growth',
    'Work',
    'Trendyol Group',
    'Mar 2026 – Present',
    'Owning segmentation, multi-channel lifecycle campaigns, A/B testing, and growth analytics at Trendyol Group.',
    'CRM Data Analyst, Growth at Trendyol Group (Full-time, İstanbul/Hybrid).

Key Responsibilities:
• Owning segmentation and targeting strategy to enable personalized CRM campaigns at scale.
• Designing and optimizing multi-channel lifecycle campaigns (push, in-app, email, coupons) across onboarding, engagement, and retention.
• Defining KPIs and business rules, aligning CRM performance with growth and revenue objectives.
• Collaborating cross-functionally with Product, CPO, and business teams to enhance user journeys and campaign effectiveness.
• Driving continuous optimization through A/B testing and data-driven experimentation.
• Analyzing large-scale behavioral data (SQL/Python) to identify growth opportunities and inform strategy.
• Automating reporting and campaign tracking to improve operational efficiency and decision-making.',
    ARRAY[
        'Personalized CRM Campaigns at Scale',
        'Multi-channel Lifecycle Marketing (Push, In-App, Email, Coupons)',
        'A/B Testing & Data-driven Experimentation',
        'Large-scale Behavioral Data Analysis (SQL/Python)',
        'Automated Reporting & KPI Tracking'
    ],
    ARRAY['CRM', 'Growth Analytics', 'SQL', 'Python', 'A/B Testing', 'Lifecycle Marketing'],
    ARRAY['SQL', 'Python', 'CRM Tools', 'A/B Testing', 'Growth Analytics'],
    'published',
    true,
    false,
    'en'
) ON CONFLICT (id) DO NOTHING;

-- 3. Insert Trendyol Group (Turkish)
INSERT INTO experiences (
    id, title, category, company, date, excerpt, description, 
    features, tags, tech_stack, status, featured, pinned, language
) VALUES (
    'trendyol-tr-2026',
    'CRM Data Analyst, Growth',
    'Work',
    'Trendyol Group',
    'Mar 2026 – Günümüz',
    'Trendyol Group bünyesinde CRM segmentasyonu, yaşam döngüsü kampanyaları, A/B testleri ve büyüme analitiği süreçlerine liderlik etme.',
    'Trendyol Group''ta CRM Data Analyst, Growth (Tam zamanlı, İstanbul/Hibrit).

Ana Sorumluluklar:
• Ölçeklenebilir kişiselleştirilmiş CRM kampanyaları için segmentasyon ve hedefleme stratejilerine liderlik etmek.
• Katılım (onboarding), etkileşim (engagement) ve elde tutma (retention) aşamalarında çok kanallı (push, in-app, e-posta, kupon) yaşam döngüsü kampanyaları tasarlamak ve optimize etmek.
• KPI''ları ve iş kurallarını tanımlayarak CRM performansını büyüme ve gelir hedefleriyle hizalamak.
• Kullanıcı yolculuklarını ve kampanya etkinliğini artırmak için Ürün, CPO ve iş birimleriyle çapraz fonksiyonlu çalışmak.
• A/B testleri ve veriye dayalı deneylerle sürekli optimizasyon sağlamak.
• Büyüme fırsatlarını belirlemek için büyük ölçekli davranışsal verileri (SQL/Python) analiz etmek.
• Operasyonel verimliliği ve karar alma süreçlerini geliştirmek için raporlama ve kampanya takibini otomatikleştirmek.',
    ARRAY[
        'Ölçeklenebilir Kişiselleştirilmiş CRM Kampanyaları',
        'Çok Kanallı Yaşam Döngüsü Pazarlaması (Push, In-App, E-posta, Kupon)',
        'A/B Testleri & Veriye Dayalı Deneyler',
        'Büyük Ölçekli Davranışsal Veri Analizi (SQL/Python)',
        'Otomatik Raporlama ve KPI Takibi'
    ],
    ARRAY['CRM', 'Growth Analytics', 'SQL', 'Python', 'A/B Testleri', 'Yaşam Döngüsü'],
    ARRAY['SQL', 'Python', 'CRM Araçları', 'A/B Testing', 'Analitik'],
    'published',
    true,
    false,
    'tr'
) ON CONFLICT (id) DO NOTHING;
