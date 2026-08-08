import Contact from "@/components/Contact";
import PageTitle from "@/components/PageTitle";
import BackgroundElements from "@/components/BackgroundElements";

const ContactPage = () => {
    return (
        <div className="flex-grow flex flex-col justify-center pb-12 md:pb-16">
            <BackgroundElements />
            <PageTitle title="Contact" />
            <Contact />
        </div>
    );
};

export default ContactPage;
