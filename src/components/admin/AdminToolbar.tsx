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
                        className="rounded-full hover:bg-white/20 text-red-300 hover:text-red-200 hover:bg-red-500/20"
                        onClick={signOut}
                    >
                        <LogOut className="w-5 h-5" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>Exit Admin Mode</TooltipContent>
            </Tooltip>
        </div>
    );
};

export default AdminToolbar;
