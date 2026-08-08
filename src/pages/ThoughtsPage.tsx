import Thoughts from "@/components/Thoughts";
import PageTitle from "@/components/PageTitle";
import BackgroundElements from "@/components/BackgroundElements";

const ThoughtsPage = () => {
    return (
        <div className="flex-grow flex flex-col justify-between">
            <BackgroundElements />
            <PageTitle title="Thoughts" />
            <Thoughts />
        </div>
    );
};

export default ThoughtsPage;
