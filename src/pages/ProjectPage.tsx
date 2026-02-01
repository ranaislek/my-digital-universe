import { useEffect, useState } from "react";
import { useParams, Link, useSearchParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ExternalLink, Github, LayoutGrid, Award, CheckCircle2, Layers, Calendar, Building, Briefcase, Play, Plus, Trash, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageTitle from "@/components/PageTitle";
import BackgroundElements from "@/components/BackgroundElements";
import { supabase } from "@/lib/supabase";
import { ContentItem } from "@/data/content";
import { toast } from "sonner";
import { useAuth } from "@/components/AuthProvider";

const ProjectPage = () => {
    const { slug } = useParams();
    // In our new dynamic system, slug IS the id
    const id = slug;
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { isAdmin } = useAuth();

    // Mode
    const isEditing = searchParams.get("edit") === "true";
    const isNew = searchParams.get("new") === "true";

    // State
    const [project, setProject] = useState<ContentItem | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    // Form Fields
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("Project");
    const [company, setCompany] = useState("");
    const [date, setDate] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [description, setDescription] = useState(""); // Long description
    const [techStackInput, setTechStackInput] = useState("");
    const [liveLink, setLiveLink] = useState("");
    const [repoLink, setRepoLink] = useState("");
    const [challengesInput, setChallengesInput] = useState("");
    const [featuresInput, setFeaturesInput] = useState("");
    const [tagsInput, setTagsInput] = useState("");

    useEffect(() => {
        if (!id) return;

        const fetchData = async () => {
            setIsLoading(true);
            try {
                if (isNew) {
                    // Initialize blank project
                    const newProject: ContentItem = {
                        id: id,
                        type: "project",
                        title: "",
                        category: "",
                        company: "",
                        date: "",
                        excerpt: "",
                        description: "",
                        status: "draft",
                        techStack: [],
                        tags: [],
                        challenges: [],
                        features: [],
                        projectLinks: { demo: "", repo: "" }
                    };
                    setProject(newProject);
                    // Init form fields
                    setTitle("");
                    setCategory("");
                    setCompany("");
                    setDate("");
                    setExcerpt("");
                    setDescription("");
                    setTechStackInput("");
                    setLiveLink("");
                    setRepoLink("");
                    setChallengesInput("");
                    setFeaturesInput("");
                    setTagsInput("");
                } else {
                    const { data, error } = await supabase
                        .from('experiences')
                        .select('*')
                        .eq('id', id)
                        .single();

                    if (error) throw error;

                    const p = {
                        ...data,
                        type: "project",
                        techStack: data.tech_stack || [],
                        projectLinks: { demo: data.demo_link, repo: data.repo_link },
                        challenges: data.challenges || [],
                        features: data.features || [],
                        tags: data.tags || [],
                        screenshots: data.screenshots || []
                    };

                    setProject(p);
                    // Fill form
                    setTitle(p.title);
                    setCategory(p.category || "Work");
                    setCompany(p.company || "");
                    setDate(p.date || "");
                    setExcerpt(p.excerpt || "");
                    setDescription(p.description || "");
                    setTechStackInput(p.techStack?.join(", ") || "");
                    setLiveLink(p.projectLinks?.demo || "");
                    setRepoLink(p.projectLinks?.repo || "");
                    setChallengesInput(p.challenges?.join("\n") || "");
                    setFeaturesInput(p.features?.join("\n") || "");
                    setTagsInput(p.tags?.join(", ") || "");
                }
            } catch (error) {
                console.error("Error loading project:", error);
                toast.error("Could not load project");
                if (!isNew) navigate("/portfolio");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
        window.scrollTo(0, 0);
    }, [id, isNew, navigate]);

    const handleSave = async (status: "draft" | "published") => {
        if (!id) return;

        // Validation
        if (!category) {
            toast.error("Please select a category");
            return;
        }

        setIsSaving(true);

        try {
            // Process array inputs
            const techStack = techStackInput.split(",").map(s => s.trim()).filter(Boolean);
            const tags = tagsInput.split(",").map(s => s.trim()).filter(Boolean);
            const challenges = challengesInput.split("\n").map(s => s.trim()).filter(Boolean);
            const features = featuresInput.split("\n").map(s => s.trim()).filter(Boolean);

            const dbPayload = {
                id: id,
                title: title.trim() || "Untitled Experience",
                category: category,
                company: company,
                date: date,
                excerpt: excerpt,
                description: description,
                tech_stack: techStack,
                demo_link: liveLink || null,
                repo_link: repoLink || null,
                challenges: challenges,
                features: features,
                tags: tags,
                screenshots: project?.screenshots || [],
                status: status,
                updated_at: new Date().toISOString()
            };

            const { error } = await supabase
                .from('experiences')
                .upsert(dbPayload);

            if (error) throw error;

            toast.success(`Project ${status === 'published' ? 'published' : 'saved'}! 🚀`);

            // Update local state to reflect saved data (map DB schema back to Frontend schema)
            const updatedProject: ContentItem = {
                ...project, // Keep existing fields
                id: dbPayload.id,
                type: "project",
                title: dbPayload.title,
                category: dbPayload.category,
                company: dbPayload.company,
                date: dbPayload.date,
                excerpt: dbPayload.excerpt,
                description: dbPayload.description,
                techStack: dbPayload.tech_stack,
                projectLinks: { demo: liveLink, repo: repoLink },
                challenges: dbPayload.challenges,
                features: dbPayload.features,
                tags: dbPayload.tags,
                screenshots: dbPayload.screenshots,
                status: dbPayload.status as "draft" | "published"
            };

            setProject(updatedProject);

            if (status === 'published') {
                navigate(`/project/${id}`); // Exit edit mode
            }

        } catch (error: any) {
            console.error("Save failed:", error);
            toast.error(`Save failed: ${error.message}`);
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    if (!project && !isNew) return <div>Project not found</div>;

    return (
        <div className="min-h-screen bg-background pb-20">
            <BackgroundElements />

            {/* Edit Header */}
            {isEditing && (
                <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border p-4 flex items-center justify-between animate-in slide-in-from-top-2">
                    <div className="flex items-center gap-4">
                        <Link to="/portfolio" className="p-2 hover:bg-accent/10 rounded-full">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <span className="text-sm font-medium text-muted-foreground">
                            {isNew ? "New Experience" : "Editing Experience"}
                        </span>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="ghost"
                            onClick={() => handleSave("draft")}
                            disabled={isSaving}
                        >
                            Save Draft
                        </Button>
                        <Button
                            onClick={() => handleSave("published")}
                            disabled={isSaving}
                        >
                            {isSaving ? "Saving..." : "Publish Change"}
                        </Button>
                    </div>
                </div>
            )}


            <PageTitle title={project?.title || "Project"} />

            {/* Header / Hero */}
            <div className="bg-muted/30 border-b border-border relative">

                {/* Admin Edit Button (View Mode) */}
                {!isEditing && isAdmin && (
                    <div className="absolute top-6 right-6 z-10">
                        <Button
                            onClick={() => navigate(`/project/${id}?edit=true`)}
                            className="rounded-full shadow-lg"
                        >
                            Edit Experience
                        </Button>
                    </div>
                )}

                <div className="container mx-auto px-6 py-12 md:py-20">
                    {!isEditing && (
                        <Link
                            to="/portfolio"
                            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Portfolio
                        </Link>
                    )}

                    <div className="grid lg:grid-cols-3 gap-12 items-start">
                        <div className="lg:col-span-2">
                            {/* Category & Company */}
                            <div className="flex flex-wrap items-center gap-4 mb-6">
                                {isEditing ? (
                                    <>
                                        <select
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                            className="p-2 rounded-md bg-background border border-border"
                                        >
                                            <option value="" disabled>Select Category</option>
                                            <option value="Work">Work</option>
                                            <option value="Project">Project</option>
                                            <option value="Startup">Startup</option>
                                            <option value="Research">Research</option>
                                        </select>
                                        <input
                                            type="text"
                                            value={company}
                                            onChange={(e) => setCompany(e.target.value)}
                                            placeholder="Company / Org"
                                            className="p-2 rounded-md bg-background border border-border flex-1"
                                        />
                                    </>
                                ) : (
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 rounded-xl bg-primary/10 text-primary">
                                            <Briefcase className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider block">
                                                {project?.category}
                                            </span>
                                            {project?.company && <span className="text-sm font-medium">{project.company}</span>}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Title */}
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Experience Title"
                                    className="w-full font-serif text-4xl md:text-5xl lg:text-6xl font-medium mb-6 bg-transparent border-none outline-none placeholder:opacity-30"
                                />
                            ) : (
                                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium mb-6 leading-tight">
                                    {project?.title}
                                </h1>
                            )}

                            {/* Excerpt */}
                            {isEditing ? (
                                <textarea
                                    value={excerpt}
                                    onChange={(e) => setExcerpt(e.target.value)}
                                    placeholder="Short excerpt/summary..."
                                    className="w-full text-xl text-muted-foreground bg-transparent border-none outline-none resize-none h-24 placeholder:opacity-30"
                                />
                            ) : (
                                <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mb-8">
                                    {project?.excerpt}
                                </p>
                            )}

                            {/* Tags */}
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={tagsInput}
                                    onChange={(e) => setTagsInput(e.target.value)}
                                    placeholder="Tags (comma separated)"
                                    className="w-full p-2 bg-background border border-border rounded-md mb-8"
                                />
                            ) : (
                                <div className="flex flex-wrap gap-2 mb-8">
                                    {project?.tags?.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-4 py-1.5 rounded-full bg-background border border-border text-sm font-medium"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* Links */}
                            <div className="flex flex-wrap gap-4">
                                {isEditing ? (
                                    <div className="flex gap-4 w-full">
                                        <input
                                            type="text"
                                            value={liveLink}
                                            onChange={(e) => setLiveLink(e.target.value)}
                                            placeholder="Live Demo URL"
                                            className="flex-1 p-2 border border-border rounded-md"
                                        />
                                        <input
                                            type="text"
                                            value={repoLink}
                                            onChange={(e) => setRepoLink(e.target.value)}
                                            placeholder="GitHub Repo URL"
                                            className="flex-1 p-2 border border-border rounded-md"
                                        />
                                    </div>
                                ) : (
                                    <>
                                        {project?.projectLinks?.demo && (
                                            <Button asChild className="rounded-full">
                                                <a href={project.projectLinks.demo} target="_blank" rel="noopener noreferrer">
                                                    <ExternalLink className="w-4 h-4 mr-2" />
                                                    Live Demo
                                                </a>
                                            </Button>
                                        )}
                                        {project?.projectLinks?.repo && (
                                            <Button asChild variant="outline" className="rounded-full">
                                                <a href={project.projectLinks.repo} target="_blank" rel="noopener noreferrer">
                                                    <Github className="w-4 h-4 mr-2" />
                                                    View Code
                                                </a>
                                            </Button>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Sidebar Info */}
                        <div className="bg-card border border-border rounded-3xl p-6 lg:p-8 space-y-8">
                            {/* Date / Time Interval */}
                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-2">
                                    <Calendar className="w-4 h-4" /> Timeline
                                </h3>
                                {isEditing ? (
                                    <div className="flex flex-col gap-2">
                                        <input
                                            type="text"
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                            placeholder="e.g. Jan 2023 - Present"
                                            className="p-2 border border-border rounded-md w-full"
                                        />
                                        <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={date.toLowerCase().includes("present")}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        const parts = date.split("-");
                                                        if (parts.length > 0) {
                                                            setDate(`${parts[0].trim()} - Present`);
                                                        } else {
                                                            setDate("Present");
                                                        }
                                                    }
                                                }}
                                            />
                                            Current Role
                                        </label>
                                    </div>
                                ) : (
                                    <p className="font-medium text-lg">{project?.date}</p>
                                )}
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <Layers className="w-4 h-4" /> Tech Stack
                                </h3>
                                {isEditing ? (
                                    <textarea
                                        value={techStackInput}
                                        onChange={(e) => setTechStackInput(e.target.value)}
                                        placeholder="React, TypeScript, Tailwind..."
                                        className="w-full p-2 border border-border rounded-md h-24"
                                    />
                                ) : (
                                    <div className="flex flex-wrap gap-2">
                                        {project?.techStack?.map(tech => (
                                            <span key={tech} className="px-2 py-1 bg-muted rounded-md text-sm">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-6 py-12 md:py-20">
                <div className="grid lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-12">
                        {/* Overview */}
                        <section>
                            <h2 className="font-serif text-2xl mb-6">Overview</h2>
                            {isEditing ? (
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Detailed description..."
                                    className="w-full h-48 p-4 bg-muted/20 border border-border rounded-xl resize-y"
                                />
                            ) : (
                                <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                                    {project?.description}
                                </p>
                            )}
                        </section>

                        {/* Challenges */}
                        {(isEditing || (project?.challenges && project.challenges.length > 0)) && (
                            <section>
                                <h2 className="font-serif text-2xl mb-6 flex items-center gap-2">
                                    <Award className="w-6 h-6 text-primary" />
                                    Key Challenges
                                </h2>
                                {isEditing ? (
                                    <textarea
                                        value={challengesInput}
                                        onChange={(e) => setChallengesInput(e.target.value)}
                                        placeholder="One challenge per line..."
                                        className="w-full h-32 p-4 bg-muted/20 border border-border rounded-xl resize-y"
                                    />
                                ) : (
                                    <ul className="space-y-4">
                                        {project?.challenges?.map((challenge, idx) => (
                                            <li key={idx} className="flex items-start gap-3 p-4 bg-muted/30 rounded-xl">
                                                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                                <span>{challenge}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </section>
                        )}

                        {/* Features */}
                        {(isEditing || (project?.features && project.features.length > 0)) && (
                            <section>
                                <h2 className="font-serif text-2xl mb-6 flex items-center gap-2">
                                    <Layers className="w-6 h-6 text-primary" />
                                    Key Features
                                </h2>
                                {isEditing ? (
                                    <textarea
                                        value={featuresInput}
                                        onChange={(e) => setFeaturesInput(e.target.value)}
                                        placeholder="One feature per line..."
                                        className="w-full h-32 p-4 bg-muted/20 border border-border rounded-xl resize-y"
                                    />
                                ) : (
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {project?.features?.map((feature, idx) => (
                                            <div key={idx} className="p-4 border border-border rounded-xl bg-card">
                                                {feature}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </section>
                        )}

                        {/* Screenshots Placeholder - No edit support for now */}
                        <section>
                            <h2 className="font-serif text-2xl mb-6 flex items-center gap-2">
                                <LayoutGrid className="w-6 h-6 text-primary" />
                                Gallery
                            </h2>
                            {project?.screenshots ? (
                                <div className="grid gap-6">
                                    {project.screenshots.map((shot, idx) => (
                                        <img key={idx} src={shot} alt="Screenshot" className="rounded-xl border border-border shadow-sm w-full" />
                                    ))}
                                </div>
                            ) : (
                                <div className="p-8 border border-dashed border-border rounded-xl text-center text-muted-foreground bg-muted/20">
                                    <p>More visuals coming soon!</p>
                                </div>
                            )}
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectPage;
