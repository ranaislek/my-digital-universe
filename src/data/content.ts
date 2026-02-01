
export interface ContentItem {
    id: string;
    type: "vlog" | "blog" | "project";
    title: string;
    excerpt: string;
    date: string;
    duration?: string;
    readTime?: string;
    read_time?: string; // from DB
    location?: string;
    link?: string; // External link for vlogs (YouTube)
    thumbnail?: string;
    content?: string; // HTML content for blogs
    status?: "draft" | "published";
    featured?: boolean;
    pinned?: boolean;
    // Project specific fields
    company?: string;
    category?: string;
    description?: string; // Short description (maps to excerpt)
    tags?: string[];
    techStack?: string[];
    challenges?: string[];
    features?: string[];
    screenshots?: (string | { url: string; caption: string })[]; // Array of image URLs or objects
    icon?: string; // Icon name string
    projectLinks?: {
        demo?: string;
        repo?: string;
    };
}

export const content: ContentItem[] = [
    {
        id: "erasmus-mundus-master",
        type: "vlog",
        title: "Gezerek Yüksek Lisans Yapmak | Yurtdışında BURSLU Master | Erasmus Mundus Joint Master Program 🎓",
        excerpt: "Erasmus Mundus programı ile nasıl dünyayı gezerek burslu yüksek lisans yaptığımı anlatıyorum.",
        date: "2024",
        duration: "18:24",
        link: "https://youtu.be/FaQnphOYFuM",
        thumbnail: "https://i.ytimg.com/vi/FaQnphOYFuM/maxresdefault.jpg",
    },

    {
        id: "padova-erasmus-life",
        type: "vlog",
        title: "A Day in My Erasmus Life — Padova Edition",
        excerpt: "Coffee runs, research meetings, and exploring Italian streets after sunset...",
        date: "Jan 2025",
        duration: "12 min",
        location: "Italy 🇮🇹",
        link: "#",
    },
    {
        id: "budapest-first-week",
        type: "vlog",
        title: "budapeşte'de ilk haftam ~ erasmus #1",
        excerpt: "Budapeşte'deki Erasmus maceramın başlangıcı, şehri keşfedişimiz ve ilk izlenimlerim.",
        date: "2023",
        duration: "13:42",
        link: "https://youtu.be/P2kTKg1JQEI",
        thumbnail: "https://i.ytimg.com/vi/P2kTKg1JQEI/maxresdefault.jpg",
        featured: true,
    },
    {
        id: "data-analyst-vs-scientist",
        type: "blog",
        title: "Data Analyst vs Data Scientist",
        excerpt: "Breaking down the differences and which path might be right for you...",
        date: "Dec 2024",
        readTime: "5 min read",
        content: `
      <p>Data science and data analysis are two of the hottest career paths in tech right now, but they are often confused. While they overlap, they require different skill sets and focus on different parts of the data value chain.</p>
      
      <h3>The Core Difference</h3>
      <p>A <strong>Data Analyst</strong> focuses on answering questions about what has happened in the past. They use data to find trends, create visualizations, and help businesses make informed decisions based on historical data.</p>
      
      <p>A <strong>Data Scientist</strong>, on the other hand, often focuses on predicting the future. They build machine learning models, design algorithms, and handle larger, more unstructured datasets to create predictive insights.</p>
      
      <h3>Tools of the Trade</h3>
      <ul>
        <li><strong>Analysts:</strong> SQL, Excel, Tableau, PowerBI, Python (Pandas)</li>
        <li><strong>Scientists:</strong> Python (Scikit-learn, TensorFlow), R, Big Data tools (Spark, Hadoop)</li>
      </ul>
      
      <h3>Which One is for You?</h3>
      <p>If you love storytelling with data and finding immediate actionable insights, Data Analysis might be your jam. If you enjoy mathematics, coding complex algorithms, and building products powered by AI, Data Science could be the better fit.</p>
    `,
    },
    {
        id: "sabanci-winter-vlog",
        type: "vlog",
        title: "Sabancı Üniversitesi Vlog ❄ | Kış 2022 | Kar Gören İzmirli | rislek vlog 5",
        excerpt: "İzmirli biri olarak Sabancı Üniversitesi kampüsünde kar yağışının tadını çıkarıyoruz!",
        date: "2022",
        duration: "7:15",
        link: "https://youtu.be/Iw-Jkqcz5jc",
        thumbnail: "https://i.ytimg.com/vi/Iw-Jkqcz5jc/maxresdefault.jpg",
        featured: true,
    },
    {
        id: "susail-sailing",
        type: "vlog",
        title: "Sabancı Üniversitesi Yelken Gezisi ⛵︎ | SUSAIL | rislek vlog 7",
        excerpt: "SUSAIL (Sabancı Üniversitesi Yelken Kulübü) ile çıktığımız harika yelken gezisinden anılar.",
        date: "2023",
        duration: "4:07",
        link: "https://youtu.be/RUUvdtXiL7c",
        thumbnail: "https://i.ytimg.com/vi/RUUvdtXiL7c/maxresdefault.jpg",
        featured: true,
    },
    {
        id: "dance-journey",
        type: "blog",
        title: "My Dance Journey at University",
        excerpt: "From shy beginner to club president — how dance changed my student life...",
        date: "Jun 2023",
        readTime: "4 min read",
        content: `
      <p>University isn't just about lectures and exams. For me, the defining part of my university experience wasn't in the classroom—it was in the dance studio.</p>
      
      <h3>Starting Out</h3>
      <p>I joined the dance club as a complete beginner. I had two left feet and was terrified of performing in front of others. But the community was so welcoming that I kept coming back.</p>
      
      <h3>Leadership</h3>
      <p>Fast forward two years, and I found myself running for club president. Leading a student organization taught me more about management, empathy, and organization than any business course could have.</p>
      
      <h3>The Takeaway</h3>
      <p>If you're starting university soon, my biggest advice is this: Join a club that has nothing to do with your major. It allows you to meet different people, develop new parts of your brain, and have an outlet when studies get stressful.</p>
    `,
    },
    {
        id: "barcelona-tips",
        type: "vlog",
        title: "Barcelona Study Abroad Tips",
        excerpt: "Everything you need to know before your exchange in Barcelona — housing, food, nightlife!",
        date: "May 2024",
        duration: "15 min",
        location: "Spain 🇪🇸",
        link: "#",
    },
];
