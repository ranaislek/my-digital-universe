import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "../lib/supabase";
import { ContentItem } from "../data/content";

const BlogPostPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState<ContentItem | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetchPost(id);
        }
    }, [id]);

    const fetchPost = async (slug: string) => {
        try {
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .eq('id', slug)
                .single();

            if (error) throw error;

            if (data) {
                setPost({
                    ...data,
                    readTime: data.read_time
                });
            }
        } catch (error) {
            console.error("Error fetching post:", error);
            toast.error("Could not find post");
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (!post) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <h1 className="text-2xl font-serif mb-4">Post not found</h1>
                <Link to="/thoughts" className="text-primary hover:underline">
                    Back to all posts
                </Link>
            </div>
        );
    }

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard!");
    };

    return (
        <article className="min-h-screen bg-background pb-20">
            {/* Header */}
            <div className="bg-muted/30 border-b border-border mb-12">
                <div className="container mx-auto px-6 py-12 md:py-20">
                    <Link
                        to="/thoughts"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Stories
                    </Link>

                    <div className="max-w-3xl mx-auto text-center">
                        <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium mb-6">
                            {post.type === "blog" ? "📝 Blog Post" : "📹 Vlog"}
                        </span>
                        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium mb-6 leading-tight">
                            {post.title}
                        </h1>
                        <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                            <span className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {post.date}
                            </span>
                            {(post.readTime || post.duration) && (
                                <span className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    {post.readTime || post.duration}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-6">
                <div className="max-w-3xl mx-auto">
                    {post.thumbnail && (
                        <div className="rounded-3xl overflow-hidden mb-12 shadow-lg">
                            <img src={post.thumbnail} alt={post.title} className="w-full object-cover" />
                        </div>
                    )}

                    <div
                        className="prose prose-lg dark:prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: post.content || `<p>${post.excerpt}</p>` }}
                    />

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
                </div>
            </div>
        </article>
    );
};

export default BlogPostPage;
