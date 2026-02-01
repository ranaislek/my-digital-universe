import { ExternalLink, GraduationCap, Briefcase, Code, FileText, Sparkles, LucideIcon, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { ContentItem } from "../data/content";
import PostControls from "./admin/PostControls";
import { useAuth } from "./AuthProvider";

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
  const { isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<"All" | "Work" | "Project" | "Startup" | "Research">("All");

  useEffect(() => {
    fetchProjects();
  }, [isAdmin]); // Re-fetch when admin status changes

  const fetchProjects = async () => {
    try {
      let query = supabase
        .from('experiences')
        .select('*');

      // Only filter by published if NOT admin
      if (!isAdmin) {
        query = query.eq('status', 'published');
      }

      const { data, error } = await query;

      if (error) throw error;

      // Map DB columns to ContentItem interface
      const mappedProjects: ContentItem[] = (data || []).map(p => ({
        ...p,
        // Ensure arrays are arrays (Supabase usually returns them as arrays if defined as text[])
        techStack: p.tech_stack || [],
        projectLinks: {
          demo: p.demo_link,
          repo: p.repo_link
        },
        type: "project" // Hardcode type for frontend consistency
      }));

      // Sort by DATE only - Newest First
      mappedProjects.sort((a, b) => {
        // Parse date string (e.g., "Oct 2025 – Present" or "Jun 2022")
        const parseDate = (dateStr: string) => {
          if (!dateStr) return new Date(0).getTime();
          // Split by en-dash or hyphen to get end date
          const parts = dateStr.split(/[–-]/);
          const endDate = parts[parts.length - 1].trim();

          if (endDate.toLowerCase().includes('present')) {
            return new Date().getTime(); // Present is always newest
          }
          const parsed = new Date(endDate).getTime();
          return isNaN(parsed) ? 0 : parsed;
        };

        const timeA = parseDate(a.date);
        const timeB = parseDate(b.date);

        return timeB - timeA;
      });

      setProjects(mappedProjects);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const displayedExperiences = isTeaser
    ? projects
      .filter(p => p.status === 'published' && (p.featured || p.pinned))
      .sort((a, b) => {
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;
        return 0; // Already sorted by date in fetchProjects
      })
      .slice(0, 3)
    : projects.filter(p => {
      if (activeTab === "All") return true;
      return p.category === activeTab; // Exact match (case sensitive? usually stored as capitalized)
      // Or cleaner: p.category?.toLowerCase() === activeTab.toLowerCase()
      // Let's stick to Exact Match assuming consistent data, or normalize in filter:
      // return p.category?.toLowerCase() === activeTab.toLowerCase();
    }).filter(p => isAdmin || p.status === 'published'); // Ensure only admins see drafts even after filter

  // Helper for normalizing category comparison
  const filterProjects = (tab: string) => {
    if (tab === "All") return projects;
    return projects.filter(p => p.category?.toLowerCase().includes(tab.toLowerCase()) || p.category === tab);
  };

  const finalDisplay = isTeaser ? displayedExperiences : filterProjects(activeTab);


  return (
    <section id="portfolio" className={`relative ${isTeaser ? "min-h-screen flex flex-col justify-center py-20 md:py-24" : "pb-12"}`}>
      {/* Background decoration */}
      <div className="absolute inset-0 pop-gradient opacity-50" />

      <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        <div className={`text-center max-w-2xl mx-auto ${isTeaser ? "mb-8 lg:mb-12" : "mb-16"}`}>
          {!isTeaser && (
            <span className="text-primary font-medium text-xs tracking-wider uppercase">
              Portfolio
            </span>
          )}

          <h2 className="font-serif text-3xl md:text-4xl font-medium mt-1 mb-3">
            Experience & <span className="gradient-text">Education</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            From analyzing user journeys to training neural networks —
            here's a peek into my professional adventures.
          </p>
        </div>

        {/* Filters & Admin Actions */}
        {!isTeaser && (
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            {["All", "Work", "Project", "Startup", "Research"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === tab
                  ? "bg-primary text-primary-foreground shadow-lg scale-105"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
              >
                {tab}
                {tab === "All" && <span className="ml-2 text-xs opacity-60">{projects.length}</span>}
              </button>
            ))}

            {isAdmin && (
              <button
                onClick={() => {
                  const slug = `project-${Date.now()}`;
                  window.location.href = `/project/${slug}?edit=true&new=true`;
                }}
                className="px-4 py-2 rounded-full text-sm font-medium bg-green-500/10 text-green-500 hover:bg-green-500/20 transition-colors flex items-center gap-2 ml-4"
              >
                <PlusCircle className="w-4 h-4" /> New Experience
              </button>
            )}
          </div>
        )}

        {/* Experience Cards */}
        {isLoading ? (
          <div className="text-center py-12">Loading projects...</div>
        ) : (
          <div className={`grid md:grid-cols-2 gap-4 ${isTeaser ? "mb-8" : "mb-16"}`}>
            {finalDisplay.map((project, index) => {
              const Icon = project.icon && iconMap[project.icon] ? iconMap[project.icon] : Briefcase;
              // Teaser Logic: First item is Hero (col-span-2) IF it is a teaser. 
              const isHero = isTeaser && index === 0;

              return (
                <div key={project.id} className={`group relative block ${isHero ? 'md:col-span-2' : ''}`}>
                  {/* Admin Controls Overlay */}
                  {isAdmin && (
                    <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                      <PostControls
                        postId={project.id}
                        isFeatured={project.featured}
                        isPinned={project.pinned}
                        onUpdate={fetchProjects}
                        onDelete={fetchProjects}
                        editPath={`/project/${project.id}`}
                        tableName="experiences"
                      />
                    </div>
                  )}

                  <Link
                    to={`/project/${project.id}`} // Use ID as slug
                    className="block h-full"
                  >
                    <div className={`relative p-5 rounded-2xl bg-card border border-border h-full transition-all card-hover ${isHero ? 'bg-gradient-to-r from-primary/5 via-transparent to-accent/5' : ''
                      }`}>

                      {/* Draft Badge */}
                      {project.status === 'draft' && (
                        <div className="absolute top-2 left-2 z-20">
                          <span className="px-2 py-1 bg-orange-500 text-white text-[10px] font-bold rounded-md shadow-sm uppercase tracking-wider">
                            Draft
                          </span>
                        </div>
                      )}

                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                            <Icon className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <span className="text-xs font-medium text-primary uppercase tracking-wider">
                              {project.category}
                            </span>
                            <p className="text-xs text-muted-foreground">{project.company}</p>
                          </div>
                        </div>
                        <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>

                      <h3 className={`font-serif font-medium mb-1 group-hover:text-primary transition-colors ${isHero ? 'text-lg md:text-xl' : 'text-base'}`}>
                        {project.title}
                      </h3>
                      <p className={`text-muted-foreground mb-3 ${isHero ? 'text-sm line-clamp-2' : 'text-xs line-clamp-2'}`}>{project.excerpt}</p>

                      {/* Date / Time Interval */}
                      <div className="text-xs text-muted-foreground mb-3 flex items-center gap-2">
                        <span className="bg-muted px-2 py-0.5 rounded-sm">
                          {project.date}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {(project.tags || []).slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 text-[10px] rounded-full bg-primary/10 text-primary font-medium"
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
          <div className="text-center">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-colors group"
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
