import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface PageTitleProps {
    title: string;
}

const PageTitle = ({ title }: PageTitleProps) => {
    const location = useLocation();
    const { t } = useTranslation();

    useEffect(() => {
        document.title = t(`pages.${title.toLowerCase()}`, { defaultValue: title }) + " | Rana Islek";
    }, [location, title, t]);

    return null; // This component doesn't render anything
};

export default PageTitle;
