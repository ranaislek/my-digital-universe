
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Github, LayoutGrid, Award, CheckCircle2, Layers } from "lucide-react";
import { projects } from "../data/projects";
import { Button } from "@/components/ui/button";
import PageTitle from "@/components/PageTitle";
import BackgroundElements from "@/components/BackgroundElements";

const ProjectPage = () => {
    const { slug } = useParams();
    const project = projects.find((p) => p.slug === slug);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!project) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6">
                <h1 className="text-2xl font-serif mb-4">Project not found</h1>
                <Button asChild variant="link">
                    <Link to="/portfolio">Back to Portfolio</Link>
                </Button>
            </div>
        );
    }

    const Icon = project.icon;

    return (
        <div className="min-h-screen bg-background pb-20">
            <BackgroundElements />
            <PageTitle title={project.title} />
            {/* Header / Hero */}
            <div className="bg-muted/30 border-b border-border">
                <div className="container mx-auto px-6 py-12 md:py-20">
                    <Link
                        to="/portfolio"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Portfolio
                    </Link>

                    <div className="grid lg:grid-cols-3 gap-12 items-start">
                        <div className="lg:col-span-2">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                                    <Icon className="w-6 h-6" />
                                </div>
                                <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                                    {project.category}
                                </span>
                            </div>

                            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium mb-6 leading-tight">
                                {project.title}
                            </h1>
                            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mb-8">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-8">
                                {project.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-4 py-1.5 rounded-full bg-background border border-border text-sm font-medium"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="flex flex-wrap gap-4">
                                {project.links?.demo && (
                                    <Button asChild className="rounded-full">
                                        <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="w-4 h-4 mr-2" />
                                            Live Demo
                                        </a>
                                    </Button>
                                )}
                                {project.links?.repo && (
                                    <Button asChild variant="outline" className="rounded-full">
                                        <a href={project.links.repo} target="_blank" rel="noopener noreferrer">
                                            <Github className="w-4 h-4 mr-2" />
                                            View Code
                                        </a>
                                    </Button>
                                )}
                            </div>
                        </div>

                        {/* Sidebar Info */}
                        <div className="bg-card border border-border rounded-3xl p-6 lg:p-8 space-y-8">
                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Company / Org</h3>
                                <p className="font-medium text-lg">{project.company}</p>
                            </div>

                            {project.techStack && (
                                <div>
                                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">Tech Stack</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {project.techStack.map(tech => (
                                            <span key={tech} className="px-2 py-1 bg-muted rounded-md text-sm">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
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
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {project.longDescription || project.description}
                            </p>
                        </section>

                        {/* Challenges */}
                        {project.challenges && (
                            <section>
                                <h2 className="font-serif text-2xl mb-6 flex items-center gap-2">
                                    <Award className="w-6 h-6 text-primary" />
                                    Key Challenges
                                </h2>
                                <ul className="space-y-4">
                                    {project.challenges.map((challenge, idx) => (
                                        <li key={idx} className="flex items-start gap-3 p-4 bg-muted/30 rounded-xl">
                                            <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                            <span>{challenge}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {/* Features */}
                        {project.features && (
                            <section>
                                <h2 className="font-serif text-2xl mb-6 flex items-center gap-2">
                                    <Layers className="w-6 h-6 text-primary" />
                                    Key Features
                                </h2>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {project.features.map((feature, idx) => (
                                        <div key={idx} className="p-4 border border-border rounded-xl bg-card">
                                            {feature}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Screenshots Placeholder */}
                        <section>
                            <h2 className="font-serif text-2xl mb-6 flex items-center gap-2">
                                <LayoutGrid className="w-6 h-6 text-primary" />
                                Gallery
                            </h2>
                            {project.screenshots ? (
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
