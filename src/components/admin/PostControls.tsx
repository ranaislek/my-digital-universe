import { Edit2, Trash2, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface PostControlsProps {
    postId: string;
    isFeatured?: boolean;
    onDelete?: () => void;
    onUpdate?: () => void;
    className?: string;
}

const PostControls = ({ postId, isFeatured, onDelete, onUpdate, className = "" }: PostControlsProps) => {
    const { isAdmin } = useAuth();
    const navigate = useNavigate();

    if (!isAdmin) return null;

    const handleToggleFeature = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const { error } = await supabase
            .from('posts')
            .update({ featured: !isFeatured })
            .eq('id', postId);

        if (error) {
            toast.error("Failed to update featured status");
        } else {
            toast.success(isFeatured ? "Removed from featured" : "Added to featured");
            onUpdate?.();
        }
    };

    const handleDelete = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!confirm("Are you sure you want to delete this post?")) return;

        const { error } = await supabase
            .from('posts')
            .delete()
            .eq('id', postId);

        if (error) {
            toast.error("Failed to delete post");
        } else {
            toast.success("Post deleted");
            onDelete?.();
        }
    };

    const handleEdit = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        // Force full reload to ensure clean state if needed, or just navigate
        window.location.href = `/blog/${postId}?edit=true`;
    };

    return (
        <div className={`flex items-center gap-1 ${className}`} onClick={(e) => e.stopPropagation()}>
            <Button
                variant={isFeatured ? "default" : "secondary"}
                size="icon"
                className={`h-8 w-8 rounded-full shadow-sm ${isFeatured ? "bg-yellow-500 hover:bg-yellow-600 text-white" : "bg-white/80 hover:bg-white"}`}
                onClick={handleToggleFeature}
                title={isFeatured ? "Unfeature" : "Feature on Home"}
            >
                <Star className={`w-4 h-4 ${isFeatured ? "fill-current" : ""}`} />
            </Button>

            <Button
                variant="secondary"
                size="icon"
                className="h-8 w-8 rounded-full bg-white/80 hover:bg-white shadow-sm"
                onClick={handleEdit}
                title="Edit"
            >
                <Edit2 className="w-4 h-4 text-blue-600" />
            </Button>

            <Button
                variant="secondary"
                size="icon"
                className="h-8 w-8 rounded-full bg-white/80 hover:bg-white shadow-sm"
                onClick={handleDelete}
                title="Delete"
            >
                <Trash2 className="w-4 h-4 text-red-600" />
            </Button>
        </div>
    );
};

export default PostControls;
