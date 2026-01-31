
import { Briefcase, Code, FileText, Sparkles, LucideIcon } from "lucide-react";

export interface ProjectItem {
    id: string;
    slug: string;
    category: string;
    title: string;
    company: string;
    description: string;
    longDescription?: string;
    challenges?: string[];
    features?: string[];
    techStack?: string[];
    tags: string[];
    icon: LucideIcon;
    highlight?: boolean;
    screenshots?: string[];
    links?: {
        demo?: string;
        repo?: string;
    };
}

export const projects: ProjectItem[] = [
    {
        id: "ngn-data",
        slug: "ngn-data-specialist",
        category: "Current Role",
        title: "Data & Analytics Specialist",
        company: "NGN",
        description: "Leading internal data foundation design, building C-level Power BI dashboards, and managing Salesforce reporting.",
        longDescription: "As a Data & Analytics Specialist at NGN, I am responsible for architecting the internal data foundation and empowering the executive team with actionable insights. I bridge the gap between complex data sources and strategic decision-making.",
        challenges: [
            "Integrating disparate data sources into a unified data warehouse.",
            "Optimizing Power BI report performance for large datasets.",
            "Ensuring data governance and accuracy across Salesforce and internal systems."
        ],
        features: [
            "C-level Executive Dashboards",
            "Automated ETL Pipelines",
            "Salesforce Custom Reporting",
            "Data Quality Monitoring"
        ],
        techStack: ["Power BI", "Salesforce", "SQL", "ETL", "Data Modeling"],
        tags: ["Power BI", "Salesforce", "ETL"],
        icon: Briefcase,
        highlight: true,
    },
    {
        id: "molecular-graph",
        slug: "molecular-graph-generation",
        category: "Research",
        title: "Machine Learning Research",
        company: "University of Padua",
        description: "Thesis on constrained molecular graph generation with discrete diffusion models. Achieved 100% constraint satisfaction.",
        longDescription: "My Master's thesis focused on Generative AI for Drug Discovery. I developed a discrete diffusion model capable of generating valid molecular graphs that satisfy specific chemical properties.",
        challenges: [
            "Handling the discrete nature of graph structures in diffusion models.",
            "Ensuring 100% validity of generated molecules.",
            "Balancing diversity and property constraints."
        ],
        techStack: ["Python", "PyTorch", "RDKit", "Geometric Deep Learning", "Diffusion Models"],
        tags: ["PyTorch", "RDKit", "Deep Learning"],
        icon: Code,
    },
    {
        id: "yemeksepeti",
        slug: "yemeksepeti-product-analyst",
        category: "Experience",
        title: "Product Analyst Intern",
        company: "Delivery Hero (Yemeksepeti)",
        description: "Built C-level KPI dashboards on BigQuery + Looker Studio across multiple brands and markets.",
        longDescription: "At Yemeksepeti (Delivery Hero), I worked with the Product Data team to visualize key performance indicators. My work helped product managers track the success of new features across different markets.",
        challenges: [
            "Querying massive datasets in BigQuery efficiently.",
            "Designing intuitive dashboards for non-technical stakeholders.",
            "Harmonizing data definitions across different brands."
        ],
        techStack: ["Google BigQuery", "Looker Studio", "SQL", "Product Analytics"],
        tags: ["BigQuery", "Looker", "SQL"],
        icon: FileText,
    },
    {
        id: "scholaria",
        slug: "scholar-ia",
        category: "Startup",
        title: "ScholarIA — Academic Paper Platform",
        company: "UPC Barcelona",
        description: "Built AI-powered research assistant with personalized recommendations. Selected #1 in master's cohort!",
        longDescription: "ScholarIA is an AI-powered platform designed to help researchers find relevant academic papers. It uses Large Language Models to summarize papers and a recommendation engine to suggest personalized content.",
        features: [
            "AI-generated paper summaries",
            "Personalized feed based on research interests",
            "Citation graph visualization",
            "Natural language search"
        ],
        techStack: ["React", "Python", "FastAPI", "OpenAI API", "Vercel", "Neo4j"],
        tags: ["AI/ML", "Vercel", "LLM"],
        icon: Sparkles,
    },
];
