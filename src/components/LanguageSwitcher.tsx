import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

export const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        const nextLang = i18n.language.startsWith('en') ? 'tr' : 'en';
        i18n.changeLanguage(nextLang);
    };

    return (
        <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 p-2 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors group"
            aria-label="Toggle language"
        >
            <Globe className="w-5 h-5" />
            <span className="text-sm font-medium uppercase min-w-[20px]">
                {i18n.language.startsWith('tr') ? 'TR' : 'EN'}
            </span>
        </button>
    );
};
