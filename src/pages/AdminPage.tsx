import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, PlusCircle, Edit3, Trash2, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "../lib/supabase";
import PageTitle from "@/components/PageTitle";
import { ContentItem } from "@/data/content";

const AdminPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [session, setSession] = useState<any>(null);
    const [posts, setPosts] = useState<ContentItem[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Check active session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            if (session) fetchAllPosts();
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            if (session) fetchAllPosts();
        });

        return () => subscription.unsubscribe();
    }, []);

    const fetchAllPosts = async () => {
        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error(error);
            toast.error("Failed to load posts");
        } else {
            // Map keys
            const mapped = (data || []).map(p => ({
                ...p,
                readTime: p.read_time
            }));
            setPosts(mapped);
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            toast.error(error.message);
        } else {
            toast.success("Welcome back! 🚀");
        }
        setIsLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this post?")) return;

        const { error } = await supabase.from('posts').delete().eq('id', id);
        if (error) {
            toast.error(error.message);
        } else {
            toast.success("Deleted successfully");
            fetchAllPosts();
        }
    };

    if (!session) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background p-6">
                <PageTitle title="Admin Access" />
                <div className="w-full max-w-md p-8 rounded-3xl border border-border bg-card shadow-2xl">
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 ring-8 ring-primary/5">
                            <Lock className="w-8 h-8" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-serif text-center mb-2 font-medium">Admin Portal</h1>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-background/50 border border-input" placeholder="Email" required />
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-background/50 border border-input" placeholder="Password" required />
                        <button type="submit" disabled={isLoading} className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90">
                            {isLoading ? "Authenticating..." : "Login"}
                        </button>
                    </form>
                    <div className="mt-8 text-center pt-6 border-t border-border">
                        <Link to="/" className="text-sm text-muted-foreground hover:text-primary">← Return to Website</Link>
                    </div>
                </div>
            </div>
        );
    }

    const drafts = posts.filter(p => p.status === 'draft');
    const published = posts.filter(p => p.status === 'published');

    return (
        <div className="min-h-screen bg-background p-8">
            <PageTitle title="Dashboard" />
            <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-12">
                    <h1 className="text-3xl font-serif">Content Dashboard</h1>
                    <div className="flex gap-4">
                        <Link to="/" className="px-4 py-2 text-sm border border-border rounded-full hover:bg-muted">Exit</Link>
                        <button onClick={() => {
                            const slug = `draft-${Date.now()}`;
                            window.location.href = `/blog/${slug}?edit=true&new=true`;
                        }} className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-full flex items-center gap-2 hover:bg-primary/90">
                            <PlusCircle className="w-4 h-4" /> New Post
                        </button>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Drafts Column */}
                    <div>
                        <h2 className="text-xl font-medium mb-6 flex items-center gap-2 text-orange-500">
                            <span className="w-2 h-2 rounded-full bg-orange-500" /> Drafts ({drafts.length})
                        </h2>
                        <div className="space-y-4">
                            {drafts.map(post => (
                                <div key={post.id} className="p-4 rounded-xl border border-border bg-card hover:shadow-lg transition-all group">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-medium line-clamp-1">{post.title || "Untitled"}</h3>
                                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Link to={`/blog/${post.id}?edit=true`} className="p-1 hover:text-primary"><Edit3 className="w-4 h-4" /></Link>
                                            <button onClick={() => handleDelete(post.id)} className="p-1 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                                        </div>
                                    </div>
                                    <p className="text-xs text-muted-foreground line-clamp-2">{post.excerpt || "No excerpt"}</p>
                                    <div className="mt-3 text-[10px] text-muted-foreground font-mono">{post.id}</div>
                                </div>
                            ))}
                            {drafts.length === 0 && <p className="text-muted-foreground italic">No drafts.</p>}
                        </div>
                    </div>

                    {/* Published Column */}
                    <div>
                        <h2 className="text-xl font-medium mb-6 flex items-center gap-2 text-green-500">
                            <span className="w-2 h-2 rounded-full bg-green-500" /> Published ({published.length})
                        </h2>
                        <div className="space-y-4">
                            {published.map(post => (
                                <div key={post.id} className="p-4 rounded-xl border border-border bg-card/50 hover:bg-card hover:shadow-md transition-all group">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-medium line-clamp-1">{post.title}</h3>
                                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Link to={`/blog/${post.id}`} className="p-1 hover:text-primary"><ExternalLink className="w-4 h-4" /></Link>
                                            <Link to={`/blog/${post.id}?edit=true`} className="p-1 hover:text-primary"><Edit3 className="w-4 h-4" /></Link>
                                            <button onClick={() => handleDelete(post.id)} className="p-1 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                                        <span className={`px-2 py-0.5 rounded-full ${post.type === 'vlog' ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-500'}`}>
                                            {post.type}
                                        </span>
                                        <span>{post.date}</span>
                                    </div>
                                </div>
                            ))}
                            {published.length === 0 && <p className="text-muted-foreground italic">No published posts.</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
