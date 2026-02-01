
export interface JourneyEvent {
    id: string;
    year: string;
    title: string;
    location: string;
    description: string;
    image?: string;
    imageFit?: "cover" | "contain"; // Optional: default is cover
    imagePosition?: "center" | "top" | "bottom"; // Optional: default is center
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
        image: "/cakabeyokullari_cover.jpg"
    },
    {
        id: "sabanci-start",
        year: "2019",
        title: "Started Sabanci University",
        location: "Istanbul, Turkey 🇹🇷",
        description: "Began my undergraduate studies in Computer Science & Engineering.",
        type: "education",
        image: "/sabanci-genel.jpg"
    },
    {
        id: "budapest-erasmus",
        year: "2022",
        title: "Erasmus in Budapest",
        location: "Budapest, Hungary 🇭🇺",
        description: "A semester of exploration, new cultures, and academic growth in the heart of Europe.",
        type: "travel",
        image: "/bme-budapest.jpg"
    },
    {
        id: "sabanci-grad",
        year: "2023",
        title: "Graduated from Sabanci",
        location: "Istanbul, Turkey 🇹🇷",
        description: "Completed my Bachelor's degree with a focus on Software Engineering.",
        type: "education",
        image: "/sabanci-mezun.jpg",
        imagePosition: "top"
    },
    {
        id: "erasmus-mundus-brussels",
        year: "Late 2023",
        title: "Erasmus Mundus Master's",
        location: "Brussels, Belgium 🇧🇪",
        description: "Started my Joint Master Degree. First semester adventure in the capital of Europe.",
        type: "education",
        image: "/brussels.jpg"
    },
    {
        id: "barcelona",
        year: "2024",
        title: "Semester in Barcelona",
        location: "Barcelona, Spain 🇪🇸",
        description: "Living and studying in the vibrant city of Barcelona.",
        type: "travel",
        image: "/barcelona.jpg"
    },
    {
        id: "padova",
        year: "2025",
        title: "Specialization in AI",
        location: "Padova, Italy 🇮🇹",
        description: "Specializing in Deep Learning & AI at the University of Padua while writing my Master's Thesis.",
        type: "education",
        image: "/padova.jpg"
    },
    {
        id: "ngn-work",
        year: "Oct 2025",
        title: "Full-time at NGN",
        location: "Turkey 🇹🇷",
        description: "Returned to Turkey and started my professional career working full-time at NGN.",
        type: "work",
        image: "/ngn-start.jpg"
    },
    {
        id: "masters-grad",
        year: "Dec 2025",
        title: "Master's Graduation",
        location: "Europe 🇪🇺",
        description: "Officially graduating from the Erasmus Mundus Joint Master Program.",
        type: "milestone",
        image: "/masters-grad.jpg",
        imagePosition: "top"
    },
    {
        id: "now",
        year: "Present",
        title: "The Journey Continues...",
        location: "Digital Universe 🌐",
        description: "Currently building, learning, and sharing my experiences with the world.",
        type: "milestone",
        image: "/frog-cartoon.jpg"
    }
];
