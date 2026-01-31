import { useNavigate } from "react-router-dom";
import { LogOut, Plus, PlusCircle, LayoutDashboard, ArrowLeft } from "lucide-react";
import { useAuth } from "../AuthProvider";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const AdminToolbar = () => {
    const { isAdmin, signOut } = useAuth();
    const navigate = useNavigate();

    if (!isAdmin) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 p-2 bg-foreground/90 text-background backdrop-blur-md rounded-full shadow-2xl border border-white/20 animate-in fade-in slide-in-from-bottom-4">
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full hover:bg-white/20 text-background hover:text-background"
                        onClick={() => navigate("/admin")}
                    >
                        <LayoutDashboard className="w-5 h-5" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>Dashboard</TooltipContent>
            </Tooltip>

            <div className="w-px h-4 bg-white/20 mx-1" />

            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full hover:bg-white/20 text-background hover:text-background"
                        onClick={() => navigate("/")}
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>View Website</TooltipContent>
            </Tooltip>

            <div className="w-px h-4 bg-white/20 mx-1" />

            <Tooltip>
                <TooltipTrigger asChild>
                    <button
                        onClick={() => {
                            const slug = `draft-${Date.now()}`;
                            window.location.href = `/blog/${slug}?edit=true&new=true`;
                        }}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors"
                        title="New Post"
                    >
                        <PlusCircle className="w-5 h-5 text-green-400" />
                    </button>
                </TooltipTrigger>
                <TooltipContent>New Post</TooltipContent>
            </Tooltip>

            <div className="w-px h-4 bg-white/20 mx-1" />

            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full hover:bg-white/20 text-red-300 hover:text-red-200 hover:bg-red-500/20"
                        onClick={signOut}
                    >
                        <LogOut className="w-5 h-5" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>Sign Out</TooltipContent>
            </Tooltip>
        </div>
    );
};

export default AdminToolbar;
