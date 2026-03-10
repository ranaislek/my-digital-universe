DELETE FROM public.experiences;

INSERT INTO public.experiences (id, 
  title, category, company, date, excerpt, description, 
  tech_stack, tags, challenges, features, screenshots, language, status, updated_at
) VALUES 
-- English Entries
(
  gen_random_uuid(), 'Data & Analytics Specialist', 'work', 'NGN', 'Oct 2025 – Present',
  'Leading the design and rollout of the company''s internal data foundation and C-level dashboards.',
  'Leading the design and rollout of the company’s internal data foundation by researching, planning, and implementing end-to-end ERP/CRM-aligned data flows. Managing Salesforce reporting and CRM data governance while building C-level Power BI dashboards for daily operational reporting.',
  ARRAY['Power BI', 'Salesforce', 'Data Pipelines'], ARRAY['Power BI', 'Salesforce', 'Data Pipelines'],
  ARRAY['Addressed data quality, consistency, and traceability.', 'Established a single source of truth across business units and standardized metric definitions.'],
  ARRAY[]::text[], '[]'::jsonb, 'en', 'published', NOW()
),
(
  gen_random_uuid(), 'Product Analyst Intern', 'work', 'Delivery Hero Tech Hub (Yemeksepeti)', 'Jun 2022 – Aug 2022',
  'Supported global teams via analytics projects, building a C-level KPI dashboard on BigQuery & Looker Studio.',
  'Supported global Delivery Hero teams via analytics projects on the Yemeksepeti app. Defined and computed micro-conversion metrics by analyzing user-journey sequences from analytics event and session data using complex SQL. Improved KPI consistency by aligning tracking implementation with stakeholders via Google Analytics and Google Tag Manager. Built automated reporting spanning multiple brands and markets.',
  ARRAY['SQL', 'BigQuery', 'Looker Studio', 'Google Analytics'], ARRAY['SQL', 'BigQuery', 'Looker Studio', 'Google Analytics'],
  ARRAY['Improved KPI consistency by aligning tracking implementation with stakeholders via Google Analytics and Google Tag Manager.', 'Built automated reporting spanning multiple brands and markets.'],
  ARRAY[]::text[], '[]'::jsonb, 'en', 'published', NOW()
),
(
  gen_random_uuid(), 'Advanced Analytics Intern', 'work', 'SabancıDx', 'Jul 2021 – Aug 2021',
  'Developed Python-based ETL workflows for analyzing workspace optimizations.',
  'Worked as an Advanced Analytics Intern. Developed Python-based ETL workflows to analyze workspace usage efficiently. Analyzed large datasets and proposed data-driven seating optimizations for internal use cases.',
  ARRAY['Python', 'ETL Pipeline'], ARRAY['Python', 'ETL Pipeline'],
  ARRAY['Analyzed large datasets and proposed data-driven seating optimizations for internal use cases.'],
  ARRAY[]::text[], '[]'::jsonb, 'en', 'published', NOW()
),
(
  gen_random_uuid(), 'IT Intern', 'work', 'Teknopark Izmir', 'Jun 2021 – Jul 2021',
  'Built an RFID-based access control system using IoT hardware.',
  'Served as an IT Intern. Built practical RFID-based physical access control systems using Arduino and Raspberry Pi hardware. Successfully designed and fully documented the system architecture and setup procedures for internal implementation.',
  ARRAY['Arduino', 'Raspberry Pi', 'RFID'], ARRAY['Arduino', 'Raspberry Pi', 'RFID'],
  ARRAY['Successfully designed and fully documented the system architecture and setup procedures for internal implementation.'],
  ARRAY[]::text[], '[]'::jsonb, 'en', 'published', NOW()
),
(
  gen_random_uuid(), 'Engineering Intern', 'work', 'Nokia', 'Feb 2021',
  'Researched 5G system applications while exploring telecom workflows.',
  'Engineering Intern rotating across various R&D teams within Nokia to understand broad telecom workflows and industry standards. Conducted independent research and presented findings on emerging 5G system applications.',
  ARRAY['Telecom Workflows', '5G Research'], ARRAY['Telecom Workflows', '5G Research'],
  ARRAY['Conducted independent research and presented findings on emerging 5G system applications.'],
  ARRAY[]::text[], '[]'::jsonb, 'en', 'published', NOW()
),
(
  gen_random_uuid(), 'ScholarIA — AI-powered Platform', 'startup', 'UPC, Barcelona', 'Feb 2024 – Dec 2024',
  'Built an AI-powered platform for academic paper management, summarization, and personalized recommendation.',
  'Built an all-in-one research assistant for paper library management (upload, organize, search) and reading workflows, including LLM-driven summarization utilities to streamline literature review. Implemented personalized recommendations and alerts using a semantic-intersection-based approach on paper abstracts. Conducted extensive market research leading to a freemium model. Selected as the #1 project in our master''s cohort.',
  ARRAY['Python', 'LLMs', 'NLP', 'Vercel'], ARRAY['Python', 'LLMs', 'NLP', 'Vercel'],
  ARRAY['Implemented personalized recommendations and alerts using a semantic-intersection-based approach on paper abstracts.', 'Conducted extensive market research leading to a freemium model.', 'Selected as the #1 project in our master''s cohort.'],
  ARRAY[]::text[], '[]'::jsonb, 'en', 'published', NOW()
),
(
  gen_random_uuid(), 'Smart Complaint Tracking System', 'project', 'Tech Istanbul Hackathon', 'Dec 2025',
  'Built an end-to-end real-time data NLP pipeline to process and categorize unstructured citizen complaints.',
  'Designed an end-to-end real-time data pipeline to ingest, process, and categorize unstructured citizen complaints using NLP-based preprocessing and embedding-based similarity, enabling near real-time grouping. Designed real-time dashboards tracking complaint volumes, category distributions, and KPIs. Significantly reduced manual inspection effort and supported data-driven prioritization.',
  ARRAY['Python', 'Pandas', 'NLP', 'PostgreSQL', 'Power BI'], ARRAY['Python', 'Pandas', 'NLP', 'PostgreSQL', 'Power BI'],
  ARRAY['Designed real-time dashboards tracking complaint volumes, category distributions, and KPIs.', 'Significantly reduced manual inspection effort and supported data-driven prioritization.'],
  ARRAY[]::text[], '[]'::jsonb, 'en', 'published', NOW()
),
(
  gen_random_uuid(), 'Constrained Molecular Graph Generation', 'research', 'University of Padua', 'Feb 2024 – Dec 2025',
  'Master''s thesis focusing on a discrete diffusion framework for molecular graphs with structural sampling constraints.',
  'Conducted a research internship addressing state-of-the-art diffusion-based models for molecular generation. Utilized a discrete diffusion framework for molecular graphs and introduced ring-based structural constraints enforced deterministically at sampling time. Verified the mechanism by achieving 100% constraint satisfaction across multiple settings while maintaining strong performance on standard molecular generation metrics (validity, uniqueness, novelty) using a highly reproducible pipeline.',
  ARRAY['Python', 'PyTorch', 'RDKit', 'Hydra'], ARRAY['Python', 'PyTorch', 'RDKit', 'Hydra'],
  ARRAY['Verified the mechanism by achieving 100% constraint satisfaction across multiple settings while maintaining strong performance on standard molecular generation metrics using a highly reproducible pipeline.'],
  ARRAY[]::text[], '[]'::jsonb, 'en', 'published', NOW()
),
(
  gen_random_uuid(), 'Quantum Physics Research Assistant', 'research', 'Sabancı University', 'Mar 2022 – Jun 2022',
  'Conducted research on quantum free fall under the PURE program.',
  'Served as a Quantum Physics Research Assistant assisting Prof. Durmus A. Demir. Conducted research on computational quantum free fall through rigorous experiments and literature review.',
  ARRAY['Physics Modeling', 'Literature Review'], ARRAY['Physics Modeling', 'Literature Review'],
  ARRAY['Conducted research on computational quantum free fall through rigorous experiments and literature review.'],
  ARRAY[]::text[], '[]'::jsonb, 'en', 'published', NOW()
),
(
  gen_random_uuid(), '"Purifas" Biosensor — IT Manager & Project Member', 'extracurricular', 'Enactus Italy', 'Sep 2024 - Dec 2025',
  'Co-developed a biosensor for PFAS detection, winning the ReGeneration Hub Friuli Award.',
  'Served as an IT Manager and Project Member for "Purifas". Co-developed an innovative biosensor designed for PFAS environmental detection. Successfully pitched and won the ReGeneration Hub Friuli Award and the NanoValbruna mentorship.',
  ARRAY['IoT', 'Biosensors', 'Project Management'], ARRAY['IoT', 'Biosensors', 'Project Management'],
  ARRAY['Successfully pitched and won the ReGeneration Hub Friuli Award and the NanoValbruna mentorship.'],
  ARRAY[]::text[], '[]'::jsonb, 'en', 'published', NOW()
),
(
  gen_random_uuid(), 'President', 'extracurricular', 'SU Dance Club', 'Sep 2019 – Jun 2023',
  'Led a student dance community and organized massive campus-wide events.',
  'Served as the President of the Sabancı University Dance Club. Led a growing student dance community. Hosted over 400 attendees at the flagship “SuDance Night” event. Honored with the Non-Academic Creativity Prize in May 2023.',
  ARRAY['Event Management', 'Leadership'], ARRAY['Event Management', 'Leadership'],
  ARRAY['Hosted over 400 attendees at the flagship “SuDance Night” event.', 'Honored with the Non-Academic Creativity Prize in May 2023.'],
  ARRAY[]::text[], '[]'::jsonb, 'en', 'published', NOW()
),
(
  gen_random_uuid(), 'President', 'extracurricular', 'Computer Society of IEEE', 'Sep 2020 – Feb 2021',
  'Organized computer science panels and tech industry talks.',
  'Served as the President of the IEEE Computer Society at Sabancı University. Organized computer science talks and networking panels with industry experts, successfully coordinating event operations and speaker management.',
  ARRAY['Tech Volunteering', 'Networking'], ARRAY['Tech Volunteering', 'Networking'],
  ARRAY['Organized computer science talks and networking panels with industry experts, successfully coordinating event operations and speaker management.'],
  ARRAY[]::text[], '[]'::jsonb, 'en', 'published', NOW()
),
(
  gen_random_uuid(), 'Content Creator', 'extracurricular', 'YouTube', '2019 – Present',
  'Creating educational content focused on studying abroad and master''s experiences.',
  'Active YouTube content creator focused on Erasmus+ and global master''s journeys. Filmed, edited, and produced vlogs and talks documenting studying abroad via Erasmus and Erasmus Mundus programs to guide future students.',
  ARRAY['Video Editing', 'Content Creation'], ARRAY['Video Editing', 'Content Creation'],
  ARRAY['Filmed, edited, and produced vlogs and talks documenting studying abroad via Erasmus and Erasmus Mundus programs to guide future students.'],
  ARRAY[]::text[], '[]'::jsonb, 'en', 'published', NOW()
),

-- Turkish Entries
(
  gen_random_uuid(), 'Veri ve Analitik Uzmanı', 'work', 'NGN', 'Eki 2025 – Günümüz',
  'Şirketin kurum içi veri altyapısının ve C-Level raporlama panellerinin tasarımı ve kurulumuna liderlik ediyorum.',
  'ERP/CRM uyumlu veri akışlarını uçtan uca araştırıp, planlayarak ve hayata geçirerek şirketin kurum içi veri altyapısının tasarımını ve yaygınlaştırılmasını yönetiyorum. Salesforce raporlamalarını ve CRM veri yönetimini sağlarken günlük operasyonlar için üst düzey (C-level) Power BI panoları inşa ediyorum. Veri kalitesi, tutarlılığı ve izlenebilirliği konularına odaklandım. İş birimleri genelinde "tek doğru kaynak" mimarisi oluşturarak metrik tanımlarını standartlaştırdım.',
  ARRAY['Power BI', 'Salesforce', 'Veri Akışları'], ARRAY['Power BI', 'Salesforce', 'Veri Akışları'],
  ARRAY['Veri kalitesi, tutarlılığı ve izlenebilirliği konularına odaklandım.', 'İş birimleri genelinde "tek doğru kaynak" mimarisi oluşturarak metrik tanımlarını standartlaştırdım.'],
  ARRAY[]::text[], '[]'::jsonb, 'tr', 'published', NOW()
),
(
  gen_random_uuid(), 'Ürün Analitiği Stajyeri', 'work', 'Delivery Hero Tech Hub (Yemeksepeti)', 'Haz 2022 – Ağu 2022',
  'Yemeksepeti uygulamasında analitik projelerle global ekipleri destekledim; BigQuery & Looker Studio''da raporlama panoları kurdum.',
  'Yemeksepeti uygulamasındaki analitik projeler aracılığıyla global Delivery Hero ekiplerine destek verdim. Analitik etkinlik ve oturum verilerinden elde edilen kullanıcı yolculuğu (user-journey) sekanslarını karmaşık SQL sorgularıyla analiz ederek mikro dönüşüm (micro-conversion) metriklerini tanımladım ve hesapladım. Google Analytics ve Google Tag Manager üzerinden takip uygulamalarını (tracking) paydaşlarla uyumlu hale getirerek KPI tutarlılığını artırdım. Birden fazla markayı ve pazarı kapsayan otomatik raporlamalar inşa ettim.',
  ARRAY['SQL', 'BigQuery', 'Looker Studio', 'Google Analytics'], ARRAY['SQL', 'BigQuery', 'Looker Studio', 'Google Analytics'],
  ARRAY['Google Analytics ve Google Tag Manager üzerinden takip uygulamalarını (tracking) paydaşlarla uyumlu hale getirerek KPI tutarlılığını artırdım.', 'Birden fazla markayı ve pazarı kapsayan otomatik raporlamalar inşa ettim.'],
  ARRAY[]::text[], '[]'::jsonb, 'tr', 'published', NOW()
),
(
  gen_random_uuid(), 'İleri Analitik Stajyeri', 'work', 'SabancıDx', 'Tem 2021 – Ağu 2021',
  'Çalışma alanı optimizasyonlarını analiz etmek için Python tabanlı ETL iş akışları (workflows) geliştirdim.',
  'İleri Analitik (Advanced Analytics) stajyeri olarak görev aldım. Çalışma alanı kullanımını verimli bir şekilde analiz etmek için Python tabanlı ETL veri akışları geliştirdim. Büyük veri setlerini inceleyerek şirket içi oturma ve alan kullanım düzeni için veriye dayalı optimizasyon önerileri sundum.',
  ARRAY['Python', 'ETL Veri Akışı'], ARRAY['Python', 'ETL Veri Akışı'],
  ARRAY['Büyük veri setlerini inceleyerek şirket içi oturma ve alan kullanım düzeni için veriye dayalı optimizasyon önerileri sundum.'],
  ARRAY[]::text[], '[]'::jsonb, 'tr', 'published', NOW()
),
(
  gen_random_uuid(), 'BT Stajyeri', 'work', 'Teknopark Izmir', 'Haz 2021 – Tem 2021',
  'Nesnelerin İnterneti (IoT) donanımları kullanarak RFID tabanlı geçiş kontrol sistemi kurdum.',
  'BT Stajyeri olarak görev yaptım. Arduino ve Raspberry Pi donanımlarını kullanarak RFID tabanlı fiziksel erişim (geçiş) kontrol sistemleri geliştirdim. Sistem mimarisini ve kurum içi kurulum gereksinimlerini başarılı bir şekilde belgeleyerek kullanıma hazır hale getirdim.',
  ARRAY['Arduino', 'Raspberry Pi', 'RFID'], ARRAY['Arduino', 'Raspberry Pi', 'RFID'],
  ARRAY['Sistem mimarisini ve kurum içi kurulum gereksinimlerini başarılı bir şekilde belgeleyerek kullanıma hazır hale getirdim.'],
  ARRAY[]::text[], '[]'::jsonb, 'tr', 'published', NOW()
),
(
  gen_random_uuid(), 'Mühendislik Stajyeri', 'work', 'Nokia', 'Şub 2021',
  'Telekomünikasyon iş akışlarını incelerken 5G sistem uygulamaları üzerine araştırmalar yaptım.',
  'Mühendislik Stajyeri olarak Nokia içerisinde çeşitli Ar-Ge (R&D) ekiplerinde görev alarak telekom iş akışlarını ve sektörel standartları öğrendim. Yeni nesil 5G sistem uygulamaları hakkında bağımsız araştırmalar yürütüp sunumlar gerçekleştirdim.',
  ARRAY['Telekom İş Akışları', '5G Araştırması'], ARRAY['Telekom İş Akışları', '5G Araştırması'],
  ARRAY['Yeni nesil 5G sistem uygulamaları hakkında bağımsız araştırmalar yürütüp sunumlar gerçekleştirdim.'],
  ARRAY[]::text[], '[]'::jsonb, 'tr', 'published', NOW()
),
(
  gen_random_uuid(), 'ScholarIA — Yapay Zeka Destekli Platform', 'startup', 'UPC, Barcelona', 'Şub 2024 – Ara 2024',
  'Akademik makale yönetimi, özetleme ve kişiselleştirilmiş öneriler sunan yapay zeka destekli platform geliştirdim.',
  'Makale kütüphanesi yönetimi (yükleme, düzenleme, arama) ve okuma iş akışları (hızlı notlar) için hepsi bir arada bir araştırma asistanı geliştirdim. Literatür taramasını hızlandırmak amacıyla YZE (LLM) destekli özetleme araçları entegre ettim. Makale özetleri üzerinde anlamsal (semantic) benzerlik yaklaşımı kullanarak kişiselleştirilmiş öneriler ve uyarılar sundum. Kapsamlı pazar araştırması ile freemium fiyatlandırma modeli oluşturup yüksek lisans grubumuzda 1. seçildim.',
  ARRAY['Python', 'LLM', 'NLP', 'Vercel'], ARRAY['Python', 'LLM', 'NLP', 'Vercel'],
  ARRAY['Makale özetleri üzerinde anlamsal (semantic) benzerlik yaklaşımı kullanarak kişiselleştirilmiş öneriler ve uyarılar sundum.', 'Kapsamlı pazar araştırması ile freemium fiyatlandırma modeli oluşturup yüksek lisans grubumuzda 1. seçildim.'],
  ARRAY[]::text[], '[]'::jsonb, 'tr', 'published', NOW()
),
(
  gen_random_uuid(), 'Akıllı Şikayet Takip Sistemi', 'project', 'Tech Istanbul Hackathon', 'Ara 2025',
  'Yapılandırılmamış vatandaş şikayetlerini işleyen ve kategorize eden uçtan uca gerçek zamanlı NLP veri boru hattı (pipeline) kurdum.',
  'Yapılandırılmamış vatandaş şikayetlerini içe aktarmak, işlemek ve kategorize etmek için uçtan uca bir gerçek zamanlı veri mimarisi tasarladım. Doğal Dil İşleme (NLP) ön işlemleri ve gömme (embedding) tabanlı benzerlik algoritmaları kullanarak gerçek zamanlı gruplandırmalar sağladım. Şikayet hacimlerini, kategori dağılımlarını ve operasyonel KPI''ları takip eden gerçek zamanlı veri panoları tasarladım. Manuel inceleme çabasını büyük ölçüde azaltarak veriye dayalı önceliklendirmeyi destekledim.',
  ARRAY['Python', 'Pandas', 'NLP', 'PostgreSQL', 'Power BI'], ARRAY['Python', 'Pandas', 'NLP', 'PostgreSQL', 'Power BI'],
  ARRAY['Şikayet hacimlerini, kategori dağılımlarını ve operasyonel KPI''ları takip eden gerçek zamanlı veri panoları tasarladım.', 'Manuel inceleme çabasını büyük ölçüde azaltarak veriye dayalı önceliklendirmeyi destekledim.'],
  ARRAY[]::text[], '[]'::jsonb, 'tr', 'published', NOW()
),
(
  gen_random_uuid(), 'Kısıtlı Moleküler Grafik Üretimi', 'research', 'University of Padua', 'Şub 2024 – Ara 2025',
  'Yapısal örnekleme kısıtlamalarına sahip moleküler grafikler için ayrık (discrete) difüzyon çerçevesine odaklanan yüksek lisans tezi.',
  'Moleküler üretimde son teknoloji difüzyon tabanlı modeller üzerine araştırma stajı yürüttüm. Moleküler grafikler için ayrık (discrete) difüzyon çatısı kullanarak, örnekleme anında deterministik olarak uygulanan halka tabanlı (ring-based) yapısal kısıtlamalar tanıttım. Standart moleküler üretim metriklerinde (geçerlilik, benzersizlik, yenilik) yüksek performansı korurken, birden fazla kısıtlama ayarında %100 başarı oranına ulaşarak mekanizmayı doğruladım. Tamamen tekrarlanabilir (reproducible) bir deney ortamı tasarladım.',
  ARRAY['Python', 'PyTorch', 'RDKit', 'Hydra'], ARRAY['Python', 'PyTorch', 'RDKit', 'Hydra'],
  ARRAY['Standart moleküler üretim metriklerinde yüksek performansı korurken, birden fazla kısıtlama ayarında %100 başarı oranına ulaşarak mekanizmayı doğruladım.', 'Tamamen tekrarlanabilir (reproducible) bir deney ortamı tasarladım.'],
  ARRAY[]::text[], '[]'::jsonb, 'tr', 'published', NOW()
),
(
  gen_random_uuid(), 'Kuantum Fiziği Araştırma Asistanı', 'research', 'Sabancı University', 'Mar 2022 – Haz 2022',
  'PURE programı kapsamında kuantum serbest düşüş üzerine araştırmalar yürüttüm.',
  'Prof. Durmuş A. Demir''in asistanı olarak Kuantum Fiziği Araştırma Asistanlığı yaptım. Deneyler ve akademik literatür taraması eşliğinde hesaplamalı kuantum serbest düşüş dinamikleri üzerine araştırmalar gerçekleştirdim.',
  ARRAY['Fizik Modelleme', 'Literatür Taraması'], ARRAY['Fizik Modelleme', 'Literatür Taraması'],
  ARRAY['Deneyler ve akademik literatür taraması eşliğinde hesaplamalı kuantum serbest düşüş dinamikleri üzerine araştırmalar gerçekleştirdim.'],
  ARRAY[]::text[], '[]'::jsonb, 'tr', 'published', NOW()
),
(
  gen_random_uuid(), 'Purifas Biyosensörü — Proje Üyesi & BT Yöneticisi', 'extracurricular', 'Enactus Italy', 'Eyl 2024 - Ara 2025',
  'PFAS tespiti için bir biyosensör geliştirilmesine katkı sağladım; ReGeneration Hub Friuli Ödülü''nü kazandık.',
  '"Purifas" projesinde BT Yöneticisi ve Proje Üyesi olarak görev aldım. Çevresel PFAS tespiti için tasarlanmış yenilikçi bir biyosensörün ortak geliştiriciliğini yaptım. Projemizle ReGeneration Hub Friuli Ödülü''nü ve değerli NanoValbruna mentorluğunu kazandık.',
  ARRAY['IoT', 'Biyosensörler', 'Proje Yönetimi'], ARRAY['IoT', 'Biyosensörler', 'Proje Yönetimi'],
  ARRAY['Projemizle ReGeneration Hub Friuli Ödülü''nü ve değerli NanoValbruna mentorluğunu kazandık.'],
  ARRAY[]::text[], '[]'::jsonb, 'tr', 'published', NOW()
),
(
  gen_random_uuid(), 'Başkan', 'extracurricular', 'SU Dans Kulübü', 'Eyl 2019 – Haz 2023',
  'Üniversite dans topluluğuna liderlik ettim ve kampüs çapında devasa organizasyonlar düzenledim.',
  'Sabancı Üniversitesi Dans Kulübü (SUDance) Başkanı olarak görev yaptım. Büyüyen bir öğrenci dans topluluğuna liderlik ettim. Yüzlerce kişinin katıldığı amiral gemisi etkinliğimiz “SuDance Night” organizasyonunu yürüttüm. Mayıs 2023''te "Akademik Olmayan Yaratıcılık Ödülü"ne (Non-Academic Creativity Prize) layık görüldüm.',
  ARRAY['Etkinlik Yönetimi', 'Liderlik'], ARRAY['Etkinlik Yönetimi', 'Liderlik'],
  ARRAY['Yüzlerce kişinin katıldığı amiral gemisi etkinliğimiz “SuDance Night” organizasyonunu yürüttüm.', 'Mayıs 2023''te "Akademik Olmayan Yaratıcılık Ödülü"ne layık görüldüm.'],
  ARRAY[]::text[], '[]'::jsonb, 'tr', 'published', NOW()
),
(
  gen_random_uuid(), 'Başkan', 'extracurricular', 'IEEE Computer Society', 'Eyl 2020 – Şub 2021',
  'Bilgisayar bilimleri panelleri ve teknoloji sektörüne dair seminerler organize ettim.',
  'Sabancı Üniversitesi IEEE Computer Society''nin Başkanı olarak görev yaptım. Sektör uzmanlarının katıldığı bilgisayar bilimleri seminerleri ve networking panelleri düzenledim; etkinlik operasyonlarını ve konuşmacı iletişimlerini koordine ettim.',
  ARRAY['Gönüllülük', 'İletişim Ağı'], ARRAY['Gönüllülük', 'İletişim Ağı'],
  ARRAY['Sektör uzmanlarının katıldığı bilgisayar bilimleri seminerleri ve networking panelleri düzenledim; etkinlik operasyonlarını ve konuşmacı iletişimlerini koordine ettim.'],
  ARRAY[]::text[], '[]'::jsonb, 'tr', 'published', NOW()
),
(
  gen_random_uuid(), 'İçerik Üreticisi', 'extracurricular', 'YouTube', '2019 – Günümüz',
  'Yurtdışında eğitim ve yüksek lisans deneyimlerine odaklanan eğitici içerikler üretiyorum.',
  'Erasmus+ ve küresel yüksek lisans yolculuklarına odaklanan aktif bir YouTube içerik üreticisiyim. Gelecek nesil öğrencilere rehberlik etmek amacıyla Erasmus ve Erasmus Mundus programlarıyla yurtdışında eğitim deneyimlerimi belgeleyen vlog''lar ve konuşmalar çekip, kurgulayıp yayınladım.',
  ARRAY['Video Kurgu', 'İçerik Üretimi'], ARRAY['Video Kurgu', 'İçerik Üretimi'],
  ARRAY['Gelecek nesil öğrencilere rehberlik etmek amacıyla Erasmus programlarıyla yurtdışında eğitim deneyimlerimi belgeleyen vlog''lar çekip yayınladım.'],
  ARRAY[]::text[], '[]'::jsonb, 'tr', 'published', NOW()
);
