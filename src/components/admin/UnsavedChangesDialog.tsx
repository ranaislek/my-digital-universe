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
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

interface UnsavedChangesDialogProps {
    isOpen: boolean;
    onProceed: () => void;
    onCancel: () => void;
    onSave?: () => void; // Optional save draft callback
}

export function UnsavedChangesDialog({
    isOpen,
    onProceed,
    onCancel,
    onSave,
}: UnsavedChangesDialogProps) {
    return (
        <AlertDialog open={isOpen} onOpenChange={onCancel}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
                    <AlertDialogDescription>
                        You have unsaved changes that will be lost if you leave this page. What would you like to do?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex-col sm:flex-row gap-2 mt-4">
                    <Button variant="ghost" onClick={onCancel}>
                        Keep Editing
                    </Button>
                    {onSave && (
                        <Button variant="secondary" onClick={onSave} className="gap-2">
                            <Save className="w-4 h-4" />
                            Save as Draft
                        </Button>
                    )}
                    <AlertDialogAction onClick={onProceed} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                        Discard Changes
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
