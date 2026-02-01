import { BookOpen, Palette, Video, Globe, Database, BarChart3, Brain, MapPin } from "lucide-react";

const interests = [
  {
    icon: Database,
    title: "Data Analytics",
    description: "Turning complex data into actionable insights with SQL, Python & Power BI.",
  },
  {
    icon: Brain,
    title: "Machine Learning",
    description: "Exploring AI from deep learning to molecular graph generation.",
  },
  {
    icon: Video,
    title: "Content Creation",
    description: "Sharing Erasmus journeys & master's experiences through vlogs.",
  },
  {
    icon: Globe,
    title: "Global Explorer",
    description: "Studied in 4 countries, speaking 5 languages, always curious.",
  },
];

import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface AboutProps {
  isTeaser?: boolean;
}

const About = ({ isTeaser = false }: AboutProps) => {
  return (
    <section id="about" className={`relative ${isTeaser ? "min-h-screen flex items-center justify-center py-20 md:py-24" : "pb-12"}`}>
      {/* Decorative elements only on teaser or modified for full page */}
      {isTeaser && (
        <>
          <div className="absolute top-0 right-0 w-64 h-64 bg-pop-2/10 blob-shape" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-pop-3/10 blob-shape-2" />
        </>
      )}

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image/Visual Side */}
          <div className="relative w-full max-w-sm lg:max-w-md mx-auto">
            {/* Photo & Flags Wrapper */}
            <div className="relative mb-6">
              {/* Photo Box */}
              <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-primary/20 via-accent/20 to-pop-2/20 relative shadow-inner">
                <img
                  src="/about-me1.jpg"
                  alt="Rana Islek"
                  className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Journey badges - Anchored to Image */}
              <div className="absolute -bottom-4 -right-4 flex gap-2 z-10">
                {[
                  { code: "tr", label: "Turkey" },
                  { code: "hu", label: "Hungary" },
                  { code: "be", label: "Belgium" },
                  { code: "es", label: "Spain" },
                  { code: "it", label: "Italy" }
                ].map((country, i) => (
                  <div
                    key={country.code}
                    className="w-8 h-8 rounded-full bg-card border-2 border-border flex items-center justify-center overflow-hidden shadow-md group relative hover:scale-110 transition-transform"
                    style={{ animationDelay: `${i * 0.1}s` }}
                    title={country.label}
                  >
                    <img
                      src={`https://flagcdn.com/w80/${country.code}.png`}
                      alt={country.label}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Quote - Moved Below */}
            <div className="text-center">
              <p className="font-serif text-lg text-foreground/80 italic">
                "Data tells stories, I make them beautiful."
              </p>
            </div>
          </div>


          {/* Content Side */}
          <div>
            <span className="text-primary font-medium text-xs tracking-wider uppercase">
              Nice to meet you!
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-medium mt-1 mb-6">
              A Little About
              <br />
              <span className="gradient-text">My Journey</span>
            </h2>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-3">
              I'm a <span className="text-foreground font-medium">Data & Analytics Specialist</span> with
              an MSc in Big Data Management & Analytics (Erasmus Mundus). My journey has taken me from
              <span className="text-primary"> Istanbul</span> to
              <span className="text-primary"> Brussels</span>,
              <span className="text-primary"> Barcelona</span>, and
              <span className="text-primary"> Padova</span>.
            </p>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6">
              When I'm not building dashboards or training ML models, you'll find me creating YouTube content
              about student life abroad, leading dance clubs, or exploring new cities. I believe life is about
              collecting experiences, not just data points! 💃
            </p>

            {/* Interest Cards */}
            <div className="grid sm:grid-cols-2 gap-3 mb-6">
              {interests.map((interest) => (
                <div
                  key={interest.title}
                  className="p-3 rounded-2xl bg-card border border-border card-hover group"
                >
                  <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors">
                    <interest.icon className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="font-medium text-sm mb-1">{interest.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-1">{interest.description}</p>
                </div>
              ))}
            </div>

            {isTeaser && (
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-colors group"
              >
                <span>Read Full Story</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
