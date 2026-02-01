import PageTitle from "@/components/PageTitle";
import JourneyTimeline from "@/components/JourneyTimeline";

const JourneyPage = () => {
    return (
        <div className="min-h-screen bg-background">
            <PageTitle title="My Journey" />

            <div className="container mx-auto px-6 py-20">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-primary font-medium text-sm tracking-wider uppercase">
                        Time Tunnel
                    </span>
                    <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium mt-4 mb-6">
                        A Decade of <span className="gradient-text">Adventure</span>
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        From high school halls in Izmir to AI research in Padova, and everything in between.
                    </p>
                </div>

                <JourneyTimeline />
            </div>
        </div>
    );
};

export default JourneyPage;
