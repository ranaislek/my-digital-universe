import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Lock, Copy, Check, ArrowLeft, Database, Save, Upload } from "lucide-react";
import { toast } from "sonner";
import { ContentItem, content as localContent } from "../data/content";
import { supabase } from "../lib/supabase";

const AdminPage = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState<Partial<ContentItem>>({
        type: "blog",
        date: new Date().getFullYear().toString(),
        status: "draft"
    });

    const [dbPosts, setDbPosts] = useState<ContentItem[]>([]);

    useEffect(() => {
        if (isAuthenticated) {
            fetchPosts();
        }
    }, [isAuthenticated]);

    const fetchPosts = async () => {
        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching posts:', error);
            toast.error("Failed to fetch posts");
        } else {
            setDbPosts(data || []);
        }
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === "rana123") {
            setIsAuthenticated(true);
            toast.success("Welcome back, Rana!");
        } else {
            toast.error("Incorrect password");
        }
    };

    const handleMigrate = async () => {
        if (!confirm("This will upload all local content to Supabase. Continue?")) return;

        setIsLoading(true);
        try {
            // Transform local content to match DB schema if needed
            const postsToUpload = localContent.map(post => ({
                id: post.id,
                type: post.type,
                title: post.title,
                excerpt: post.excerpt,
                date: post.date,
                duration: post.duration || null,
                read_time: post.readTime || null, // Map camelCase to snake_case
                location: post.location || null,
                link: post.link || null,
                thumbnail: post.thumbnail || null,
                content: post.content || null,
                status: "published" // Default all existing content to published
            }));

            const { error } = await supabase
                .from('posts')
                .upsert(postsToUpload, { onConflict: 'id' });

            if (error) throw error;

            toast.success("Migration successful! Content is now in the database.");
            fetchPosts();
        } catch (error: any) {
            console.error("Migration failed:", error);
            toast.error(`Migration failed: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async (status: "draft" | "published") => {
        if (!formData.title) return toast.error("Title is required");

        setIsLoading(true);
        try {
            const slug = formData.id || formData.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)+/g, "");

            const postData = {
                id: slug,
                type: formData.type,
                title: formData.title,
                excerpt: formData.excerpt,
                date: formData.date,
                duration: formData.duration || null,
                read_time: formData.readTime || null,
                location: formData.location || null,
                link: formData.link || null,
                thumbnail: formData.thumbnail || null,
                content: formData.content || null,
                status: status
            };

            const { error } = await supabase
                .from('posts')
                .upsert(postData);

            if (error) throw error;

            toast.success(`Post ${status === 'published' ? 'published' : 'saved as draft'}!`);
            setFormData({ type: "blog", date: new Date().getFullYear().toString(), status: "draft" }); // Reset form
            fetchPosts();
        } catch (error: any) {
            console.error("Save failed:", error);
            toast.error(`Save failed: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this post?")) return;

        const { error } = await supabase.from('posts').delete().eq('id', id);
        if (error) {
            toast.error("Failed to delete post");
        } else {
            toast.success("Post deleted");
            fetchPosts();
        }
    };

    const loadPostForEdit = (post: ContentItem) => {
        setFormData({
            ...post,
            readTime: post.read_time // Map back to camelCase for form state if needed, though we can just use read_time in form too. 
            // Actually let's just stick to what the form expects. 
            // Wait, the form uses 'readTime'. The DB uses 'read_time'.
            // I should handle this mapping.
        } as any);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="w-full max-w-md p-8 rounded-3xl border border-border bg-card shadow-sm">
                    <div className="flex justify-center mb-6">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <Lock className="w-6 h-6" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-serif text-center mb-2">Admin Access</h1>
                    <p className="text-muted-foreground text-center mb-8">
                        Please enter the password to manage content.
                    </p>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-background border border-input focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                            placeholder="Password"
                        />
                        <button
                            type="submit"
                            className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
                        >
                            Unlock
                        </button>
                    </form>
                    <div className="mt-6 text-center">
                        <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background py-12 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-serif">Content Manager</h1>
                    <div className="flex gap-4">
                        <button
                            onClick={handleMigrate}
                            disabled={isLoading}
                            className="flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-lg hover:bg-accent/20 transition-colors disabled:opacity-50"
                        >
                            <Upload className="w-4 h-4" />
                            {isLoading ? "Migrating..." : "Migrate Local Data"}
                        </button>
                        <button
                            onClick={() => setIsAuthenticated(false)}
                            className="text-sm text-muted-foreground hover:text-primary"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Editor Form */}
                    <div className="space-y-6 bg-card p-6 rounded-3xl border border-border">
                        <h2 className="text-xl font-medium mb-4">Edit / Create</h2>
                        <div>
                            <label className="block text-sm font-medium mb-2">Type</label>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setFormData({ ...formData, type: "blog" })}
                                    className={`flex-1 py-2 rounded-lg border transition-colors ${formData.type === "blog"
                                        ? "bg-primary text-primary-foreground border-primary"
                                        : "border-input hover:bg-accent"
                                        }`}
                                >
                                    📝 Blog
                                </button>
                                <button
                                    onClick={() => setFormData({ ...formData, type: "vlog" })}
                                    className={`flex-1 py-2 rounded-lg border transition-colors ${formData.type === "vlog"
                                        ? "bg-primary text-primary-foreground border-primary"
                                        : "border-input hover:bg-accent"
                                        }`}
                                >
                                    📹 Vlog
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Title</label>
                            <input
                                type="text"
                                value={formData.title || ""}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-4 py-2 rounded-xl bg-background border border-input outline-none focus:border-primary"
                                placeholder="My New Article"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Excerpt</label>
                            <textarea
                                value={formData.excerpt || ""}
                                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                className="w-full px-4 py-2 rounded-xl bg-background border border-input outline-none focus:border-primary min-h-[80px]"
                                placeholder="Short summary..."
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Date</label>
                                <input
                                    type="text"
                                    value={formData.date || ""}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    className="w-full px-4 py-2 rounded-xl bg-background border border-input outline-none focus:border-primary"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    {formData.type === "vlog" ? "Duration" : "Read Time"}
                                </label>
                                <input
                                    type="text"
                                    value={formData.type === "vlog" ? formData.duration || "" : formData.readTime || ""}
                                    onChange={(e) =>
                                        formData.type === "vlog"
                                            ? setFormData({ ...formData, duration: e.target.value })
                                            : setFormData({ ...formData, readTime: e.target.value })
                                    }
                                    className="w-full px-4 py-2 rounded-xl bg-background border border-input outline-none focus:border-primary"
                                    placeholder={formData.type === "vlog" ? "12:34" : "5 min read"}
                                />
                            </div>
                        </div>

                        {formData.type === "vlog" ? (
                            <>
                                <div>
                                    <label className="block text-sm font-medium mb-2">YouTube Link</label>
                                    <input
                                        type="text"
                                        value={formData.link || ""}
                                        onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                                        className="w-full px-4 py-2 rounded-xl bg-background border border-input outline-none focus:border-primary"
                                        placeholder="https://youtu.be/..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Thumbnail URL</label>
                                    <input
                                        type="text"
                                        value={formData.thumbnail || ""}
                                        onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                                        className="w-full px-4 py-2 rounded-xl bg-background border border-input outline-none focus:border-primary"
                                        placeholder="https://img.youtube.com/..."
                                    />
                                </div>
                            </>
                        ) : (
                            <div>
                                <label className="block text-sm font-medium mb-2">HTML Content</label>
                                <textarea
                                    value={formData.content || ""}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    className="w-full px-4 py-2 rounded-xl bg-background border border-input outline-none focus:border-primary min-h-[200px] font-mono text-sm"
                                    placeholder="<p>Write your content here...</p>"
                                />
                            </div>
                        )}

                        <div className="flex gap-4 pt-4">
                            <button
                                onClick={() => handleSave("draft")}
                                disabled={isLoading}
                                className="flex-1 py-3 bg-secondary text-secondary-foreground rounded-xl font-medium hover:bg-secondary/80 transition-colors"
                            >
                                Save Draft
                            </button>
                            <button
                                onClick={() => handleSave("published")}
                                disabled={isLoading}
                                className="flex-1 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
                            >
                                Publish
                            </button>
                        </div>
                    </div>

                    {/* Database List */}
                    <div className="bg-muted/30 p-6 rounded-3xl border border-border h-full flex flex-col">
                        <h2 className="text-xl font-medium mb-4 flex items-center justify-between">
                            <span>Database Posts</span>
                            <span className="text-sm font-normal text-muted-foreground">{dbPosts.length} items</span>
                        </h2>

                        <div className="flex-1 space-y-4 overflow-auto max-h-[600px] pr-2">
                            {dbPosts.length === 0 ? (
                                <div className="text-center py-10 text-muted-foreground">
                                    <Database className="w-8 h-8 mx-auto mb-2 opacity-20" />
                                    <p>No posts found in database.</p>
                                    <p className="text-sm mt-1">Try migrating local data!</p>
                                </div>
                            ) : (
                                dbPosts.map((post) => (
                                    <div key={post.id} className="bg-card p-4 rounded-xl border border-border flex justify-between items-start group hover:border-primary/50 transition-colors">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full ${post.status === 'published'
                                                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                                        : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                                    }`}>
                                                    {post.status || 'draft'}
                                                </span>
                                                <span className="text-xs text-muted-foreground uppercase">{post.type}</span>
                                            </div>
                                            <h3 className="font-medium line-clamp-1">{post.title}</h3>
                                            <p className="text-xs text-muted-foreground mt-1">{post.date}</p>
                                        </div>
                                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => loadPostForEdit(post)}
                                                className="p-2 hover:bg-primary/10 text-primary rounded-lg transition-colors"
                                                title="Edit"
                                            >
                                                <Copy className="w-4 h-4" /> {/* Reuse Copy icon as Edit icon for now */}
                                            </button>
                                            <button
                                                onClick={() => handleDelete(post.id)}
                                                className="p-2 hover:bg-destructive/10 text-destructive rounded-lg transition-colors"
                                                title="Delete"
                                            >
                                                <Lock className="w-4 h-4" /> {/* Reuse Lock icon as Delete icon for now */}
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
