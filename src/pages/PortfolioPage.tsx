import Portfolio from "@/components/Portfolio";
import PageTitle from "@/components/PageTitle";
import BackgroundElements from "@/components/BackgroundElements";

const PortfolioPage = () => {
    return (
        <>
            <BackgroundElements />
            <PageTitle title="Portfolio" />
            <Portfolio />
        </>
    );
};

export default PortfolioPage;
