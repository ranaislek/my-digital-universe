import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Send, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

interface PublishConfirmDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    isPublishing?: boolean;
}

export function PublishConfirmDialog({
    isOpen,
    onClose,
    onConfirm,
    isPublishing = false,
}: PublishConfirmDialogProps) {
    const { t } = useTranslation();

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent className="max-w-md rounded-3xl p-6">
                <AlertDialogHeader>
                    <AlertDialogTitle className="font-serif text-2xl">
                        {t('common.admin.publishConfirmTitle', { defaultValue: 'Yayınlamak İstediğinizden Emin Misiniz?' })}
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-sm text-muted-foreground mt-2">
                        {t('common.admin.publishConfirmDesc', { defaultValue: 'Bu içeriği yayınlayarak web sitenizde canlı ve görünür kılmak üzeresiniz.' })}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex-col sm:flex-row gap-2 mt-6">
                    <Button variant="outline" onClick={onClose} disabled={isPublishing} className="rounded-full">
                        {t('common.admin.keepEditing', { defaultValue: 'Çalışmaya Devam Et' })}
                    </Button>
                    <Button onClick={onConfirm} disabled={isPublishing} className="rounded-full gap-2 bg-primary text-primary-foreground shadow-lg hover:bg-primary/90">
                        {isPublishing ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>{t('common.admin.publishing', { defaultValue: 'Yayınlanıyor...' })}</span>
                            </>
                        ) : (
                            <>
                                <Send className="w-4 h-4" />
                                <span>{t('common.admin.publishNow', { defaultValue: 'Evet, Yayınla' })}</span>
                            </>
                        )}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
