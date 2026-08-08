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
        if (title.toLowerCase() === "home" || location.pathname === "/") {
            document.title = "Rana İşlek — Personal Website & Portfolio";
        } else {
            const localizedTitle = t(`pages.${title.toLowerCase()}`, { defaultValue: title });
            document.title = `${localizedTitle} | Rana İşlek`;
        }
    }, [location, title, t]);

    return null; // This component doesn't render anything
};

export default PageTitle;
