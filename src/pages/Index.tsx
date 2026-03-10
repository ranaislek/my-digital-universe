import Hero from "@/components/Hero";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import Thoughts from "@/components/Thoughts";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import PageTitle from "@/components/PageTitle";


const Index = () => {
  return (
    <div id="home-scroll-container" className="w-full bg-background">
      <PageTitle title="Home" />
      <div>
        <Hero />
      </div>
      <div>
        <About isTeaser={true} />
      </div>
      <div>
        <Portfolio isTeaser={true} />
      </div>
      <div>
        <Thoughts isTeaser={true} />
      </div>
      <div>
        <Contact isTeaser={true} />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
