import Hero from "@/components/Hero";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import Thoughts from "@/components/Thoughts";
import Contact from "@/components/Contact";
import PageTitle from "@/components/PageTitle";


const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <PageTitle title="Home" />
      <Hero />
      <About isTeaser={true} />
      <Portfolio isTeaser={true} />
      <Thoughts isTeaser={true} />
      <Contact isTeaser={true} />
    </div>
  );
};

export default Index;
