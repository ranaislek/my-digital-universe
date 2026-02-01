import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "../lib/supabase";
import PageTitle from "@/components/PageTitle";

const AdminPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [session, setSession] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Check active session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            if (session) {
                navigate("/thoughts");
            }
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            if (session) {
                navigate("/thoughts");
            }
        });

        return () => subscription.unsubscribe();
    }, [navigate]);

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
            navigate("/thoughts");
        }
        setIsLoading(false);
    };

    if (session) {
        return <div className="min-h-screen flex items-center justify-center">Redirecting...</div>;
    }

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
};

export default AdminPage;
