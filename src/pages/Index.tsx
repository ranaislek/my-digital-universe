import Hero from "@/components/Hero";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import Thoughts from "@/components/Thoughts";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import PageTitle from "@/components/PageTitle";


const Index = () => {
  return (
    <div id="home-scroll-container" className="h-screen overflow-y-scroll snap-y snap-proximity scroll-smooth bg-background">
      <PageTitle title="Home" />
      <div className="snap-start">
        <Hero />
      </div>
      <div className="snap-start">
        <About isTeaser={true} />
      </div>
      <div className="snap-start">
        <Portfolio isTeaser={true} />
      </div>
      <div className="snap-start">
        <Thoughts isTeaser={true} />
      </div>
      <div className="snap-start">
        <Contact isTeaser={true} />
      </div>
      <div className="snap-start">
        <Footer />
      </div>
    </div>
  );
};

export default Index;
