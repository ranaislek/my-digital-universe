import { BookOpen, Palette, Video, Globe } from "lucide-react";

const interests = [
  {
    icon: BookOpen,
    title: "Research",
    description: "Exploring the frontiers of knowledge through rigorous academic inquiry.",
  },
  {
    icon: Palette,
    title: "Creative Writing",
    description: "Weaving stories and ideas that challenge perspectives and inspire wonder.",
  },
  {
    icon: Video,
    title: "Visual Stories",
    description: "Capturing moments and narratives through the lens of curiosity.",
  },
  {
    icon: Globe,
    title: "Global Perspectives",
    description: "Connecting ideas across cultures and disciplines.",
  },
];

const About = () => {
  return (
    <section id="about" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image/Visual Side */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden bg-muted relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-aurora-2/20 to-accent/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full border-2 border-primary/30 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full border-2 border-accent/30 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/40 to-accent/40 pulse-glow" />
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative Elements */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-xl bg-primary/10 blur-xl" />
            <div className="absolute -top-4 -left-4 w-32 h-32 rounded-xl bg-accent/10 blur-xl" />
          </div>

          {/* Content Side */}
          <div>
            <span className="text-primary font-medium text-sm tracking-wider uppercase">
              About Me
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-medium mt-2 mb-6">
              A Journey Through
              <br />
              <span className="gradient-text">Multiple Dimensions</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              I exist at the intersection of academia and creativity—a researcher by training, 
              a storyteller by nature. My work spans from peer-reviewed publications to 
              experimental vlogs, all united by an insatiable curiosity about the world 
              and our place within it.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-10">
              This space serves as my digital universe—a constellation of thoughts, 
              achievements, and explorations. Here, you'll find the structured world 
              of my academic portfolio alongside the free-flowing realm of my creative 
              expressions. Welcome to both sides of my coin.
            </p>

            {/* Interest Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {interests.map((interest) => (
                <div
                  key={interest.title}
                  className="p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors group"
                >
                  <interest.icon className="w-5 h-5 text-primary mb-3 group-hover:scale-110 transition-transform" />
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
