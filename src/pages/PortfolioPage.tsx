import Portfolio from "@/components/Portfolio";
import PageTitle from "@/components/PageTitle";
import BackgroundElements from "@/components/BackgroundElements";

const PortfolioPage = () => {
    return (
        <div className="flex-grow flex flex-col justify-between">
            <BackgroundElements />
            <PageTitle title="Portfolio" />
            <Portfolio />
        </div>
    );
};

export default PortfolioPage;
