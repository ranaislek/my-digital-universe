import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { useTranslation } from "react-i18next";

interface UnsavedChangesDialogProps {
    isOpen: boolean;
    onProceed: () => void;
    onCancel: () => void;
    onSave?: () => void;
}

export function UnsavedChangesDialog({
    isOpen,
    onProceed,
    onCancel,
    onSave,
}: UnsavedChangesDialogProps) {
    const { t } = useTranslation();

    return (
        <AlertDialog open={isOpen} onOpenChange={onCancel}>
            <AlertDialogContent className="max-w-md rounded-3xl p-6">
                <AlertDialogHeader>
                    <AlertDialogTitle className="font-serif text-2xl">
                        {t('common.admin.unsavedTitle', { defaultValue: 'Kaydedilmemiş Değişiklikler' })}
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-sm text-muted-foreground mt-2">
                        {t('common.admin.unsavedDesc', { defaultValue: 'Bu sayfadan ayrılırsanız kaydedilmemiş değişiklikleriniz kaybolacaktır. Ne yapmak istersiniz?' })}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex-col sm:flex-row gap-2 mt-6">
                    <Button variant="ghost" onClick={onCancel} className="rounded-full">
                        {t('common.admin.keepEditing', { defaultValue: 'Çalışmaya Devam Et' })}
                    </Button>
                    {onSave && (
                        <Button variant="secondary" onClick={onSave} className="gap-2 rounded-full">
                            <Save className="w-4 h-4" />
                            {t('common.admin.saveDraft', { defaultValue: 'Taslağı Kaydet' })}
                        </Button>
                    )}
                    <AlertDialogAction onClick={onProceed} className="rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90">
                        {t('common.admin.discardChanges', { defaultValue: 'Değişiklikleri Sil' })}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
