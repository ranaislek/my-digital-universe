
export interface JourneyEvent {
    id: string;
    year: string;
    title: string;
    location: string;
    description: string;
    image?: string; // We'll use placeholders for now
    type: "education" | "work" | "travel" | "milestone";
}

export const journeyEvents: JourneyEvent[] = [
    {
        id: "cakabey",
        year: "2007 - 2019",
        title: "High School Graduation",
        location: "Izmir, Turkey 🇹🇷",
        description: "Graduated from Private Çakabey Schools, where my educational journey began.",
        type: "education",
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: "sabanci-start",
        year: "2019",
        title: "Started Sabanci University",
        location: "Istanbul, Turkey 🇹🇷",
        description: "Began my undergraduate studies in Computer Science & Engineering.",
        type: "education",
        image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: "budapest-erasmus",
        year: "2022",
        title: "Erasmus in Budapest",
        location: "Budapest, Hungary 🇭🇺",
        description: "A semester of exploration, new cultures, and academic growth in the heart of Europe.",
        type: "travel",
        image: "https://images.unsplash.com/photo-1565426873118-a17ed65d7429?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: "sabanci-grad",
        year: "2023",
        title: "Graduated from Sabanci",
        location: "Istanbul, Turkey 🇹🇷",
        description: "Completed my Bachelor's degree with a focus on Software Engineering.",
        type: "education",
        image: "https://images.unsplash.com/photo-1635350736475-c8cef4b21906?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: "erasmus-mundus-brussels",
        year: "Late 2023",
        title: "Erasmus Mundus Master's",
        location: "Brussels, Belgium 🇧🇪",
        description: "Started my Joint Master Degree. First semester adventure in the capital of Europe.",
        type: "education",
        image: "https://images.unsplash.com/photo-1559410545-0284937d5786?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: "barcelona",
        year: "2024",
        title: "Semester in Barcelona",
        location: "Barcelona, Spain 🇪🇸",
        description: "Living and studying in the vibrant city of Barcelona.",
        type: "travel",
        image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: "padova",
        year: "2025",
        title: "Specialization in AI",
        location: "Padova, Italy 🇮🇹",
        description: "Specializing in Deep Learning & AI at the University of Padua while writing my Master's Thesis.",
        type: "education",
        image: "https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?q=80&w=2067&auto=format&fit=crop"
    },
    {
        id: "ngn-work",
        year: "Oct 2025",
        title: "Full-time at NGN",
        location: "Turkey 🇹🇷",
        description: "Returned to Turkey and started my professional career working full-time at NGN.",
        type: "work",
        image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: "masters-grad",
        year: "Dec 2025",
        title: "Master's Graduation",
        location: "Europe 🇪🇺",
        description: "Officially graduating from the Erasmus Mundus Joint Master Program.",
        type: "milestone",
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: "now",
        year: "Present",
        title: "The Journey Continues...",
        location: "Digital Universe 🌐",
        description: "Currently building, learning, and sharing my experiences with the world.",
        type: "milestone",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
    }
];
