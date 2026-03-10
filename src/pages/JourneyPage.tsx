import PageTitle from "@/components/PageTitle";
import JourneyTimeline from "@/components/JourneyTimeline";
import BackgroundElements from "@/components/BackgroundElements";
import { useTranslation } from "react-i18next";

const JourneyPage = () => {
    const { t } = useTranslation();
    return (
        <div className="min-h-screen pt-20 pb-16">
            <BackgroundElements showStars={true} />
            <PageTitle title="Journey" />

            <div className="container mx-auto px-6 py-20">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium mb-6">
                        {t('journey.title1')} <span className="gradient-text">{t('journey.title2')}</span>
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        {t('journey.description')}
                    </p>
                    <span className="inline-block text-primary font-medium text-sm tracking-wider uppercase mt-8">
                        {t('journey.subtitle')}
                    </span>
                </div>
                <JourneyTimeline />
            </div>
        </div>
    );
};

export default JourneyPage;
