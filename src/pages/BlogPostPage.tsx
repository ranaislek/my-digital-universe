import { useState, useEffect } from "react";
import { useParams, Link, useSearchParams, useNavigate } from "react-router-dom";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { ArrowLeft, Calendar, Clock, Share2, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "../lib/supabase";
import { ContentItem } from "../data/content";
import PageTitle from "@/components/PageTitle";
import PostControls from "@/components/admin/PostControls";

const BlogPostPage = () => {
    const { slug } = useParams();
    const id = slug; // Alias for compatibility
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const isEditing = searchParams.get("edit") === "true";
    const isNew = searchParams.get("new") === "true";

    const [post, setPost] = useState<ContentItem | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    // Form state for editing
    const [title, setTitle] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [content, setContent] = useState("");
    const [thumbnail, setThumbnail] = useState("");

    useEffect(() => {
        if (!id) {
            setIsLoading(false);
            return;
        }

        // Reset state when ID changes
        setIsLoading(true);
        setPost(null);

        if (isNew) {
            // Initialize new post
            const newPost: ContentItem = {
                id: id,
                type: "blog" as const,
                title: "Untitled Story",
                excerpt: "Write a short summary...",
                date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
                content: "",
                status: "draft"
            };
            setPost(newPost);
            setTitle(newPost.title);
            setExcerpt(newPost.excerpt || "");
            setContent("");
            setThumbnail("");
            setIsLoading(false);
        } else {
            fetchPost(id);
        }
    }, [id, isNew]);

    const fetchPost = async (slug: string) => {
        try {
            console.log("Fetching post:", slug);
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .eq('id', slug)
                .single();

            if (error) throw error;

            if (data) {
                const mappedPost = {
                    ...data,
                    readTime: data.read_time
                };
                setPost(mappedPost);
                setTitle(mappedPost.title);
                setExcerpt(mappedPost.excerpt || "");
                setContent(mappedPost.content || "");
                setThumbnail(mappedPost.thumbnail || "");
            }
        } catch (error: any) {
            console.error("Error fetching post:", error);
            toast.error(`Could not find post: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async (status: "draft" | "published") => {
        if (!id) return;
        setIsSaving(true);
        try {
            const dbPayload = {
                id: id,
                type: post?.type || "blog",
                title: title,
                excerpt: excerpt,
                content: content,
                thumbnail: thumbnail,
                link: post?.link || null, // VLOG LINK
                date: post?.date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
                status: status,
                read_time: `${Math.max(1, Math.ceil(content.split(" ").length / 200))} min read`
            };

            const { error } = await supabase
                .from('posts')
                .upsert(dbPayload);

            if (error) throw error;

            toast.success(`Post ${status === 'published' ? 'published' : 'saved'} successfully!`);

            // Update local state
            setPost(prev => ({
                ...prev!,
                ...dbPayload,
                readTime: dbPayload.read_time
            } as ContentItem));

            if (status === 'published') {
                navigate(`/blog/${id}`); // Exit edit mode
            }
        } catch (error: any) {
            console.error("Save failed:", error);
            toast.error(`Save failed: ${error.message}`);
        } finally {
            setIsSaving(false);
        }
    };

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard!");
    };

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (!post && !isNew) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <h1 className="text-2xl font-serif mb-4">Post not found</h1>
                <Link to="/thoughts" className="text-primary hover:underline">
                    Back to all posts
                </Link>
            </div>
        );
    }

    return (
        <article className="min-h-screen bg-background pb-20">
            {/* Edit Mode Header */}
            {isEditing && (
                <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border p-4 flex items-center justify-between animate-in slide-in-from-top-2">
                    <div className="flex items-center gap-4">
                        <Link to="/thoughts" className="p-2 hover:bg-accent/10 rounded-full">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-muted-foreground">
                                {isNew ? "New Story" : "Editing"}
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => handleSave("draft")}
                            disabled={isSaving}
                            className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Save Draft
                        </button>
                        <button
                            onClick={() => handleSave("published")}
                            disabled={isSaving}
                            className="px-6 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                        >
                            {isSaving ? "Publishing..." : "Publish"}
                        </button>
                    </div>
                </div>
            )}

            {!isEditing && <PageTitle title={post!.title} />}

            {/* Main Content Area */}
            <div className={isEditing ? "" : "bg-muted/30 border-b border-border mb-12 relative"}>
                {!isEditing && post && (
                    <div className="absolute top-6 right-6 z-10">
                        <PostControls
                            postId={post.id}
                            isFeatured={post.featured}
                            onUpdate={() => fetchPost(post.id)}
                            onDelete={() => window.location.href = '/thoughts'}
                        />
                    </div>
                )}

                <div className="container mx-auto px-6 py-12 md:py-20">
                    {!isEditing && (
                        <Link
                            to="/thoughts"
                            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Stories
                        </Link>
                    )}

                    <div className="max-w-3xl mx-auto text-center">
                        {!isEditing ? (
                            <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium mb-6">
                                {post?.type === "blog" ? "📝 Blog Post" : "📹 Vlog"}
                            </span>
                        ) : (
                            <div className="flex justify-center gap-4 mb-6">
                                <button
                                    onClick={() => setPost(p => ({ ...p!, type: 'blog' }))}
                                    className={`px-4 py-1 rounded-full text-xs font-medium border ${post?.type === 'blog' ? 'bg-primary text-primary-foreground' : 'bg-muted border-input'}`}
                                >
                                    📝 Blog
                                </button>
                                <button
                                    onClick={() => setPost(p => ({ ...p!, type: 'vlog' }))}
                                    className={`px-4 py-1 rounded-full text-xs font-medium border ${post?.type === 'vlog' ? 'bg-red-500 text-white' : 'bg-muted border-input'}`}
                                >
                                    📹 Vlog
                                </button>
                            </div>
                        )}

                        {isEditing ? (
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Title"
                                className="w-full text-center font-serif text-4xl md:text-5xl lg:text-6xl font-medium mb-6 bg-transparent border-none outline-none placeholder:text-muted-foreground/30"
                            />
                        ) : (
                            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium mb-6 leading-tight">
                                {post?.title}
                            </h1>
                        )}

                        {/* Vlog Link Input */}
                        {isEditing && post?.type === 'vlog' && (
                            <input
                                type="text"
                                value={post.link || ''}
                                onChange={(e) => setPost(p => ({ ...p!, link: e.target.value }))}
                                placeholder="YouTube Video URL (e.g. https://youtu.be/...)"
                                className="w-full text-center text-red-400 bg-red-500/10 border-none outline-none rounded-lg p-2 mb-6 placeholder:text-red-300/50"
                            />
                        )}

                        {isEditing && (
                            <textarea
                                value={excerpt}
                                onChange={(e) => setExcerpt(e.target.value)}
                                placeholder="Write a short subtitle/excerpt..."
                                className="w-full text-center text-xl text-muted-foreground bg-transparent border-none outline-none resize-none h-24 placeholder:text-muted-foreground/30"
                            />
                        )}

                        {!isEditing && (
                            <div className="flex flex-col items-center gap-6">
                                <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        {post?.date}
                                    </span>
                                    {(post?.readTime || post?.duration) && (
                                        <span className="flex items-center gap-2">
                                            <Clock className="w-4 h-4" />
                                            {post?.readTime || post?.duration}
                                        </span>
                                    )}
                                </div>
                                {post?.type === 'vlog' && post.link && (
                                    <a href={post.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF0000] text-white rounded-full hover:bg-[#FF0000]/90 transition-all shadow-lg hover:scale-105">
                                        <span>Watch on YouTube</span>
                                        <ExternalLink className="w-4 h-4" />
                                    </a>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Editor / Content */}
            <div className="container mx-auto px-6">
                <div className="max-w-3xl mx-auto">
                    {(post?.thumbnail || isEditing) && (
                        <div className="rounded-3xl overflow-hidden mb-12 shadow-lg group relative">
                            {isEditing && (
                                <button
                                    onClick={() => {
                                        const url = prompt("Enter image URL:");
                                        if (url) setThumbnail(url);
                                    }}
                                    className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 text-white font-medium"
                                >
                                    Change Cover Image
                                </button>
                            )}
                            {(thumbnail || post?.thumbnail) && <img src={isEditing ? thumbnail : post?.thumbnail} alt={title} className="w-full object-cover min-h-[300px] bg-muted" />}
                        </div>
                    )}

                    {isEditing ? (
                        <div className="min-h-[500px]">
                            <RichTextEditor content={content} onChange={setContent} />
                        </div>
                    ) : (
                        <div
                            className="prose prose-lg dark:prose-invert max-w-none"
                            dangerouslySetInnerHTML={{ __html: post?.content || `<p>${post?.excerpt}</p>` }}
                        />
                    )}

                    {!isEditing && (
                        <div className="mt-12 pt-8 border-t border-border flex justify-between items-center">
                            <span className="font-serif italic">Thanks for reading!</span>
                            <button
                                onClick={handleShare}
                                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                            >
                                <Share2 className="w-4 h-4" />
                                Share
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </article>
    );
};

export default BlogPostPage;
