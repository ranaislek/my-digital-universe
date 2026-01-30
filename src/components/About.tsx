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

const About = () => {
  return (
    <section id="about" className="py-24 md:py-32 relative">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-pop-2/10 blob-shape" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-pop-3/10 blob-shape-2" />

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image/Visual Side */}
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-primary/20 via-accent/20 to-pop-2/20 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 shadow-lg shadow-primary/30">
                    <span className="text-5xl">✨</span>
                  </div>
                  <p className="font-serif text-xl text-foreground/80 italic">
                    "Data tells stories,<br />I make them beautiful."
                  </p>
                </div>
              </div>
            </div>
            {/* Journey badges */}
            <div className="absolute -bottom-4 -right-4 flex gap-2">
              {["🇧🇪", "🇪🇸", "🇮🇹", "🇭🇺", "🇹🇷"].map((flag, i) => (
                <div 
                  key={i} 
                  className="w-10 h-10 rounded-full bg-card border-2 border-border flex items-center justify-center text-lg shadow-md"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {flag}
                </div>
              ))}
            </div>
          </div>

          {/* Content Side */}
          <div>
            <span className="text-primary font-medium text-sm tracking-wider uppercase">
              Nice to meet you!
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-medium mt-2 mb-6">
              A Little About
              <br />
              <span className="gradient-text">My Journey</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              I'm a <span className="text-foreground font-medium">Data & Analytics Specialist</span> with 
              an MSc in Big Data Management & Analytics (Erasmus Mundus). My journey has taken me from 
              <span className="text-primary"> Istanbul</span> to 
              <span className="text-primary"> Brussels</span>, 
              <span className="text-primary"> Barcelona</span>, and 
              <span className="text-primary"> Padova</span>.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-10">
              When I'm not building dashboards or training ML models, you'll find me creating YouTube content 
              about student life abroad, leading dance clubs, or exploring new cities. I believe life is about 
              collecting experiences, not just data points! 💃
            </p>

            {/* Interest Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {interests.map((interest) => (
                <div
                  key={interest.title}
                  className="p-4 rounded-2xl bg-card border border-border card-hover group"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                    <interest.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-medium mb-1">{interest.title}</h3>
                  <p className="text-sm text-muted-foreground">{interest.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
