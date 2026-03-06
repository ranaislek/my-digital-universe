import { Edit2, Trash2, Star, Pin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface PostControlsProps {
    postId: string;
    isFeatured?: boolean;
    isPinned?: boolean;
    onDelete?: () => void;
    onUpdate?: () => void;
    className?: string;
    editPath?: string; // Optional custom edit path (default to /blog/:id)
    tableName?: string; // Optional custom table name (default to 'posts')
}

const PostControls = ({ postId, isFeatured, isPinned, onDelete, onUpdate, className = "", editPath, tableName = 'posts' }: PostControlsProps) => {
    const { isAdmin } = useAuth();
    const navigate = useNavigate();
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    if (!isAdmin) return null;

    const handleTogglePin = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const newStatus = !isPinned;

        // If we are pinning this post, unpin all others first to ensure only one hero
        if (newStatus) {
            await supabase.from(tableName).update({ pinned: false }).eq('pinned', true);
        }

        const { error } = await supabase
            .from(tableName)
            .update({ pinned: newStatus })
            .eq('id', postId);

        if (error) {
            toast.error("Failed to update pinned status");
        } else {
            toast.success(newStatus ? "Pinned as Hero" : "Unpinned from Hero");
            onUpdate?.();
        }
    };

    const handleToggleFeature = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const { error } = await supabase
            .from(tableName)
            .update({ featured: !isFeatured })
            .eq('id', postId);

        if (error) {
            toast.error("Failed to update featured status");
        } else {
            toast.success(isFeatured ? "Removed from featured" : "Added to featured");
            onUpdate?.();
        }
    };

    const handleDeleteClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = async () => {
        const { error } = await supabase
            .from(tableName)
            .delete()
            .eq('id', postId);

        if (error) {
            toast.error("Failed to delete post");
        } else {
            toast.success("Post deleted");
            onDelete?.();
        }
        setIsDeleteDialogOpen(false);
    };

    const handleEdit = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        // Use custom path if provided, otherwise default to blog
        if (editPath) {
            window.location.href = `${editPath}?edit=true`;
        } else {
            window.location.href = `/blog/${postId}?edit=true`;
        }
    };

    return (
        <div className={`flex items-center gap-1 ${className}`} onClick={(e) => e.stopPropagation()}>
            <Button
                variant={isPinned ? "default" : "secondary"}
                size="icon"
                className={`h-8 w-8 rounded-full shadow-sm ${isPinned ? "bg-purple-500 hover:bg-purple-600 text-white" : "bg-white/80 hover:bg-white"}`}
                onClick={handleTogglePin}
                title={isPinned ? "Unpin Method" : "Pin as Hero"}
            >
                <Pin className={`w-4 h-4 ${isPinned ? "fill-current" : ""}`} />
            </Button>

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
                onClick={handleDeleteClick}
                title="Delete"
            >
                <Trash2 className="w-4 h-4 text-red-600" />
            </Button>

            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the post and remove its data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={(e) => { e.stopPropagation(); setIsDeleteDialogOpen(false); }}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={(e) => { e.stopPropagation(); confirmDelete(); }}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default PostControls;
