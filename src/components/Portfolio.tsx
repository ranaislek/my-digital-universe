import { ExternalLink, GraduationCap, Briefcase, Code, FileText, Sparkles, LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { ContentItem } from "../data/content";
import PostControls from "./admin/PostControls";

const iconMap: Record<string, LucideIcon> = {
  "Briefcase": Briefcase,
  "Code": Code,
  "FileText": FileText,
  "Sparkles": Sparkles,
};

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

interface PortfolioProps {
  isTeaser?: boolean;
}

const Portfolio = ({ isTeaser = false }: PortfolioProps) => {
  const [projects, setProjects] = useState<ContentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('type', 'project')
        .eq('status', 'published') // Only show published
        .order('featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Map snake_case to camelCase
      const mappedProjects: ContentItem[] = (data || []).map(p => ({
        ...p,
        techStack: p.tech_stack,
        projectLinks: p.project_links
      }));

      setProjects(mappedProjects);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const displayedExperiences = isTeaser ? projects.slice(0, 2) : projects;

  return (
    <section id="portfolio" className={`relative ${isTeaser ? "py-24 md:py-32" : "pb-12"}`}>
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
        {isLoading ? (
          <div className="text-center py-12">Loading projects...</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {displayedExperiences.map((project, index) => {
              const Icon = project.icon && iconMap[project.icon] ? iconMap[project.icon] : Briefcase;

              return (
                <div key={project.id} className={`group relative block ${project.featured ? 'md:col-span-2' : ''}`}>
                  {/* Admin Controls Overlay */}
                  <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                    <PostControls
                      postId={project.id}
                      isFeatured={project.featured}
                      onUpdate={fetchProjects}
                      onDelete={fetchProjects}
                    />
                  </div>

                  <Link
                    to={`/project/${project.id}`} // Use ID as slug
                    className="block h-full"
                  >
                    <div className={`relative p-6 rounded-2xl bg-card border border-border h-full transition-all card-hover ${project.featured ? 'bg-gradient-to-r from-primary/5 via-transparent to-accent/5' : ''
                      }`}>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                            <Icon className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <span className="text-xs font-medium text-primary uppercase tracking-wider">
                              {project.category}
                            </span>
                            <p className="text-sm text-muted-foreground">{project.company}</p>
                          </div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>

                      <h3 className="font-serif text-xl font-medium mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">{project.excerpt}</p>

                      <div className="flex flex-wrap gap-2">
                        {(project.tags || []).slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        )}

        {isTeaser && (
          <div className="text-center mt-12">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors group"
            >
              <span>View Full Portfolio</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}

        {!isTeaser && (
          <>
            {/* Education Section - Only show on full page */}
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

            <a
              href="/RanaIslek_CV.pdf"
              download="RanaIslek_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 text-primary rounded-full font-medium hover:bg-primary/20 transition-colors mt-12"
            >
              <span>Download Full CV</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
