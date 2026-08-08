import About from "@/components/About";
import PageTitle from "@/components/PageTitle";
import BackgroundElements from "@/components/BackgroundElements";

const AboutPage = () => {
    return (
        <div className="flex-grow flex flex-col justify-center">
            <BackgroundElements />
            <PageTitle title="About" />
            <About />
        </div>
    );
};

export default AboutPage;
