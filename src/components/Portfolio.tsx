import { ExternalLink, FileText, Award, GraduationCap } from "lucide-react";

const portfolioItems = [
  {
    category: "Publication",
    title: "Research on Complex Systems",
    description: "Published in Nature Communications exploring emergent behaviors in networked systems.",
    tags: ["Peer Reviewed", "2024"],
    icon: FileText,
  },
  {
    category: "Award",
    title: "Excellence in Research",
    description: "Recognized for outstanding contributions to interdisciplinary studies.",
    tags: ["Academic", "2023"],
    icon: Award,
  },
  {
    category: "Education",
    title: "Ph.D. in Progress",
    description: "Doctoral research focusing on the intersection of technology and human behavior.",
    tags: ["Ongoing", "Research"],
    icon: GraduationCap,
  },
  {
    category: "Publication",
    title: "Machine Learning Applications",
    description: "Co-authored paper on novel ML approaches for pattern recognition.",
    tags: ["Conference", "2023"],
    icon: FileText,
  },
];

const Portfolio = () => {
  return (
    <section id="portfolio" className="py-24 md:py-32 relative">
      {/* Background Accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-medium text-sm tracking-wider uppercase">
            Portfolio
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-medium mt-2 mb-6">
            Academic <span className="gradient-text">Achievements</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            A curated collection of my research, publications, and academic milestones 
            that mark my journey through the world of knowledge.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {portfolioItems.map((item, index) => (
            <div
              key={index}
              className="group card-glow"
            >
              <div className="relative p-6 rounded-xl bg-card border border-border h-full hover:border-primary/30 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>

                <h3 className="font-serif text-xl font-medium mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted-foreground mb-4">{item.description}</p>

                <div className="flex gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs rounded-full bg-muted text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <span>View Full CV</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
