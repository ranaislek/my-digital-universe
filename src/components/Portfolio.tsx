import { ExternalLink, FileText, Award, GraduationCap, Briefcase, Code, Sparkles } from "lucide-react";

const experiences = [
  {
    category: "Current Role",
    title: "Data & Analytics Specialist",
    company: "NGN",
    description: "Leading internal data foundation design, building C-level Power BI dashboards, and managing Salesforce reporting.",
    tags: ["Power BI", "Salesforce", "ETL"],
    icon: Briefcase,
    highlight: true,
  },
  {
    category: "Research",
    title: "Machine Learning Research",
    company: "University of Padua",
    description: "Thesis on constrained molecular graph generation with discrete diffusion models. Achieved 100% constraint satisfaction.",
    tags: ["PyTorch", "RDKit", "Deep Learning"],
    icon: Code,
  },
  {
    category: "Experience",
    title: "Product Analyst Intern",
    company: "Delivery Hero (Yemeksepeti)",
    description: "Built C-level KPI dashboards on BigQuery + Looker Studio across multiple brands and markets.",
    tags: ["BigQuery", "Looker", "SQL"],
    icon: FileText,
  },
  {
    category: "Startup",
    title: "ScholarIA — Academic Paper Platform",
    company: "UPC Barcelona",
    description: "Built AI-powered research assistant with personalized recommendations. Selected #1 in master's cohort!",
    tags: ["AI/ML", "Vercel", "LLM"],
    icon: Sparkles,
  },
];

const education = [
  {
    degree: "MSc Big Data Management & Analytics",
    school: "Erasmus Mundus Joint Master's",
    details: "Brussels → Barcelona → Padova",
    year: "2023-2025",
  },
  {
    degree: "BSc Computer Science & Engineering",
    school: "Sabancı University",
    details: "Minor in Decision & Behavior • Exchange at Budapest",
    year: "2019-2023",
  },
];

const Portfolio = () => {
  return (
    <section id="portfolio" className="py-24 md:py-32 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 pop-gradient opacity-50" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-medium text-sm tracking-wider uppercase">
            Portfolio
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-medium mt-2 mb-6">
            Experience & <span className="gradient-text">Education</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            From analyzing user journeys to training neural networks — 
            here's a peek into my professional adventures.
          </p>
        </div>

        {/* Experience Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {experiences.map((item, index) => (
            <div
              key={index}
              className={`group card-hover ${item.highlight ? 'md:col-span-2' : ''}`}
            >
              <div className={`relative p-6 rounded-2xl bg-card border border-border h-full ${
                item.highlight ? 'bg-gradient-to-r from-primary/5 via-transparent to-accent/5' : ''
              }`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <span className="text-xs font-medium text-primary uppercase tracking-wider">
                        {item.category}
                      </span>
                      <p className="text-sm text-muted-foreground">{item.company}</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>

                <h3 className="font-serif text-xl font-medium mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted-foreground mb-4">{item.description}</p>

                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Education Section */}
        <div className="max-w-2xl mx-auto">
          <h3 className="font-serif text-2xl font-medium text-center mb-8">
            <GraduationCap className="inline-block w-6 h-6 text-primary mr-2" />
            Education Journey
          </h3>
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div 
                key={index}
                className="flex items-start gap-4 p-4 rounded-2xl bg-card border border-border card-hover"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">🎓</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">{edu.degree}</h4>
                      <p className="text-sm text-primary">{edu.school}</p>
                    </div>
                    <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded-full">
                      {edu.year}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{edu.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <a
            href="#"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 text-primary rounded-full font-medium hover:bg-primary/20 transition-colors"
          >
            <span>Download Full CV</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
